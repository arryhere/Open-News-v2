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


export default class App extends Component {
  constructor() {
    super()
    this.state = {
      showScrollTopBtn: null,
      showScrollBottomBtn: null,
      country: 'in'
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
  
  render() {
    window.addEventListener('scroll', this.toggleScrollBtns);

    return (
      <Router >
        <NavBar />
        <Routes>
          <Route exact path="/" element={<News key="home" title="Home" pageSize={20} country={this.state.country}
            category={"general"} />} />
          <Route exact path="/business" element={<News key="business" title="Business" pageSize={20} country={this.state.country}
            category={"business"} />} />
          <Route exact path="/entertainment" element={<News key="entertainment" title="Entertainment" pageSize={20} country={this.state.country}
            category={"entertainment"} />} />
          <Route exact path="/health" element={<News key="health" title="Health" pageSize={20} country={this.state.country}
            category={"health"} />} />
          <Route exact path="/science" element={<News key="science" title="Science" pageSize={20} country={this.state.country}
            category={"science"} />} />
          <Route exact path="/sports" element={<News key="sports" title="Sports" pageSize={20} country={this.state.country}
            category={"sports"} />} />
          <Route exact path="/technology" element={<News key="technology" title="Technology" pageSize={20} country={this.state.country}
            category={"technology"} />} />
          <Route exact path="/about" element={<About />} />
        </Routes>
        <ScrollTopBtn showScrollTopBtn={this.state.showScrollTopBtn} />
        <ScrollBottomBtn showScrollToBottomBtn={this.state.showScrollBottomBtn} />
      </Router>
    )
  }
}



