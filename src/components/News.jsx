import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NewsItem from './NewsItem'
import Spinner from './Spinner'

export default class News extends Component {

  constructor() {
    super()
    // console.log('constructor');
    this.state = {
      // articles: this.articles,
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
      apiKey: 'e104cd12f0fd47f7a2ac7d932682002a'
    }
  }

  // articles = [
  //   {
  //     "source": {
  //       "id": "espn-cric-info",
  //       "name": "ESPN Cric Info"
  //     },
  //     "author": null,
  //     "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
  //     "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
  //     "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
  //     "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
  //     "publishedAt": "2020-03-30T15:26:05Z",
  //     "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
  //   }
  // ]

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

  async componentDidMount() {
    // console.log('cdm');
    this.setState({ loading: true })
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.state.apiKey}&page=1&pageSize=${this.props.pageSize}`
    let response = await fetch(url)
    let data = await response.json()
    // console.log(data);
    this.setState({
      articles: data.articles,
      totalResults: data.totalResults,
      loading: false
    })
  }


  handleNextClick = async () => {
    this.setState({ loading: true })
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.state.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
    let response = await fetch(url)
    let data = await response.json()
    this.setState({
      articles: data.articles,
      page: ++this.state.page,
      loading: false
    })
  }

  handlePreviousClick = async () => {
    this.setState({ loading: true })
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.state.apiKey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
    let response = await fetch(url)
    let data = await response.json()
    this.setState({
      articles: data.articles,
      page: --this.state.page,
      loading: false
    })
  }

  render() {
    // console.log('render');
    return (
      <div className='container my-3 p-3 border border-muted rounded-3'>
        <div className='d-flex flex-column flex-lg-row justify-content-center align-items-center justify-content-lg-between'>
          <h1 className='mb-3 fw-bold text-center text-lg-start' id='headline-heading'>{`Top Headlines - ${this.props.title}`}</h1>
          <div className='d-none d-lg-flex flex-row justify-content-between align-items-center'>
            <button type='button' className='btn btn-sm btn-dark ms-2' onClick={this.handlePreviousClick}
              disabled={this.state.page <= 1}><i className="bi bi-chevron-left"></i>
            </button>
            <span className='ms-2'>Page {this.state.page}</span>
            <button type='button' className='btn btn-sm btn-dark ms-2' onClick={this.handleNextClick}
              disabled={this.state.page >= Math.ceil(this.state.totalResults / this.props.pageSize)}>
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
        {this.state.loading && <Spinner />}
        <div className='d-flex justify-content-evenly align-items-start flex-wrap'>
          {!this.state.loading && this.state.articles.map((e) => {
            return <NewsItem key={e.url} title={e.title} description={e.description !== null ? e.description.slice(0, 99) + "....." : ''}
              imgUrl={e.urlToImage !== null ? e.urlToImage : 'https://www.rbs.ca/wp-content/themes/rbs/images/news-placeholder.png'}
              newsUrl={e.url} date={new Date(e.publishedAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short', hour12: false })} source={e.source.name}/>
          })}
        </div>
        <hr />
        <div className="container d-flex justify-content-between align-items-center">
          <button type='button' className='btn btn-sm btn-dark' onClick={this.handlePreviousClick}
            disabled={this.state.page <= 1}><i className="bi bi-chevron-left"></i>
          </button>
          <span>Page {this.state.page}</span>
          <button type='button' className='btn btn-sm btn-dark' onClick={this.handleNextClick}
            disabled={this.state.page >= Math.ceil(this.state.totalResults / this.props.pageSize)}><i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>
    )
  }
}
