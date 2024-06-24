import './NavBar.css'
import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'
import Login from '../Auth/Login'
import Logout from '../Auth/Logout'
import { Menu } from '@mui/icons-material'
import { Button } from '@mui/material'
export default function NavBar() {
  const userToken = localStorage.getItem("userToken")
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const styleForDiv = {
    cursor: 'pointer',
    width: '100%',
    justifyContent: 'center',
    display: 'flex',
  }

  function goToHome() {
    navigate('/')
  }

  function goToNews() {
    navigate('/news')
  }

  function goToContact() {
    navigate('/contact')
  }

  function goToAbout() {
    navigate('/about')
  }
  return (
    <div className='navbarContainer'>
      <button className="menuToggle" onClick={() => setIsOpen(!isOpen)} style={{
        color: 'white',
        backgroundColor: '#333',
        '&:hover': {
          backgroundColor: '#808080',
        }
      }}><Menu /></button>
      <ul className={isOpen ? 'open' : ''} style={{
        margin: '0px'
      }}>
        <div className='onHover' style={styleForDiv}
          onClick={goToHome}>
          <li>Home</li>
        </div>
        <div className='onHover' style={styleForDiv}
          onClick={goToNews}>
          <li>News</li>
        </div>
        <div className='onHover' style={styleForDiv}
          onClick={goToContact}>
          <li>Contact</li>
        </div>
        <div className='onHover' style={styleForDiv}
          onClick={goToAbout}>
          <li>About</li>
        </div>
        {userToken ? <li style={{ padding: 0 }}><Logout></Logout></li> : <div ><Login></Login></div>}
        {
          userToken ?
            null :
            <div style={styleForDiv}>
              <li style={{ padding: "5px" }}>
                <h4 style={{
                  color: '#fff',
                  padding: '0'
                }}>
                  Login to edit
                </h4>
              </li>
            </div>

        }
      </ul>
    </div>
  )
}