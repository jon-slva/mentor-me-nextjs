import React from 'react'
import { Link } from 'react-router-dom'
import "./Header.scss"
import accountIcon from '../../assets/account icon.svg'
import homeIcon from '../../assets/home-icon-silhouette-svgrepo-com.svg'


const Header = ({ setMarkers }) => {
    return (
        <header className='header'>
            <Link to="/">
                <h2 onClick={() => setMarkers([])} className="header__logo">MentorMe</h2>
            </Link>
            <div className='header__account'>
                <Link to="/" >
                    <img className="header__home--icon" src={homeIcon} alt="Home" />
                </Link>
                <Link to="/login">
                    <p className="header__account--text">
                        Account
                    </p>
                    <img className="header__account--icon" src={accountIcon} alt="Account" />
                </Link>
            </div>
            {/* <Link to="/my-account">Account</Link> */}
        </header>
    )
}

export default Header
