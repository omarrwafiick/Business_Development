import React from 'react'  
import SocialMediaBar from './socialmedia-bar'

export default function Footer() {
  return (   
        <div class="footer flex justify-center items-center w-full bg-dark">
            <div class="flex flex-col justify-center items-center w-10/12 p-12">
                <SocialMediaBar style={'fill-white'} /> 
                <div class="flex text-md text-white opacity-70 mt-6">© 2025 Copyright Reserved</div>
            </div>
        </div>
  )
}