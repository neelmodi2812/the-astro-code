"use client"

import * as React from "react"
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Gauge,
  RotateCcw
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

// Predefined waveform relative heights (1 to 10 scale)
const WAVEFORM_HEIGHTS = [
  3, 6, 9, 5, 8, 10, 7, 4, 8, 9, 6, 7, 10, 8, 5, 7, 9, 6, 4, 8, 5, 7, 4, 3
]

export function AudioArticlePlayer({
  articleText = "",
  lang = "gu",
  title = "આ લેખ સાંભળો",
  durationSeconds = 432 // Default 07:12
}) {
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [currentTime, setCurrentTime] = React.useState(0)
  const [speedIndex, setSpeedIndex] = React.useState(0)
  const [isMuted, setIsMuted] = React.useState(false)

  const speeds = [1, 1.25, 1.5, 2]
  const currentSpeed = speeds[speedIndex]

  const synthRef = React.useRef(null)
  const utteranceRef = React.useRef(null)
  const timerRef = React.useRef(null)

  // Format MM:SS helper
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60)
    const s = Math.floor(secs % 60)
    const mm = m < 10 ? `0${m}` : `${m}`
    const ss = s < 10 ? `0${s}` : `${s}`
    return `${mm}:${ss}`
  }

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
          if (prev >= durationSeconds) {
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
          const textToSpeak = articleText || "The Astro Code article narration"
          const utterance = new SpeechSynthesisUtterance(textToSpeak)
          utterance.rate = currentSpeed
          utterance.lang = lang === "gu" ? "gu-IN" : "en-US"

          // Find appropriate voice if possible
          const voices = window.speechSynthesis.getVoices()
          const matchedVoice = voices.find(
            (v) => v.lang.startsWith(lang === "gu" ? "gu" : "en") || v.lang.startsWith("hi")
          )
          if (matchedVoice) {
            utterance.voice = matchedVoice
          }

          utterance.onend = () => {
            setIsPlaying(false)
            clearInterval(timerRef.current)
          }

          utterance.onerror = () => {
            // Speech error, fallback continues with visual timer
          }

          utteranceRef.current = utterance
          window.speechSynthesis.speak(utterance)
        }
      }
    }
  }

  // Speed toggle
  const cycleSpeed = () => {
    const nextIdx = (speedIndex + 1) % speeds.length
    setSpeedIndex(nextIdx)
    const newSpeed = speeds[nextIdx]

    if (utteranceRef.current && typeof window !== "undefined" && "speechSynthesis" in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel()
        const utterance = new SpeechSynthesisUtterance(articleText)
        utterance.rate = newSpeed
        utterance.lang = lang === "gu" ? "gu-IN" : "en-US"
        window.speechSynthesis.speak(utterance)
      }
    }
  }

  // Seek on waveform click
  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percent = Math.max(0, Math.min(1, clickX / rect.width))
    const targetSeconds = percent * durationSeconds
    setCurrentTime(targetSeconds)
  }

  // Clean up on unmount or language switch
  React.useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel()
        setIsPlaying(false)
        clearInterval(timerRef.current)
      }
      // Pre-load voices
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
  }, [lang])

  const currentPercent = Math.min(100, (currentTime / durationSeconds) * 100)

  return (
    <div className="w-full bg-[#f8f7f3] dark:bg-[#1a1b18] border border-[#e6e3da] dark:border-white/10 rounded-2xl p-4 sm:p-5 shadow-xs transition-all">
      {/* Top Header Row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Volume2 className="h-5 w-5 text-[#008d7f] dark:text-[#38b2ac] shrink-0" />
          <h3 className="font-bold text-sm sm:text-base text-foreground leading-none">
            {lang === "gu" ? "આ લેખ સાંભળો" : "Listen to this Article"}
          </h3>
          <span className="bg-[#e9e8e3] dark:bg-white/10 text-muted-foreground text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full">
            Audio
          </span>
        </div>

        {/* Time counter: 03:45 / 07:12 */}
        <div className="text-xs sm:text-sm font-mono text-muted-foreground font-semibold tabular-nums">
          {formatTime(currentTime)} / {formatTime(durationSeconds)}
        </div>
      </div>

      {/* Controls & Waveform Track */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Big circular Play/Pause button */}
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
        <div className="flex-1 px-3 py-2 bg-white dark:bg-[#121310] h-11 sm:h-12 rounded-full border border-[#e2dfd5] dark:border-white/10 flex items-center">
          <Slider
            value={[Math.min(durationSeconds, Math.max(0, Math.round(currentTime)))]}
            max={durationSeconds}
            min={0}
            step={1}
            onValueChange={(val) => {
              const newTime = Array.isArray(val) ? val[0] : val
              setCurrentTime(newTime)
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
                  className="h-10 sm:h-11 px-2.5 sm:px-3 rounded-full bg-white dark:bg-[#121310] border border-[#e2dfd5] dark:border-white/10 text-xs font-bold text-foreground hover:bg-[#eae8e1] dark:hover:bg-white/10 flex items-center gap-1.5 shrink-0 transition-colors shadow-xs cursor-pointer"
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
          <DropdownMenuContent align="end" className="w-36 p-1.5 rounded-xl bg-card dark:bg-[#1a1b18] shadow-lg">
            <DropdownMenuLabel className="text-[11px] font-bold text-muted-foreground px-2 py-1">
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
    </div>
  )
}
