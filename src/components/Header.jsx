import React from 'react';
import Header from './styles/Header.module.scss';
import logo from './../assets/logo.png';

import {
    Link
  } from "react-router-dom";
  

export default class HeaderMain extends React.Component{
    render () {
        return (
            <div className={Header.header__container}>
                <div>
                    <nav className={Header.header__menu}>
                        <ul className={Header.header__list}>
                            <li className={Header.header__item}><Link to="/table">Table Words</Link></li>
                            <li className={Header.header__item}><Link to="/learn">Learn Words</Link></li>
                            <Link to="/" className={Header.home__link}><img src={logo} alt='logo'></img></Link>                    
                        </ul>
                    </nav>
                </div>
            </div>
        )
    }
}