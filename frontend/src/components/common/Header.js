import React from 'react'
import image from '../../assets/ph-logo.jpg'
import { Link } from 'react-router-dom'

class Header extends React.Component {
  render(){
    return(
      <header className="header">
        <Link to="/"><img className="logo" src={image} alt='Pairs Head of the River logo' /></Link>
      </header>
    )
  }
}
export default Header
