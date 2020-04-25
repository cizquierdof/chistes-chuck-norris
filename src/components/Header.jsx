import React from 'react'
import chuck from '../images/chuck.gif'
import '../css/Header.css'

const Header = () => {
    return (
        <div className='cabecera'>
            <h2 className='ui header brown' data-text='Chuck Norris'>
                <img className='' src={chuck} alt='chuck' />
                <div className='content'>Chuck jokes</div>
            </h2>
        </div>
    )
}

export default Header
