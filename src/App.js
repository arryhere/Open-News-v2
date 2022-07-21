import React, { Component } from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NavBar from './components/NavBar';
import News from './components/News';
import About from './components/About';
import ScrollTopBtn from './components/ScrollTopBtn';
import ScrollBottomBtn from './components/ScrollBottomBtn';
import LoadingBar from 'react-top-loading-bar';


export default class App extends Component {
  constructor() {
    super()
    this.state = {
      showScrollTopBtn: null,
      showScrollBottomBtn: null,
      country: localStorage.getItem('country') === null ? 'us' : localStorage.getItem('country'),
      progress: 0
    }
  }

  toggleScrollBtns = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 200) {
      this.setState({
        showScrollTopBtn: true,
        showScrollBottomBtn: true
      })
    }
    else {
      this.setState({
        showScrollTopBtn: null,
        showScrollBottomBtn: null
      })
    }
  }

  setCountry = (country) => {
    this.setState({ country: country })
    localStorage.setItem('country', country)
    window.location.reload(true)
  }

  setProgress = (progress) => {
    this.setState({
      progress: progress
    })
  }


  render() {
    window.addEventListener('scroll', this.toggleScrollBtns);

    return (
      <Router >
        <header className='sticky-top'>
          <LoadingBar color='#f11946' progress={this.state.progress} />
          <NavBar setCountry={this.setCountry} country={this.state.country} />
        </header>
        <Routes>
          <Route exact path="/" element={<News key="home" title="Home" country={this.state.country}
            category={"general"} setProgress={this.setProgress} />} />

          <Route exact path="/business" element={<News key="business" title="Business" country={this.state.country}
            category={"business"} setProgress={this.setProgress} />} />

          <Route exact path="/entertainment" element={<News key="entertainment" title="Entertainment" country={this.state.country}
            category={"entertainment"} setProgress={this.setProgress} />} />

          <Route exact path="/health" element={<News key="health" title="Health" country={this.state.country}
            category={"health"} setProgress={this.setProgress} />} />

          <Route exact path="/science" element={<News key="science" title="Science" country={this.state.country}
            category={"science"} setProgress={this.setProgress} />} />

          <Route exact path="/sports" element={<News key="sports" title="Sports" country={this.state.country}
            category={"sports"} setProgress={this.setProgress} />} />

          <Route exact path="/technology" element={<News key="technology" title="Technology" country={this.state.country}
            category={"technology"} setProgress={this.setProgress} />} />

          <Route exact path="/about" element={<About key="about" />} />
        </Routes>
        <ScrollTopBtn showScrollTopBtn={this.state.showScrollTopBtn} />
        <ScrollBottomBtn showScrollToBottomBtn={this.state.showScrollBottomBtn} />
      </Router>
    )
  }
}



