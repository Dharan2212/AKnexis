import Image from 'next/image'
import { cn } from '@/lib/utils/cn'

type Props = {
  src: string
  className?: string
  opacity?: number // 0 to 1
}

export default function HeritageImageBackground({ src, className, opacity = 0.7 }: Props) {
  return (
    <div className={cn('absolute inset-0 -z-10 pointer-events-none', className)}>
      <Image
        src={src}
        alt=""
        fill
        priority={false}
        className="object-cover object-center"
      />

      {/* Soft dim + brand tint */}
      <div
        className="absolute inset-0"
        
      />

      {/* Control how “strong” the image feels */}
      <div
        className="absolute inset-0 bg-[#03060F]"
        style={{ opacity: 1 - opacity }}
      />
    </div>
  )
}