"use client"
import { Button } from '@/components/ui/button'
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs'
import Image from 'next/image'
import React from 'react'

function Hero() {
  return (
    <div className='flex flex-col justify-center items-center main-div'>
        <div className='hidden lg:block'>
        <Image src='/img1.jpg' width={100} height={100} className="h-[100px] 
        object-cover rounded-full absolute right-20" alt="A"/>
        <Image src='/img2.avif' width={100} height={100} className="h-[100px] 
        object-cover rounded-full absolute right-36 top-48" alt="B"/>
        <Image src='/img4.webp' width={150} height={150} className="h-[100px] 
        object-cover rounded-full absolute left-10" alt="C"/>
        <Image src='/img3.jpeg' width={100} height={100} className="h-[100px] 
        object-cover rounded-full absolute left-36 bottom-10" alt="D"/>
        </div>
        <div className='text-center max-w-3xl mb-5'>
        <h2 className="font-bold text-[60px] text-slate-700">
        Streamline Your Schedule
        </h2>

        <h2 className="text-xl mt-5 text-slate-500">
          Meet-Orbit is your scheduling automation platform for eliminating the
          back-and-forth emails to find the perfect time — and so much more.
        </h2>

        <div className='flex gap-4 flex-col mt-5'>
            <h3 className='text-sm'>Sign Up free with Google and Facebook</h3>
            <div className='flex justify-center gap-10 mt-2'>
               <LoginLink> <Button className='p-7 flex gap-4 btn'>
                    <Image src='/google.png' alt='google'
                    width={40} height={40}/>
                    Sign up with Google</Button>
                    </LoginLink>
                    <LoginLink>  <Button className='p-7 flex gap-4 btn'>
                    <Image src='/facebook.png' alt='google'
                    width={40} height={40}/>
                    Sign up with Facebook</Button></LoginLink>
            </div>
            <hr></hr>
            <LoginLink> <h2><span className="signup-link">Sign up Free with Email.</span> No Credit card required</h2></LoginLink> 
        </div>
        </div>
    </div>
  )
}

export default Hero