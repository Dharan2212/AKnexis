import TopBar from '@/components/layout/TopBar'
import Header from '@/components/layout/Header'

export default function SiteHeader() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[2000]">
      <TopBar />
      <Header />
    </div>
  )
}