import React from 'react'
import image from '../../assets/ph-logo.jpg'

class Header extends React.Component {
  render(){
    return(
      <header className="header">
        <img className="logo" src={image} alt='Pairs Head of the River logo' />
      </header>
    )
  }
}
export default Header
