'use client'

import { useEffect, useState } from 'react'
import type { HeritageVariant } from './heritage.config'

interface HeritageBackgroundProps {
  variant: HeritageVariant
  density?: 'soft' | 'medium'
  className?: string
}

const SVG_MAP: Record<HeritageVariant, string> = {
  mahabalipuram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M180 580 L180 420 L150 400 L165 380 L155 360 L168 340 L158 320 L172 300 L162 280 L178 260 L168 240 L183 220 L175 200 L190 180 L182 160 L196 140 L189 120 L202 100 L197 80 L210 60 L223 80 L218 100 L231 120 L224 140 L238 160 L230 180 L245 200 L237 220 L252 240 L242 260 L258 280 L248 300 L262 320 L252 340 L265 360 L255 380 L270 400 L240 420 L240 580"/><path d="M145 580 L145 490 L255 490 L255 580"/><path d="M130 580 L130 505 L270 505 L270 580"/><path d="M168 240 L232 240"/><path d="M172 280 L228 280"/><path d="M175 320 L225 320"/><path d="M178 360 L222 360"/><path d="M182 400 L218 400"/><path d="M100 580 L100 460 L80 445 L90 428 L82 410 L94 392 L86 375 L100 360 L114 375 L106 392 L118 410 L110 428 L120 445 L100 460"/><path d="M300 580 L300 460 L280 445 L290 428 L282 410 L294 392 L286 375 L300 360 L314 375 L306 392 L318 410 L310 428 L320 445 L300 460"/><path d="M175 560 Q185 545 195 540 Q205 545 215 560"/><path d="M60 590 Q80 585 100 590 Q120 595 140 590 Q160 585 180 590 Q200 595 220 590 Q240 585 260 590 Q280 595 300 590 Q320 585 340 590"/><circle cx="210" cy="150" r="6"/><circle cx="210" cy="200" r="5"/></svg>`,
  thiruvalluvar: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 700" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M60 700 L60 580 L240 580 L240 700"/><path d="M50 600 L250 600"/><path d="M40 620 L260 620"/><path d="M75 580 L75 540 L225 540 L225 580"/><path d="M120 540 L115 480 L185 480 L180 540"/><path d="M115 480 L108 440 L105 400 L108 360 L120 340"/><path d="M185 480 L192 440 L195 400 L192 360 L180 340"/><path d="M115 460 L185 460"/><path d="M112 440 L188 440"/><path d="M110 420 L190 420"/><path d="M120 340 L118 300 L182 300 L180 340"/><path d="M118 310 L130 340 L150 345 L170 340 L182 310"/><path d="M200 278 L215 265 L225 268 L215 278 L200 285"/><path d="M215 258 L240 255 L242 268 L217 272 Z"/><path d="M100 278 L82 262 L78 250 L86 248 L95 260 L105 270"/><ellipse cx="150" cy="268" rx="28" ry="22"/><path d="M122 256 L130 240 L140 232 L150 228 L160 232 L170 240 L178 256"/><path d="M143 228 L148 215 L150 208 L152 215 L158 228"/><circle cx="150" cy="206" r="4"/></svg>`,
  valluvarKottam: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 600" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><circle cx="130" cy="540" r="35"/><circle cx="130" cy="540" r="20"/><circle cx="370" cy="540" r="35"/><circle cx="370" cy="540" r="20"/><path d="M130 505 L130 575 M95 540 L165 540 M100 510 L160 570 M100 570 L160 510"/><path d="M370 505 L370 575 M335 540 L405 540 M340 510 L400 570 M340 570 L400 510"/><path d="M80 505 L80 460 L420 460 L420 505"/><path d="M150 460 L150 380 L350 380 L350 460"/><path d="M180 460 Q180 440 200 435 Q220 440 220 460"/><path d="M240 460 Q240 440 260 435 Q280 440 280 460"/><path d="M300 460 Q300 440 320 435 Q340 440 340 460"/><path d="M165 380 L165 310 L335 310 L335 380"/><path d="M185 310 L185 250 L315 250 L315 310"/><path d="M205 250 L205 200 L295 200 L295 250"/><path d="M220 200 L220 158 L280 158 L280 200"/><path d="M220 158 L240 120 L250 100 L260 120 L280 158"/><path d="M243 100 L250 85 L257 100"/><circle cx="250" cy="72" r="5"/></svg>`,
  tajMahal: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 500" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M50 460 L50 420 L550 420 L550 460"/><path d="M70 420 L70 200 L60 198 L65 185 L60 170 L70 165 L80 170 L75 185 L80 198 L70 200"/><ellipse cx="70" cy="162" rx="10" ry="6"/><path d="M530 420 L530 200 L520 198 L525 185 L520 170 L530 165 L540 170 L535 185 L540 198 L530 200"/><ellipse cx="530" cy="162" rx="10" ry="6"/><path d="M130 420 L130 280 L470 280 L470 420"/><path d="M155 420 Q155 370 180 360 Q205 370 205 420"/><path d="M240 420 Q240 340 300 325 Q360 340 360 420"/><path d="M395 420 Q395 370 420 360 Q445 370 445 420"/><path d="M220 280 Q220 180 300 155 Q380 180 380 280"/><ellipse cx="300" cy="155" rx="50" ry="20"/><path d="M295 155 L295 130 L305 130 L305 155"/><ellipse cx="300" cy="128" rx="15" ry="8"/><circle cx="300" cy="103" r="4"/><path d="M155 280 Q155 245 175 235 Q195 245 195 280"/><path d="M405 280 Q405 245 425 235 Q445 245 445 280"/><path d="M200 460 L200 490 L400 490 L400 460"/></svg>`,
}

export default function HeritageBackground({
  variant,
  density = 'soft',
  className = '',
}: HeritageBackgroundProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const opacity = density === 'soft' ? 0.045 : 0.065
  const svgContent = SVG_MAP[variant]

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* Gradient overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#03060F] via-[#03060F]/60 to-transparent z-10" />
      
      {/* SVG Heritage artwork */}
      <div
        className="absolute right-0 top-0 h-full flex items-center justify-end"
        style={{
          width: '60%',
          opacity: mounted ? opacity : 0,
          transition: 'opacity 1s ease',
          color: '#2DD4BF',
        }}
      >
        <div
          className="w-full h-full"
          style={{
            animation: mounted ? 'floatSvg 12s ease-in-out 3s infinite' : 'none',
          }}
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      </div>
    </div>
  )
}
