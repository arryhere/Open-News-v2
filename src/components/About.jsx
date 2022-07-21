import React from 'react'

export default function About(props) {

  props.setProgress(0)
  const altTheme = props.theme === 'light' ? 'dark' : 'light'
  props.setProgress(100)

  return (
    <div className={`container my-3 p-3 border border-${props.theme === 'light' ? 'muted' : 'dark'} bg-${props.theme} text-${altTheme} rounded-3`}>
      <h1 className='text-center'>About</h1>
    </div>
  )
}