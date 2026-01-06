import React from 'react'
import HeroSection from './HeroSection'
import Categories from './Categories'
import FeaturedProducts from './FeaturedProducts'
import PromoSection from './promoSection'
import FeaturesSection from './FeaturesSection'

const Home = () => {
  return (
    <>
      <HeroSection />
      <Categories/>
      <FeaturesSection/>
      <PromoSection/>
      <FeaturedProducts/>
      
    </>
  )
}

export default Home