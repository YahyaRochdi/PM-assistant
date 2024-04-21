export const metadata = {
  title: 'Home',
  description: 'Page description',
}

import Hero from '@/components/hero'
import Features from '@/components/features'


export default function Home() {
  return (
    <>
      <Hero />
      <Features />
    </>
  )
}
