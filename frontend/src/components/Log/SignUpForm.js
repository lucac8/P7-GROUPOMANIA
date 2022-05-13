import React, { useState } from 'react';
import SignInForm from './SignInForm';
import axios from 'axios';

const SignUpForm = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [sendForm, setSendForm] = useState(false)

    const changeActive = () => {
        document.querySelector("#login").className = "active-btn";
        document.querySelector("#register").className = "no-active-btn"
    }

    const handleSignUp = (e) => {
        e.preventDefault();
        if (validEmail(email)) {
            axios.post('http://localhost:5000/api/user/signup', { email, password, username }
            ).then((res => { console.log(res); setSendForm(true) }))
                .catch((err => {
                    document.querySelector(".error").innerHTML = "Adresse mail déjà utilisée"
                }))
        } else (
            document.querySelector(".error").innerHTML = "Veuillez remplir correctement les champs"
        )

    }

    function validEmail(email) {
        let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');

        if (emailRegExp.test(email)) {
            document.querySelector('.error-email').textContent = ''
            return true
        } else {
            document.querySelector('.error-email').textContent = 'Veuillez remplir correctement ce champ'
            return false
        }
    }

    return (<>
        {sendForm ? (
            <>
                {changeActive()}
                <h4 className="success">
                    Enregistrement réussi, veuillez-vous connecter
                </h4>
                <SignInForm />
            </>
        ) : (

            <form action="" onSubmit={handleSignUp} id="signUpForm">
                <label htmlFor="email">Email</label>
                <br />
                <input type="text" id="email" name="email" onChange={(e) => { setEmail(e.target.value); validEmail(e.target.value) }} value={email} />
                <div className="error-email"></div>
                <br />
                <label htmlFor="username">Username</label>
                <br />
                <input type="text" id='username' name='username' onChange={(e) => setUsername(e.target.value)} value={username} />
                <br />
                <label htmlFor="password">Mot de passe</label>
                <br />
                <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                <br />
                <div className="error"></div>
                <input type="submit" value="Se créer un compte" className='button' />
            </form>)} </>
    );
};

export default SignUpForm;