import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NewsItem from './NewsItem'
import InfiniteScroll from 'react-infinite-scroll-component'
import Spinner from './Spinner'

export default class News extends Component {
  constructor() {
    super()
    this.state = {
      articles: [],
      page: 1,
      pageSize: 20,
      totalResults: 0,
      apiKey: process.env.REACT_APP_NEWS_AP1_3,
      loadng: true
    }
  }

  static defaultProps = {
    country: 'in',
    pageSize: 20,
    category: 'general',
    title: 'Explore'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    title: PropTypes.string
  }

  componentDidMount = async () => {
    this.props.setProgress(0)
    this.setState({ loading: true })
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.state.apiKey}&page=${this.state.page}&pageSize=${this.state.pageSize}`
    this.props.setProgress(30)
    let response = await fetch(url)
    this.props.setProgress(60)
    let data = await response.json()
    this.props.setProgress(90)
    this.setState({
      articles: data.articles,
      totalResults: data.totalResults,
      loading: false
    })
    this.props.setProgress(100)
  }

  fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.state.apiKey}&page=${this.state.page + 1}&pageSize=${this.state.pageSize}`
    let response = await fetch(url)
    let data = await response.json()
    this.setState({
      articles: this.state.articles.concat(data.articles),
      totalResults: data.totalResults,
      page: ++this.state.page
    })
  }

  render() {
    return (
      <div className='container my-3 p-3 border border-muted rounded-3'>
        <div className='d-flex flex-column flex-lg-row justify-content-center align-items-center justify-content-lg-between'>
          <h1 className='mb-3 fw-bold text-center text-lg-start' id='headline-heading'>{`Top Headlines - ${this.props.title}`}</h1>
        </div>
        {this.state.loading && <Spinner />}
        <InfiniteScroll dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={this.state.articles.length < this.state.totalResults && <Spinner />}
        >
          <div className='d-flex justify-content-evenly align-items-start flex-wrap'>
            {this.state.articles.map((e) => {
              return <NewsItem key={e.url} title={e.title} description={e.description !== null ? e.description.slice(0, 99) + "....." : ''}
                imgUrl={e.urlToImage !== null ? e.urlToImage : 'https://www.rbs.ca/wp-content/themes/rbs/images/news-placeholder.png'}
                newsUrl={e.url} date={new Date(e.publishedAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short', hour12: false })} source={e.source.name} />
            })}
          </div>
        </InfiniteScroll>
      </div>
    )
  }
}
