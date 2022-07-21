import React, { Component } from 'react'

export default class ScrollTopBtn extends Component {
  style = {
    bottom: '47px',
    left: '10px'
  }

  scrollTop = () => {
    document.documentElement.scrollTop = 0;
  }
  render() {
    
    return (
      this.props.showScrollTopBtn && <div>
        <button type="button" className='scroll-btn btn btn-sm btn-dark position-fixed' style={this.style} 
          onClick={this.scrollTop}><i className="bi bi-chevron-up"></i>
        </button>
      </div>
    )
  }
}
