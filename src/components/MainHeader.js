import React, { Component } from 'react'
import styles from './mainHeader.css'
import LogoOne from './LogoOne'

function MainHeader() {
  return (
    <header>
      <LogoOne />
      <div className="bottomLine"></div>
    </header>
  )
}

export default MainHeader
