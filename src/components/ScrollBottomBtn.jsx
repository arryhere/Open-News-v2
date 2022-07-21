import React from 'react'

export default function ScrollBottomBtn(props) {

  const style = {
    bottom: '10px',
    left: '10px'
  }

  const scrollBottom = () => {
    document.documentElement.scrollTop = document.documentElement.scrollHeight;
  }

  return (
    props.showScrollToBottomBtn && <div>
      <button type="button" className='scroll-btn btn btn-sm btn-dark position-fixed' style={style}
        onClick={scrollBottom}><i className="bi bi-chevron-down"></i>
      </button>
    </div>
  )
}