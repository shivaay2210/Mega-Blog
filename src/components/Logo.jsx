import React from 'react'

function Logo({ classname }) {
  return (
    <div className={`${classname}`}>
      <img src="/logo.png" alt="" className='invert w-[100px] h-[70px] rounded-full'/>
    </div>
  )
}

export default Logo