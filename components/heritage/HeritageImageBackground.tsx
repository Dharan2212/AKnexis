import Image from 'next/image';
import { cn } from '@/lib/utils/cn'; // Assumes you're using the standard Shadcn/Tailwind utility

interface Props {
  src: string;
  className?: string;
  opacity?: number;
}

export default function HeritageImageBackground({ src, className, opacity = 0.7 }: Props) {
  return (
    // -z-10 moves it behind the parent's content
    <div className={cn('absolute inset-0 -z-10 pointer-events-none overflow-hidden', className)}>
      <Image
        src={src}
        alt=""
        fill
        priority={false}
        className="object-cover"
        sizes="100vw"
      />

      {/* Brand tint overlay */}
      <div className="absolute inset-0 bg-[#03060F]/20" />

      {/* Opacity control overlay */}
      <div
        className="absolute inset-0 bg-[#03060F]"
        style={{ opacity: 1 - opacity }}
      />
    </div>
  );
}
