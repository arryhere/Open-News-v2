import React from 'react'

export default function NewsItem(props) {

  let { title, description, imgUrl, newsUrl, date, source } = props

  return (
    <div className="card m-3" style={{ width: "18rem" }}>
      <img src={imgUrl} className="card-img-top positon-relative" alt={`img-${title}`} />
      <span className="position-absolute top-0 end-0 badge text-bg-success">{source}</span>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <div className='d-flex justify-content-between align-items-center'>
          <a href={newsUrl} className="btn btn-sm btn-dark" target="_blank" rel="noreferrer">Read More</a>
          <p className="card-text"><small className="text-muted">{date}</small></p>
        </div>
      </div>
    </div>
  )
}