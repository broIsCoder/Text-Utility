// import React, { useState } from 'react' // no need in jsx
import PropTypes from 'prop-types'
import navbar from './navbar.css'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Switch,
    NavLink,
    Link
  } from 'react-router-dom'

export const NavBar = (props) => {
    return (
        <nav className="navbar navbar-expand-lg" style={props.theme} >
            <div className="container-fluid">
                <Link className="navbar-brand" to="/" style={props.theme} >
                    {props.title} ({props.version})
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon border bg-white"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/" style={props.theme} >
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/about" style={props.theme} >
                                About
                            </Link>
                        </li>
                    </ul>

                    <div className="themeBtnContainer">

                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onClick={props.toggleTheme} />
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Light Mode</label>
                        </div>
                        |
                        <button className='themeBtn'style={props.themeAlt} onClick={props.toggleThemeAlt}>Random Theme</button>
                    </div>

                </div>

            </div>
        </nav>
    )
}

NavBar.propTypes = {
    title: PropTypes.string.isRequired,
    version: PropTypes.number
}

NavBar.defaultProps = {
    version: 0.1
}