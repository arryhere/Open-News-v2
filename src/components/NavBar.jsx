import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar(props) {

  const getCountry = (e) => {
    props.setCountry(e.target.value)
  }

  const setTheme = () => {
    props.setTheme()
  }

  const altTheme = props.theme === 'light' ? 'dark' : 'light'

  return (
    <>
      <nav className={`navbar navbar-expand-lg navbar-${props.theme} bg-${props.theme}`}>
        <div className="container-fluid">
          <img src="/logo192.png" alt="Open-News-logo" height="40" />
          <Link className="navbar-brand fw-bold fs-4 ms-2 me-4" to="/">Open News</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/business">Business</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/entertainment">Entertainment</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/health">Health</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/science">Science</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/sports">Sports</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/technology">Technology</Link>
              </li>
            </ul>
            <div>
              <ul className="navbar-nav me-auto mb-lg-0">
                <li className="nav-item my-auto me-lg-2">
                  <select className={`form-select form-select-sm bg-${props.theme} text-${altTheme}`}
                    defaultValue={props.country} onChange={getCountry}>
                    <option value="in">India</option>
                    <option value="jp">Japan</option>
                    <option value="us">United States</option>
                    <option value="kr">South Korea</option>
                    <option value="cn">China</option>
                    <option value="gb">United Kingdom</option>
                    <option value="ae">United Arab Emirates</option>
                    <option value="ca">Canada</option>
                    <option value="au">Australia</option>
                    <option value="ru">Russia</option>
                    <option value="ua">Ukraine</option>
                    <option value="nz">New Zealand</option>
                    <option value="sg">Singapore</option>
                    <option value="de">Germany</option>
                    <option value="ch">Switzerland</option>
                    <option value="it">Italy</option>
                    <option value="be">Belgium</option>
                    <option value="fr">France</option>
                    <option value="nl">Netherlands</option>
                    <option value="se">Sweden</option>
                  </select>
                </li>
                <li className="nav-item d-flex justify-content-center align-items-center me-auto">
                  <Link className="nav-link" to="/about">
                    <button type='button' className={`navbar-btn btn btn-sm btn-${props.theme === 'light' ? 'dark' : 'success'}`}>
                      <i className="bi bi-question-lg"></i>
                    </button>
                  </Link>
                  <button type='button' className={`navbar-btn btn btn-sm btn-${props.theme === 'light' ? 'dark' : 'success'} ms-1`} onClick={setTheme}>
                    {props.theme === 'light'
                      ? <i className="bi bi-moon-fill"></i>
                      : <i className="bi bi-sun-fill"></i>}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}