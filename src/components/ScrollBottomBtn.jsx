import React, { Component } from 'react'

export default class ScrollBottomBtn extends Component {
  style = {
    bottom: '90px',
    left: '10px'
  }

  scrollBottom = () => {
    document.documentElement.scrollTop = document.documentElement.scrollHeight;
  }
  render() {
    
    return (
      this.props.showScrollToBottomBtn && <div>
        <button type="button" className='btn btn-sm btn-dark position-fixed' style={this.style} 
          onClick={this.scrollBottom}><i className="bi bi-chevron-down"></i>
        </button>
      </div>
    )
  }
}
