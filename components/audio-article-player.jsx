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
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
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
  const [voiceWarning, setVoiceWarning] = React.useState(null)

  const speeds = [1, 1.25, 1.5, 2]
  const currentSpeed = speeds[speedIndex]

  const utteranceRef = React.useRef(null)
  const timerRef = React.useRef(null)

  // Calculate dynamic duration from word count (~130 words per minute average reading/speech rate)
  const words = React.useMemo(() => {
    if (!articleText) return 0
    return articleText.trim().split(/\s+/).filter(Boolean).length
  }, [articleText])

  const calculatedDuration = React.useMemo(() => {
    if (words > 0) {
      // 130 words per minute = (words / 130) * 60 seconds. Minimum 20 seconds.
      return Math.max(20, Math.ceil((words / 130) * 60))
    }
    return propDurationSeconds || 180
  }, [words, propDurationSeconds])

  // Format MM:SS helper
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60)
    const s = Math.floor(secs % 60)
    const mm = m < 10 ? `0${m}` : `${m}`
    const ss = s < 10 ? `0${s}` : `${s}`
    return `${mm}:${ss}`
  }

  // Voice detection helper for mobile Safari/Chrome & desktop
  const detectVoiceSupport = React.useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return { supported: false, voice: null, reason: "api_unsupported" }
    }
    const voices = window.speechSynthesis.getVoices()
    if (!voices || voices.length === 0) {
      // Voice list not yet loaded by browser; system default will attempt playback
      return { supported: true, voice: null, reason: "loading" }
    }

    if (lang === "gu") {
      // Check for native Gujarati voice
      const guVoice = voices.find((v) => v.lang && v.lang.toLowerCase().replace("_", "-").startsWith("gu"))
      if (guVoice) return { supported: true, voice: guVoice, reason: "exact" }

      // Check for Hindi voice fallback (close Indic phonetics)
      const hiVoice = voices.find((v) => v.lang && v.lang.toLowerCase().replace("_", "-").startsWith("hi"))
      if (hiVoice) return { supported: true, voice: hiVoice, reason: "fallback" }

      return { supported: false, voice: null, reason: "no_indic_voice" }
    } else {
      const enVoice = voices.find((v) => v.lang && v.lang.toLowerCase().replace("_", "-").startsWith("en"))
      return { supported: !!enVoice || voices.length > 0, voice: enVoice || voices[0], reason: "english" }
    }
  }, [lang])

  // Handle Play/Pause
  const togglePlay = () => {
    if (typeof window === "undefined") return

    if (isPlaying) {
      // Pause
      if (window.speechSynthesis && window.speechSynthesis.speaking) {
        window.speechSynthesis.pause()
      }
      clearInterval(timerRef.current)
      setIsPlaying(false)
    } else {
      // Play / Resume
      setIsPlaying(true)

      // Start internal timer for realistic playback progress
      clearInterval(timerRef.current)
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= calculatedDuration) {
            clearInterval(timerRef.current)
            setIsPlaying(false)
            return 0
          }
          return prev + 1 * currentSpeed
        })
      }, 1000)

      // Web Speech API execution
      if ("speechSynthesis" in window) {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume()
        } else {
          window.speechSynthesis.cancel() // clear any prior queue

          const voiceStatus = detectVoiceSupport()
          if (lang === "gu" && !voiceStatus.supported) {
            setVoiceWarning(
              "આ મોબાઇલ/બ્રાઉઝરમાં ગુજરાતી સ્પીચ વોઇસ પેક ઇન્સ્ટોલ નથી. કૃપા કરીને ડિવાઇસ સેટિંગ્સમાંથી 'Gujarati Text-to-Speech' સક્ષમ કરો. વિઝ્યુઅલ રીડિંગ ટાઈમર ચાલુ રહેશે."
            )
          } else {
            setVoiceWarning(null)
          }

          const textToSpeak = articleText || "The Astro Code article narration"
          const utterance = new SpeechSynthesisUtterance(textToSpeak)
          utterance.rate = currentSpeed
          utterance.lang = lang === "gu" ? "gu-IN" : "en-US"

          if (voiceStatus.voice) {
            utterance.voice = voiceStatus.voice
          }

          utterance.onend = () => {
            setIsPlaying(false)
            clearInterval(timerRef.current)
          }

          utterance.onerror = (e) => {
            console.warn("Speech synthesis notice:", e?.error)
            if (e?.error && e.error !== "canceled" && e.error !== "interrupted") {
              setVoiceWarning(
                lang === "gu"
                  ? "ગુજરાતી વોઇસ પેક આ ડિવાઇસ પર ઉપલબ્ધ નથી. વિઝ્યુઅલ રીડિંગ માર્ગદર્શિકા ચાલુ રહેશે."
                  : "Speech voice is unavailable on this device. Visual reading guide will continue."
              )
            }
          }

          utteranceRef.current = utterance
          try {
            window.speechSynthesis.speak(utterance)
          } catch (err) {
            console.warn("Failed to invoke speech synthesis speak:", err)
          }
        }
      } else {
        setVoiceWarning(
          lang === "gu"
            ? "આ બ્રાઉઝરમાં Web Speech API સપોર્ટેડ નથી. વિઝ્યુઅલ પ્રોગ્રેસ ટાઈમર સક્રિય છે."
            : "Web Speech API is not supported in this browser. Visual reading timer will continue."
        )
      }
    }
  }

  // Seek on slider scrub
  const handleSeek = (newTime) => {
    setCurrentTime(newTime)
    if (typeof window !== "undefined" && "speechSynthesis" in window && isPlaying) {
      // Re-trigger from proportionate text if browser supports or continue timer
    }
  }

  // Clean up on unmount or language/article change
  React.useEffect(() => {
    setCurrentTime(0)
    setIsPlaying(false)
    setVoiceWarning(null)
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel()
      window.speechSynthesis.getVoices()
      const handleVoicesChanged = () => {
        window.speechSynthesis.getVoices()
      }
      window.speechSynthesis.addEventListener("voiceschanged", handleVoicesChanged)
      return () => {
        window.speechSynthesis.removeEventListener("voiceschanged", handleVoicesChanged)
        clearInterval(timerRef.current)
        window.speechSynthesis.cancel()
      }
    }
    return () => {
      clearInterval(timerRef.current)
    }
  }, [articleText, lang])

  return (
    <div className="w-full bg-[#f8f7f3] dark:bg-[#0d3833] border border-[#e6e3da] dark:border-white/10 rounded-2xl p-4 sm:p-5 shadow-xs transition-all">
      {/* Top Header Row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Volume2 className="h-5 w-5 text-[#008d7f] dark:text-[#38b2ac] shrink-0" />
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
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Circular Play/Pause button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={togglePlay}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#008d7f] hover:bg-[#00766b] text-white flex items-center justify-center shrink-0 shadow-md transition-all active:scale-95 group cursor-pointer"
              aria-label={isPlaying ? "Pause article audio" : "Play article audio"}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5 fill-white text-white" />
              ) : (
                <Play className="h-5 w-5 fill-white text-white ml-0.5" />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>{isPlaying ? (lang === "gu" ? "અટકાવો" : "Pause") : (lang === "gu" ? "સાંભળો" : "Play")}</p>
          </TooltipContent>
        </Tooltip>

        {/* Slider scrub track */}
        <div className="flex-1 px-3 py-2 bg-white dark:bg-[#0b332f] h-11 sm:h-12 rounded-full border border-[#e2dfd5] dark:border-white/10 flex items-center">
          <Slider
            value={[Math.min(calculatedDuration, Math.max(0, Math.round(currentTime)))]}
            max={calculatedDuration}
            min={0}
            step={1}
            onValueChange={(val) => {
              const newTime = Array.isArray(val) ? val[0] : val
              handleSeek(newTime)
            }}
            className="w-full cursor-pointer [&_[data-slot=slider-range]]:bg-[#008d7f] [&_[data-slot=slider-thumb]]:border-[#008d7f]"
            aria-label={lang === "gu" ? "ઓડિયો ટ્રેક" : "Audio track scrubber"}
          />
        </div>

        {/* Playback Speed Dropdown */}
        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <button
                  className="h-10 sm:h-11 px-2.5 sm:px-3 rounded-full bg-white dark:bg-[#0b332f] border border-[#e2dfd5] dark:border-white/10 text-xs font-bold text-foreground hover:bg-[#eae8e1] dark:hover:bg-white/10 flex items-center gap-1.5 shrink-0 transition-colors shadow-xs cursor-pointer"
                  aria-label="Change playback speed"
                >
                  <Gauge className="h-3.5 w-3.5 text-[#008d7f]" />
                  <span>{currentSpeed}x</span>
                </button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>{lang === "gu" ? "સ્પીડ પસંદ કરો" : "Select speed"}</p>
            </TooltipContent>
          </Tooltip>
          <DropdownMenuContent align="end" className="w-36 p-1.5 rounded-xl bg-card dark:bg-[#0d3833] shadow-lg">
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
                  setSpeedIndex(idx)
                  if (utteranceRef.current && typeof window !== "undefined" && "speechSynthesis" in window && isPlaying) {
                    window.speechSynthesis.cancel()
                    const utterance = new SpeechSynthesisUtterance(articleText)
                    utterance.rate = spd
                    utterance.lang = lang === "gu" ? "gu-IN" : "en-US"
                    window.speechSynthesis.speak(utterance)
                  }
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

      {/* Graceful Voice Unsupported / Fallback Notice */}
      {voiceWarning && (
        <div className="mt-3 px-3.5 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-900 dark:text-amber-200 flex items-start justify-between gap-2.5 animate-fadeIn">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-snug">{voiceWarning}</p>
          </div>
          <button
            onClick={() => setVoiceWarning(null)}
            className="text-amber-700 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-100 font-bold px-1.5 py-0.5 rounded-md hover:bg-amber-500/20 transition-colors text-xs shrink-0 cursor-pointer"
            aria-label={lang === "gu" ? "ચેતવણી બંધ કરો" : "Dismiss notice"}
          >
            ×
          </button>
        </div>
      )}
    </div>
  )
}
