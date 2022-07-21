import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import NewsItem from './NewsItem'
import InfiniteScroll from 'react-infinite-scroll-component'
import Spinner from './Spinner'

export default function News(props) {

  const [articles, setarticles] = useState([])
  const [page, setpage] = useState(1)
  const [pageSize, setpageSize] = useState(20)
  const [totalResults, settotalResults] = useState(0)
  const [loading, setloading] = useState(true)
  const [apiKey, setapiKey] = useState(process.env.REACT_APP_NEWS_AP1_1)

  const updateNews = async () => {
    props.setProgress(0)

    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`
    props.setProgress(30)

    const response = await fetch(url)
    props.setProgress(60)

    const data = await response.json()
    props.setProgress(90)

    setarticles(data.articles)
    settotalResults(data.totalResults)
    setloading(false)
    props.setProgress(100)
  }

  useEffect(() => {
    updateNews()
  }, [])

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${apiKey}&page=${page + 1}&pageSize=${pageSize}`
    let response = await fetch(url)
    let data = await response.json()
    setarticles(articles.concat(data.articles))
    settotalResults(data.totalResults)
    setpage(page + 1)
    console.log(page, articles.length, totalResults);    // clog running first then dom is populating (asynchronous behaviour)
  }

  return (
    <div className='container my-3 p-3 border border-muted rounded-3'>
      <div className='d-flex flex-column flex-lg-row justify-content-center align-items-center justify-content-lg-between'>
        <h1 className='mb-3 fw-bold text-center text-lg-start' id='headline-heading'>{`Top Headlines - ${props.title}`}</h1>
      </div>
      {loading && <Spinner />}
      <InfiniteScroll dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
      >
        <div className='d-flex justify-content-evenly align-items-start flex-wrap'>
          {articles.map((e) => {
            return <NewsItem key={e.url} title={e.title} description={e.description !== null ? e.description.slice(0, 99) + "....." : ''}
              imgUrl={e.urlToImage !== null ? e.urlToImage : 'https://www.rbs.ca/wp-content/themes/rbs/images/news-placeholder.png'}
              newsUrl={e.url} date={new Date(e.publishedAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short', hour12: false })} source={e.source.name} />
          })}
        </div>
      </InfiniteScroll>
    </div>
  )
}

News.propTypes = {
  title: PropTypes.string,
  country: PropTypes.string,
  category: PropTypes.string
}

News.defaultProps = {
  title: 'Explore',
  country: 'us',
  category: 'general'
}
