"use client"

import { useEffect, useRef, useState } from "react"
import { AnimationOptions, motion, useAnimate, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

// Local changes from the fancycomponents.dev original, so it can carry a two-line h1:
// - letters are grouped into words that wrap, instead of one row that never wraps
// - each letter clips its own slide, so a moving letter never overlaps the next line
// - the second copy of each letter is only in the DOM while it rolls, so at rest the
//   heading's text is the label once (for search engines and text-reading tools)
// - a small state machine replaces the original lodash debounce
// - srLabel={false} drops the hidden label when the caller names the element itself
//   (aria-label on the h1), so the text is in the page once
// - className merges with cn(), so the caller can replace the centred alignment
// - no swap under prefers-reduced-motion

interface TextProps {
  label: string
  reverse?: boolean
  transition?: AnimationOptions
  staggerDuration?: number
  className?: string
  onClick?: () => void
  /** Render the screen-reader copy of the label. Set false when the parent has aria-label. */
  srLabel?: boolean
}

// idle: copies unmounted · in: rolling to the copies · out: rolling back, then unmount
type Phase = "idle" | "in" | "out"

const RandomLetterSwapPingPong = ({
  label,
  reverse = true,
  transition = {
    type: "spring",
    duration: 0.8,
  },
  staggerDuration = 0.02,
  className,
  onClick,
  srLabel = true,
  ...props
}: TextProps) => {
  const [scope, animate] = useAnimate()
  const [phase, setPhase] = useState<Phase>("idle")
  const reduceMotion = useReducedMotion()
  // Ignores the end of a roll-back that a new hover has interrupted
  const run = useRef(0)

  useEffect(() => {
    if (phase === "idle") return
    const id = ++run.current
    const forward = phase === "in"
    const order = Array.from(label, (_, i) => i)
      .filter((i) => label[i] !== " ") // spaces have no letter element
      .sort(() => Math.random() - 0.5)

    const runs = order.flatMap((index, n) => {
      const options = { ...transition, delay: n * staggerDuration }
      return [
        animate(
          ".letter-" + index,
          { y: forward ? (reverse ? "100%" : "-100%") : 0 },
          options
        ),
        animate(
          ".letter-secondary-" + index,
          { top: forward ? "0%" : reverse ? "-100%" : "100%" },
          options
        ),
      ]
    })

    if (!forward) {
      Promise.all(runs).then(() => {
        if (run.current === id) setPhase("idle")
      })
    }
    // Re-run only when the phase changes; label and timing props are fixed per heading
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  const hoverStart = () => {
    if (reduceMotion) return
    setPhase("in")
  }

  const hoverEnd = () => {
    if (phase === "idle") return
    setPhase("out")
  }

  // Words keep their letters together when the line wraps; i stays the letter's index in label
  const words: { letter: string; i: number }[][] = [[]]
  label.split("").forEach((letter, i) => {
    if (letter === " ") words.push([])
    else words[words.length - 1].push({ letter, i })
  })

  return (
    <motion.span
      className={cn("flex flex-wrap justify-center items-center relative", className)}
      onHoverStart={hoverStart}
      onHoverEnd={hoverEnd}
      onClick={onClick}
      ref={scope}
      {...props}
    >
      {srLabel && <span className="sr-only">{label}</span>}

      {words.map((word, w) => (
        <span key={w} className="flex" aria-hidden={true}>
          {word.map(({ letter, i }) => (
            // -mb-2 cancels the letter's pb-2 in layout, keeping the original line spacing
            <span className="whitespace-pre relative flex overflow-hidden -mb-2" key={i}>
              <motion.span
                className={`relative pb-2 letter-${i}`}
                style={{ top: 0 }}
              >
                {letter}
              </motion.span>
              {phase !== "idle" && (
                <motion.span
                  className={`absolute letter-secondary-${i}`}
                  style={{ top: reverse ? "-100%" : "100%" }}
                >
                  {letter}
                </motion.span>
              )}
            </span>
          ))}
          {w < words.length - 1 && <span className="whitespace-pre"> </span>}
        </span>
      ))}
    </motion.span>
  )
}

export default RandomLetterSwapPingPong
