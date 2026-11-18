"use client"

import * as React from "react"
import {
  Volume2,
  Play,
  Pause,
  Gauge,
  AlertCircle
} from "lucide-react"
import { Slider } from "@/components/ui/slider"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import { formatDigits } from "@/lib/utils"

/**
 * Pre-processes article text for natural speech synthesis:
 * 1. Strips HTML tags.
 * 2. Localizes symbols (₹ -> રૂપિયા, % -> ટકા).
 * 3. Expands number ranges (૧-૨ -> ૧ થી ૨).
 * 4. REMOVES all commas, colons, semicolons, quotes, brackets, and noisy symbols
 *    so TTS engines NEVER speak "comma", "quote", "colon", "dash", etc.
 * 5. Normalizes whitespace and guarantees clean sentence cadence.
 */
function preprocessForSpeech(text, lang) {
  if (!text) return ""
  return text
    // Strip HTML tags
    .replace(/<[^>]*>/g, " ")
    // Expand Rupee symbol
    .replace(/₹\s*([0-9૦-૯]+)/g, lang === "gu" ? "$1 રૂપિયા" : "$1 rupees")
    .replace(/([0-9૦-૯]+)\s*₹/g, lang === "gu" ? "$1 રૂપિયા" : "$1 rupees")
    // Expand percentage symbol
    .replace(/([0-9૦-૯]+)\s*%/g, lang === "gu" ? "$1 ટકા" : "$1 percent")
    // Expand number range hyphen (e.g. ૧-૨ -> ૧ થી ૨)
    .replace(/([0-9૦-૯]+)\s*[-–—]\s*([0-9૦-૯]+)/g, lang === "gu" ? "$1 થી $2" : "$1 to $2")
    // Replace Gujarati danda (। or ॥) with period
    .replace(/[।॥]/g, ".")
    // REMOVE all commas entirely — guarantees TTS can NEVER say the word "comma"
    .replace(/,/g, " ")
    // REMOVE semicolons and colons
    .replace(/[;:]/g, " ")
    // REMOVE dashes and hyphens
    .replace(/[—–\-]+/g, " ")
    // REMOVE all quotation marks — prevents TTS from saying "quote" or "unquote"
    .replace(/["'“”‘’«»„`]/g, "")
    // REMOVE parentheses and brackets
    .replace(/[()[\]{}]/g, " ")
    // REMOVE noisy symbols and punctuation
    .replace(/[•*#~|/\\@&+=^<>_]/g, " ")
    // Clean up multiple periods (e.g. .. or ...) to a single period
    .replace(/\.{2,}/g, ".")
    // Collapse excess whitespace
    .replace(/\s+/g, " ")
    // Remove whitespace before period
    .replace(/\s+\./g, ".")
    .trim()
}

/**
 * Gujarati (U+0A80–U+0AFF) → Devanagari (U+0900–U+097F) transliteration.
 * 1-to-1 Unicode phonetic mapping (subtract 0x0180).
 * Special handling: Maps Gujarati ળ (U+0AB3) to Devanagari ल (U+0932) so
 * all Hindi TTS engines (Google हिन्दी, Microsoft Swara/Kalpana) pronounce it seamlessly.
 */
function gujaratiToDevanagari(text) {
  if (!text) return ""
  return text.replace(/[\u0A80-\u0AFF]/g, (char) => {
    const code = char.charCodeAt(0)
    if (code === 0x0AB3) {
      // ળ -> ल (ensures universal Hindi TTS compatibility)
      return String.fromCharCode(0x0932)
    }
    if (code >= 0x0A81 && code <= 0x0AF1) {
      return String.fromCharCode(code - 0x0180)
    }
    return char
  })
}

/**
 * Cleans an individual chunk for utterance.
 * Strips leading/trailing punctuation and ensures a single sentence-terminating period.
 */
function cleanChunk(chunk) {
  if (!chunk) return ""
  let clean = chunk
    .replace(/^[\s.,;:!?\-—–]+/, "")
    .replace(/[\s.,;:!?\-—–]+$/, "")
    .trim()
  if (!clean) return ""
  if (!/[.!?]$/.test(clean)) {
    clean += "."
  }
  return clean
}

export function AudioArticlePlayer({
  articleText = "",
  lang = "gu",
  title = "આ લેખ સાંભળો",
  durationSeconds: propDurationSeconds
}) {
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [currentTime, setCurrentTime] = React.useState(0)
  const [speedIndex, setSpeedIndex] = React.useState(0)
  const [notice, setNotice] = React.useState(null)

  const speeds = [1, 1.25, 1.5, 2]
  const currentSpeed = speeds[speedIndex]

  const timerRef = React.useRef(null)
  const isPlayingRef = React.useRef(false)
  const currentChunkIndexRef = React.useRef(0)
  const utteranceRef = React.useRef(null)
  const speedRef = React.useRef(currentSpeed)
  const playChunkRef = React.useRef(null)

  React.useEffect(() => {
    speedRef.current = currentSpeed
    isPlayingRef.current = isPlaying
  }, [currentSpeed, isPlaying])

  // Word count and calculated duration (~130 words per minute average reading rate)
  const words = React.useMemo(() => {
    if (!articleText) return 0
    return articleText.trim().split(/\s+/).filter(Boolean).length
  }, [articleText])

  const calculatedDuration = React.useMemo(() => {
    if (words > 0) {
      return Math.max(20, Math.ceil((words / 130) * 60))
    }
    return propDurationSeconds || 180
  }, [words, propDurationSeconds])

  // Split article into clean, punctuation-safe sentence chunks (kept in native script)
  const textChunks = React.useMemo(() => {
    if (!articleText) return []

    // 1. Sanitize text (strips all commas, colons, quotes, etc.)
    const sanitized = preprocessForSpeech(articleText, lang)
    if (!sanitized) return []

    // 2. Split along sentence terminators (. ? !)
    const sentences = sanitized
      .split(/(?<=[.?!])\s+/)
      .map((s) => s.trim())
      .filter(Boolean)

    // 3. Keep chunks manageable (< 160 characters)
    const chunks = []
    for (const sent of sentences) {
      if (sent.length <= 160) {
        const c = cleanChunk(sent)
        if (c) chunks.push(c)
      } else {
        // Break long sentences at word boundaries
        const words = sent.split(/\s+/)
        let cur = ""
        for (const w of words) {
          if ((cur + " " + w).length <= 130) {
            cur = cur ? `${cur} ${w}` : w
          } else {
            if (cur) {
              const c = cleanChunk(cur)
              if (c) chunks.push(c)
            }
            cur = w
          }
        }
        if (cur) {
          const c = cleanChunk(cur)
          if (c) chunks.push(c)
        }
      }
    }

    return chunks.length > 0 ? chunks : [cleanChunk(sanitized)]
  }, [articleText, lang])

  // Format MM:SS helper
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60)
    const s = Math.floor(secs % 60)
    const mm = m < 10 ? `0${m}` : `${m}`
    const ss = s < 10 ? `0${s}` : `${s}`
    return `${mm}:${ss}`
  }

  // Find the best voice and mode for speech synthesis
  const selectVoice = React.useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return null
    const voices = window.speechSynthesis.getVoices() || []

    if (lang === "gu") {
      // Priority 1: Native Gujarati voice (e.g. Edge Microsoft Dhwani/Niranjan, Android Google Gujarati)
      const guVoice = voices.find(
        (v) =>
          (v.lang && v.lang.toLowerCase().replace("_", "-").startsWith("gu")) ||
          (v.name && (v.name.toLowerCase().includes("gujarati") || v.name.includes("ગુજરાતી")))
      )
      if (guVoice) {
        return { voice: guVoice, lang: guVoice.lang || "gu-IN", isNativeGujarati: true }
      }

      // Priority 2: Hindi Indic voice (Chrome Google हिन्दी, Edge Swara, Windows Kalpana, iOS Lekha)
      const hiVoice = voices.find(
        (v) =>
          (v.lang && v.lang.toLowerCase().replace("_", "-").startsWith("hi")) ||
          (v.name && (v.name.toLowerCase().includes("hindi") || v.name.includes("हिन्दी")))
      )
      if (hiVoice) {
        return { voice: hiVoice, lang: hiVoice.lang || "hi-IN", isNativeGujarati: false }
      }

      // Priority 3: Fallback with hi-IN language tag (invokes browser cloud Hindi TTS)
      return { voice: null, lang: "hi-IN", isNativeGujarati: false }
    } else {
      // English voice
      const enVoice =
        voices.find((v) => v.lang && v.lang.toLowerCase().replace("_", "-").startsWith("en")) ||
        voices.find((v) => v.default) ||
        (voices.length > 0 ? voices[0] : null)
      return { voice: enVoice, lang: enVoice?.lang || "en-US", isNativeGujarati: false }
    }
  }, [lang])

  // Speak a specific chunk index
  const playChunk = React.useCallback((index) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return
    if (!textChunks || textChunks.length === 0 || index >= textChunks.length) {
      setIsPlaying(false)
      isPlayingRef.current = false
      setCurrentTime(calculatedDuration)
      currentChunkIndexRef.current = 0
      clearInterval(timerRef.current)
      return
    }

    currentChunkIndexRef.current = index

    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume()
    }

    const rawChunk = textChunks[index]
    const chosen = selectVoice()

    let textToSpeak = rawChunk
    if (lang === "gu") {
      // If we have a native Gujarati voice, speak the original Gujarati script.
      // If using Hindi TTS or fallback, transliterate to Devanagari for perfect Hindi pronunciation.
      if (!chosen?.isNativeGujarati) {
        textToSpeak = gujaratiToDevanagari(rawChunk)
      }
    }

    // Absolute guarantee: strip any remaining comma, colon, semicolon, quote or rogue symbol
    textToSpeak = textToSpeak
      .replace(/[,;:]/g, " ")
      .replace(/["'“”‘’«»`]/g, "")
      .replace(/[()[\]{}]/g, " ")
      .replace(/\s+/g, " ")
      .trim()

    // Ensure clean end of sentence with no trailing punctuation debris
    textToSpeak = textToSpeak.replace(/[\s.,;:!?\-—–]+$/, "").trim()
    if (!/[.!?]$/.test(textToSpeak)) {
      textToSpeak += "."
    }

    if (!textToSpeak || textToSpeak === ".") {
      if (isPlayingRef.current && index + 1 < textChunks.length) {
        playChunkRef.current?.(index + 1)
      }
      return
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak)
    utterance.rate = speedRef.current
    utterance.lang = chosen?.lang || (lang === "gu" ? "hi-IN" : "en-US")

    if (chosen?.voice) {
      utterance.voice = chosen.voice
    }

    // Prevent garbage collection bug in Chromium
    window._astroSpeechUtterance = utterance
    utteranceRef.current = utterance

    utterance.onend = () => {
      if (isPlayingRef.current) {
        const nextIndex = index + 1
        if (nextIndex < textChunks.length) {
          playChunkRef.current?.(nextIndex)
        } else {
          // Finished reading the entire article
          setIsPlaying(false)
          isPlayingRef.current = false
          setCurrentTime(calculatedDuration)
          currentChunkIndexRef.current = 0
          clearInterval(timerRef.current)
        }
      }
    }

    utterance.onerror = (e) => {
      // Ignore user-initiated cancellations or interruptions
      if (e?.error === "canceled" || e?.error === "interrupted") return
      console.warn("Speech synthesis notice:", e?.error)
      if (isPlayingRef.current && index + 1 < textChunks.length) {
        setTimeout(() => {
          if (isPlayingRef.current) {
            playChunkRef.current?.(index + 1)
          }
        }, 60)
      } else if (isPlayingRef.current) {
        setIsPlaying(false)
        isPlayingRef.current = false
        clearInterval(timerRef.current)
      }
    }

    try {
      window.speechSynthesis.speak(utterance)
    } catch (err) {
      console.warn("Speech synthesis speak error:", err)
    }
  }, [textChunks, selectVoice, lang, calculatedDuration])

  React.useEffect(() => {
    playChunkRef.current = playChunk
  }, [playChunk])

  // Smooth progress timer
  const startTimer = React.useCallback(() => {
    clearInterval(timerRef.current)
    const intervalMs = 250
    timerRef.current = setInterval(() => {
      setCurrentTime((prev) => {
        const increment = (intervalMs / 1000) * speedRef.current
        const next = prev + increment
        if (next >= calculatedDuration) {
          return calculatedDuration
        }
        return next
      })
    }, intervalMs)
  }, [calculatedDuration])

  // Handle Play/Pause
  const togglePlay = () => {
    if (typeof window === "undefined") return

    if (isPlaying) {
      // Pause
      setIsPlaying(false)
      isPlayingRef.current = false
      clearInterval(timerRef.current)
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel()
      }
    } else {
      // Play or Resume
      const hasSpeech = "speechSynthesis" in window
      if (!hasSpeech) {
        setNotice(
          lang === "gu"
            ? "આ બ્રાઉઝરમાં વોઇસ સ્પીચ સપોર્ટેડ નથી. વિઝ્યુઅલ રીડિંગ પ્રોગ્રેસ ચાલુ રહેશે."
            : "Voice speech is not supported in this browser. Visual reading progress will continue."
        )
      } else {
        setNotice(null)
      }

      // If at or near the end, restart from beginning
      const isNearEnd = currentTime >= calculatedDuration - 0.5
      const startFrom = isNearEnd ? 0 : currentChunkIndexRef.current

      if (isNearEnd) {
        setCurrentTime(0)
        currentChunkIndexRef.current = 0
      }

      setIsPlaying(true)
      isPlayingRef.current = true
      startTimer()

      if (hasSpeech && textChunks.length > 0) {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume()
        }
        window.speechSynthesis.cancel()
        playChunk(startFrom)
      }
    }
  }

  // Handle Slider Scrub / Seek
  const handleSeek = (newTime) => {
    setCurrentTime(newTime)
    if (textChunks.length > 0) {
      const targetChunk = Math.min(
        textChunks.length - 1,
        Math.max(0, Math.floor((newTime / calculatedDuration) * textChunks.length))
      )
      currentChunkIndexRef.current = targetChunk
      if (isPlaying) {
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
          window.speechSynthesis.cancel()
        }
        playChunk(targetChunk)
      }
    }
  }

  // Handle Playback Speed change
  const handleSpeedChange = (idx) => {
    setSpeedIndex(idx)
    const newSpeed = speeds[idx]
    speedRef.current = newSpeed

    if (isPlaying) {
      startTimer()
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel()
        playChunk(currentChunkIndexRef.current)
      }
    }
  }

  // Chromium keep-alive to prevent speech synthesis pausing after 15 seconds
  React.useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return
    if (!isPlaying) return

    const keepAlive = setInterval(() => {
      if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
        window.speechSynthesis.pause()
        window.speechSynthesis.resume()
      }
    }, 10_000)

    return () => clearInterval(keepAlive)
  }, [isPlaying])

  // Eagerly query voices and cleanup speech synthesis on unmount
  React.useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.getVoices()
      return () => {
        window.speechSynthesis.cancel()
        clearInterval(timerRef.current)
      }
    }
    return () => {
      clearInterval(timerRef.current)
    }
  }, [])

  // Reset when article or language changes
  const articleKey = `${articleText || ""}-${lang}`
  const [prevArticleKey, setPrevArticleKey] = React.useState(articleKey)
  if (prevArticleKey !== articleKey) {
    setPrevArticleKey(articleKey)
    setCurrentTime(0)
    setIsPlaying(false)
    setNotice(null)
  }

  React.useEffect(() => {
    currentChunkIndexRef.current = 0
    isPlayingRef.current = false
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel()
    }
    return () => {
      clearInterval(timerRef.current)
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [articleText, lang])

  return (
    <div className="w-full bg-[#f8f7f3] dark:bg-[#1c1d1a] border border-[#e6e3da] dark:border-white/10 rounded-2xl p-4 sm:p-5 shadow-xs transition-all">
      {/* Top Header Row */}
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-[#008d7f]/10 dark:bg-[#008d7f]/20 flex items-center justify-center shrink-0">
            <Volume2 className="h-4 w-4 text-[#008d7f] dark:text-[#38b2ac]" />
          </div>
          <h3 className="font-bold text-sm sm:text-base text-foreground leading-none">
            {title}
          </h3>
        </div>

        {/* Dynamic Time counter: 01:23 / 02:45 */}
        <div className="text-xs sm:text-sm font-mono text-muted-foreground font-semibold tabular-nums">
          {formatDigits(formatTime(currentTime), lang)} / {formatDigits(formatTime(calculatedDuration), lang)}
        </div>
      </div>

      {/* Controls & Waveform Track */}
      <div className="flex items-center gap-2.5 sm:gap-3.5">
        {/* Circular Play/Pause button */}
        <button
          onClick={togglePlay}
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#008d7f] hover:bg-[#007b6e] active:scale-95 text-white flex items-center justify-center shrink-0 shadow-sm transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#008d7f]/40 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#1c1d1a]"
          aria-label={isPlaying ? (lang === "gu" ? "ઓડિયો અટકાવો" : "Pause article audio") : (lang === "gu" ? "ઓડિયો સાંભળો" : "Play article audio")}
          type="button"
        >
          {isPlaying ? (
            <Pause className="h-5 w-5 fill-white text-white" />
          ) : (
            <Play className="h-5 w-5 fill-white text-white ml-0.5" />
          )}
        </button>

        {/* Slider scrub track */}
        <div className="flex-1 px-3 sm:px-4 bg-white dark:bg-[#1e201b] h-11 sm:h-12 rounded-full border border-[#e2dfd5] dark:border-white/10 flex items-center shadow-2xs">
          <Slider
            value={[Math.min(calculatedDuration, Math.max(0, Math.round(currentTime)))]}
            max={calculatedDuration}
            min={0}
            step={1}
            onValueChange={(val) => {
              const newTime = Array.isArray(val) ? val[0] : val
              handleSeek(newTime)
            }}
            className="w-full cursor-pointer [&_[data-slot=slider-range]]:bg-[#008d7f] [&_[data-slot=slider-thumb]]:border-[#008d7f] [&_[data-slot=slider-thumb]]:h-4 [&_[data-slot=slider-thumb]]:w-4 focus-visible:outline-none"
            aria-label={lang === "gu" ? "ઓડિયો ટ્રેક" : "Audio track scrubber"}
          />
        </div>

        {/* Playback Speed Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="h-11 sm:h-12 px-3 sm:px-3.5 rounded-full bg-white dark:bg-[#1e201b] border border-[#e2dfd5] dark:border-white/10 text-xs font-bold text-foreground hover:bg-[#eae8e1] dark:hover:bg-white/10 flex items-center gap-1.5 shrink-0 transition-colors shadow-2xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#008d7f]/40 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#1c1d1a]"
              aria-label="Change playback speed"
              type="button"
            >
              <Gauge className="h-4 w-4 text-muted-foreground" />
              <span>{currentSpeed}x</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-36">
            <DropdownMenuLabel className="text-xs">
              {lang === "gu" ? "ઝડપ પસંદ કરો" : "Playback Speed"}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={String(speedIndex)}
              onValueChange={(val) => handleSpeedChange(Number(val))}
            >
              {speeds.map((s, idx) => (
                <DropdownMenuRadioItem key={s} value={String(idx)} className="text-xs cursor-pointer">
                  {s}x {s === 1 && (lang === "gu" ? "(સામાન્ય)" : "(Normal)")}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {notice && (
        <div className="mt-3 text-xs text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 p-2.5 rounded-xl border border-amber-200 dark:border-amber-900/60 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{notice}</span>
        </div>
      )}
    </div>
  )
}
