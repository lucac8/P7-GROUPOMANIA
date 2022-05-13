import React from 'react';
import Log from '../components/Log'
import Header from '../components/Header';


const Login = () => {

    //Utilisateur connecter 
    if (localStorage.getItem('token') != null) {
        window.location = 'http://localhost:3000/post'
    }

    return (
        <div className="login-page">
            <Header />
            <div className="log-container">
                <Log />
            </div>
        </div>
    );
};

export default Login;