import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const Header = ({ arrow }) => {

    return (
        <header>
            <img src="../logo/icon-left-font2.png" alt="logo groupomania" height={250} className='header-pc' />
            <img src="../logo/icon.png" alt="" className='header-tel' />
        </header>
    );
};

export default Header;