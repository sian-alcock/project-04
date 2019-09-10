import React from 'react'
import image from '../../assets/phlogo-horizontal.png'

class Header extends React.Component {
  render(){
    return(
      <header>
        <div className="header">
          <img src={image} alt='Pairs Head of the River logo' />
        </div>
      </header>
    )
  }
}
export default Header
