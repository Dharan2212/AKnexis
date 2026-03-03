import { cn } from '@/lib/utils/cn'

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  contained?: boolean
}

export default function Section({ children, className, id, contained = true }: SectionProps) {
  return (
    <section id={id} className={cn('py-16 lg:py-24', className)}>
      {contained ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {children}
        </div>
      ) : children}
    </section>
  )
}
