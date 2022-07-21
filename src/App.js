import React, { useState } from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import News from './components/News';
import About from './components/About';
import ScrollTopBtn from './components/ScrollTopBtn';
import ScrollBottomBtn from './components/ScrollBottomBtn';
import LoadingBar from 'react-top-loading-bar';


export default function App(props) {

  const [showScrollTopBtn, setshowScrollTopBtn] = useState(null)
  const [showScrollBottomBtn, setshowScrollBottomBtn] = useState(null)
  const [country, setcountry] = useState(localStorage.getItem('country') === null ? 'us' : localStorage.getItem('country'))
  const [progress, setprogress] = useState(0)

  const toggleScrollBtns = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 200) {
      setshowScrollTopBtn(true)
      setshowScrollBottomBtn(true)
    }
    else {
      setshowScrollTopBtn(null)
      setshowScrollBottomBtn(null)
    }
  }

  const setCountry = (country) => {
    setcountry(country)
    localStorage.setItem('country', country)
    window.location.reload(true)
  }

  const setProgress = (progress) => {
    setprogress(progress)
  }

  window.addEventListener('scroll', toggleScrollBtns);

  return (
    <Router >
      <header className='sticky-top'>
        <LoadingBar color='#f11946' progress={progress} />
        <NavBar setCountry={setCountry} country={country} />
      </header>
      <Routes>
        <Route exact path="/" element={<News key="home" title="Home" country={country}
          category={"general"} setProgress={setProgress} />} />

        <Route exact path="/business" element={<News key="business" title="Business" country={country}
          category={"business"} setProgress={setProgress} />} />

        <Route exact path="/entertainment" element={<News key="entertainment" title="Entertainment" country={country}
          category={"entertainment"} setProgress={setProgress} />} />

        <Route exact path="/health" element={<News key="health" title="Health" country={country}
          category={"health"} setProgress={setProgress} />} />

        <Route exact path="/science" element={<News key="science" title="Science" country={country}
          category={"science"} setProgress={setProgress} />} />

        <Route exact path="/sports" element={<News key="sports" title="Sports" country={country}
          category={"sports"} setProgress={setProgress} />} />

        <Route exact path="/technology" element={<News key="technology" title="Technology" country={country}
          category={"technology"} setProgress={setProgress} />} />

        <Route exact path="/about" element={<About key="about" />} />
      </Routes>
      <ScrollTopBtn showScrollTopBtn={showScrollTopBtn} />
      <ScrollBottomBtn showScrollToBottomBtn={showScrollBottomBtn} />
    </Router>
  )
}



