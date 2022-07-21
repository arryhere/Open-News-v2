import React from 'react'

export default function ScrollTopBtn(props) {

  const style = {
    bottom: '47px',
    left: '10px'
  }

  const scrollTop = () => {
    document.documentElement.scrollTop = 0;
  }

  return (
    props.showScrollTopBtn && <div>
      <button type="button" className='scroll-btn btn btn-sm btn-dark position-fixed' style={style}
        onClick={scrollTop}><i className="bi bi-chevron-up"></i>
      </button>
    </div>
  )
}