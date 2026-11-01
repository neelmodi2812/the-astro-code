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
  const [, setVoicesLoaded] = React.useState(false)

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

  // Calculate dynamic duration from word count (~130 words per minute average reading rate)
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

  // Split text into readable sentences/clauses (< 180 chars) to prevent Chromium 15-second speech freeze
  const textChunks = React.useMemo(() => {
    if (!articleText) return []
    // Split by sentence terminators: Gujarati danda (।), full stop, ?, !, newline
    const sentences = articleText
      .split(/(?<=[।?!.\n])\s+/)
      .map((s) => s.trim())
      .filter(Boolean)

    const chunks = []
    for (const sent of sentences) {
      if (sent.length <= 180) {
        chunks.push(sent)
      } else {
        // Split long sentence by commas or clauses
        const parts = sent.split(/(?<=[,;])\s+/).filter(Boolean)
        chunks.push(...parts)
      }
    }
    return chunks.length > 0 ? chunks : [articleText]
  }, [articleText])

  // Format MM:SS helper
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60)
    const s = Math.floor(secs % 60)
    const mm = m < 10 ? `0${m}` : `${m}`
    const ss = s < 10 ? `0${s}` : `${s}`
    return `${mm}:${ss}`
  }

  // Find best available voice for language
  const selectVoice = React.useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return null
    const voices = window.speechSynthesis.getVoices() || []
    if (voices.length === 0) return null

    if (lang === "gu") {
      // 1. Native Gujarati
      const guVoice = voices.find(
        (v) =>
          (v.lang && v.lang.toLowerCase().replace("_", "-").startsWith("gu")) ||
          (v.name && (v.name.toLowerCase().includes("gujarati") || v.name.includes("ગુજરાતી")))
      )
      if (guVoice) return guVoice

      // 2. Hindi fallback (closest Indic phonetics engine)
      const hiVoice = voices.find(
        (v) =>
          (v.lang && v.lang.toLowerCase().replace("_", "-").startsWith("hi")) ||
          (v.name && (v.name.toLowerCase().includes("hindi") || v.name.includes("हिन्दी")))
      )
      if (hiVoice) return hiVoice

      // 3. Indian English
      const inVoice = voices.find(
        (v) =>
          (v.lang && v.lang.toLowerCase().replace("_", "-") === "en-in") ||
          (v.name && v.name.toLowerCase().includes("india"))
      )
      if (inVoice) return inVoice
    } else {
      // English voice
      const enVoice = voices.find(
        (v) => v.lang && v.lang.toLowerCase().replace("_", "-").startsWith("en")
      )
      if (enVoice) return enVoice
    }

    // 4. Default or first available voice
    return voices.find((v) => v.default) || voices[0]
  }, [lang])

  // Speak a specific chunk index
  const playChunk = React.useCallback((index) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return
    if (!textChunks || textChunks.length === 0 || index >= textChunks.length) {
      setIsPlaying(false)
      setCurrentTime(0)
      currentChunkIndexRef.current = 0
      clearInterval(timerRef.current)
      return
    }

    currentChunkIndexRef.current = index
    window.speechSynthesis.cancel()

    const text = textChunks[index]
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = speedRef.current

    const chosenVoice = selectVoice()
    if (chosenVoice) {
      utterance.voice = chosenVoice
      utterance.lang = chosenVoice.lang || (lang === "gu" ? "gu-IN" : "en-US")
    } else {
      utterance.lang = lang === "gu" ? "gu-IN" : "en-US"
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
          setIsPlaying(false)
          setCurrentTime(0)
          currentChunkIndexRef.current = 0
          clearInterval(timerRef.current)
        }
      }
    }

    utterance.onerror = (e) => {
      // Ignore user-initiated cancels / interruptions
      if (e?.error === "canceled" || e?.error === "interrupted") return
      console.warn("Speech synthesis notice:", e?.error)
      // On non-fatal error, advance to next chunk
      if (isPlayingRef.current && index + 1 < textChunks.length) {
        setTimeout(() => {
          if (isPlayingRef.current) {
            playChunkRef.current?.(index + 1)
          }
        }, 80)
      }
    }

    try {
      window.speechSynthesis.speak(utterance)
    } catch (err) {
      console.warn("Speech synthesis speak error:", err)
    }
  }, [textChunks, selectVoice, lang])

  React.useEffect(() => {
    playChunkRef.current = playChunk
  }, [playChunk])

  // Start smooth progress timer
  const startTimer = React.useCallback(() => {
    clearInterval(timerRef.current)
    const intervalMs = 250
    timerRef.current = setInterval(() => {
      setCurrentTime((prev) => {
        const increment = (intervalMs / 1000) * speedRef.current
        const next = prev + increment
        if (next >= calculatedDuration) {
          clearInterval(timerRef.current)
          setIsPlaying(false)
          currentChunkIndexRef.current = 0
          if (typeof window !== "undefined" && "speechSynthesis" in window) {
            window.speechSynthesis.cancel()
          }
          return 0
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

      setIsPlaying(true)
      startTimer()

      if (hasSpeech && textChunks.length > 0) {
        // Calculate appropriate starting chunk from currentTime
        const startingChunk = Math.min(
          textChunks.length - 1,
          Math.max(0, Math.floor((currentTime / calculatedDuration) * textChunks.length))
        )
        playChunk(startingChunk)
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
        playChunk(targetChunk)
      }
    }
  }

  // Handle Playback Speed change
  const handleSpeedChange = (idx) => {
    setSpeedIndex(idx)
    const newSpeed = speeds[idx]
    speedRef.current = newSpeed

    // Restart timer with new speed calculation
    if (isPlaying) {
      startTimer()
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        playChunk(currentChunkIndexRef.current)
      }
    }
  }

  // Listen for voices loading & unmount cleanup
  React.useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const handleVoices = () => {
        const v = window.speechSynthesis.getVoices()
        if (v && v.length > 0) {
          setVoicesLoaded(true)
        }
      }
      handleVoices()
      window.speechSynthesis.addEventListener("voiceschanged", handleVoices)
      return () => {
        window.speechSynthesis.removeEventListener("voiceschanged", handleVoices)
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
        {/* Circular Play/Pause button - clean without intrusive floating tooltip */}
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
              <Gauge className="h-3.5 w-3.5 text-[#008d7f]" />
              <span>{currentSpeed}x</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-36 p-1.5 rounded-xl bg-card dark:bg-[#1c1d1a] shadow-lg border border-border/80">
            <DropdownMenuLabel className="text-xs font-bold text-muted-foreground px-2 py-1">
              {lang === "gu" ? "પ્લેબેક સ્પીડ" : "Playback Speed"}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={String(currentSpeed)}
              onValueChange={(val) => {
                const spd = parseFloat(val)
                const idx = speeds.indexOf(spd)
                if (idx !== -1) {
                  handleSpeedChange(idx)
                }
              }}
            >
              {speeds.map((spd) => (
                <DropdownMenuRadioItem key={spd} value={String(spd)} className="cursor-pointer text-xs py-1.5">
                  {spd}x {spd === 1 && (lang === "gu" ? "(સામાન્ય)" : "(Normal)")}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Non-intrusive fallback notice if speech is totally unavailable in browser */}
      {notice && (
        <div className="mt-3 px-3.5 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-900 dark:text-amber-200 flex items-start justify-between gap-2.5 animate-fadeIn">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-snug">{notice}</p>
          </div>
          <button
            onClick={() => setNotice(null)}
            className="text-amber-700 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-100 font-bold px-1.5 py-0.5 rounded-md hover:bg-amber-500/20 transition-colors text-xs shrink-0 cursor-pointer"
            aria-label={lang === "gu" ? "સૂચના બંધ કરો" : "Dismiss notice"}
            type="button"
          >
            ×
          </button>
        </div>
      )}
    </div>
  )
}
