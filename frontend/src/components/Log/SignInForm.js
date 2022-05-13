import React, { useState } from 'react';
import axios from 'axios';

const SignInForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (e) => {
        e.preventDefault();

        axios.post('http://localhost:5000/api/user/login', { email, password }
        ).then((res) => {
            localStorage.setItem("token", res.data.token)
            localStorage.setItem("user", res.data.idUser)
            window.location = '/post';
        }
        ).catch((err) => {
            console.log(err);
            document.querySelector(".error").innerHTML = "Le mot de passe et l'adresse mail ne correspondent pas "
        })
    }

    return (
        <form action="" onSubmit={handleLogin} id="signInForm">
            <label htmlFor="email">Email</label>
            <br />
            <input type="text" id="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email} />
            <br />
            <label htmlFor="password">Mot de passe</label>
            <br />
            <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} />
            <br />
            <div className="error"></div>
            <input type="submit" value="Se connecter" className='button' />
        </form>
    );
};

export default SignInForm;