import React from 'react'
import ImageSlider from '../components/ImageSlider'
import CategoryList from '../components/Categories'
import { Zap } from 'lucide-react'

function Home() {
  return (
    <div>
      <div className='w-full h-12 dark:bg-gray-500 dark:text-white bg-rose-200 text-black text-center flex justify-center items-center gap-6 font-bold'>
        <Zap fill='black' />
        <h1> Happy Holiday deals </h1>

        <Zap fill='black' />
      </div>

      <ImageSlider />

      <div className="flex flex-col items-center text-center p-12 mt-5 bg-black dark:bg-white   shadow-lg ">
        <span className="text-sm font-semibold text-white dark:text-black uppercase tracking-wide mb-2">NEW COLLECTION</span>
        <h2 className="text-2xl font-bold text-white dark:text-blackmb-4">BEST PICKS 2024</h2>
        <div className="flex items-center justify-center">
          <p className="text-white dark:text-black text-base md:text-lg leading-relaxed w-full ">
            Appear, dry there darkness they're seas, dry waters thing fly midst. Beast, above fly brought Very green.
          </p>
        </div>
      </div>


      <CategoryList />
    </div>
  )
}

export default Home
