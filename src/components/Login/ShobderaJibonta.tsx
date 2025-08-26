import { siteConfig } from '@/config/config'
import React from 'react'

const ShobderaJibonta = () => {
  return (
    <>
        <div className='max-w-[250px] mx-auto'>
            <div className=''>
                <img className='max-w-[180px] mx-auto' src={siteConfig.logo}/>
            </div>
            <p className='text-center mt-2 mb-4 text-white text-2xl'>যেখানে শব্দেরা জীবন্ত</p>
        </div>
    </>
  )
}

export default ShobderaJibonta