import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import shoe from './../assets/img/hermione-granger.gif'
import logo from './../assets/img/LOGO.png'

const LoginTemplate = () => {
  return (
    <div className="template__login">
        <div className="template__login-container">
            <div className="template__login-content">
                <div className="template__card">
                    <img src={shoe} alt="shoes" />
                    <NavLink to='/home' className="logo">
                      <img src={logo} alt="logo" />
                      <span>Tiệm Gương Huyễn Cảnh</span>
                    </NavLink>
                    <div className="overlay"></div>
                </div>
                <Outlet />
            </div>
        </div>
    </div>
  )
}

export default LoginTemplate