import React from 'react'

export default function About(props) {

  props.setProgress(0)
  const altTheme = props.theme === 'light' ? 'dark' : 'light'
  props.setProgress(100)

  return (
    <div className={`container my-3 p-3 border border-${props.theme === 'light' ? 'muted' : 'dark'} bg-${props.theme} text-${altTheme} rounded-3`}>
      <h1 className='text-center mb-4'>About</h1>
      <p className='text-center'>Open News v2 - Latest news from around the World, for free</p>
      <p className='text-center'>Made using React, Hope you enjoy it ❤️</p>
      <p className='text-center'> Github - https://github.com/arryhere/Open-News-v2</p>
      <p className='text-center'>Special thanks to @CodeWithHarry for project inspiration ❤️</p>
    </div>
  )
}