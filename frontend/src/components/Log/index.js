import React, { useState } from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const index = () => {
    const [signUpModal, setsignUpModal] = useState(true);
    const [signInModal, setsignInModal] = useState(false);

    const handleModals = (e) => {
        if (e.target.id === "register") {
            setsignInModal(false);
            setsignUpModal(true)
        } else if (e.target.id === "login") {
            setsignInModal(true);
            setsignUpModal(false)
        }
    }
    return (
        <div className="connection-from">
            <div className="form-container">
                <ul>
                    <li onClick={handleModals} id="register" className={signUpModal ? "active-btn" : "no-active-btn"}>S'inscrire</li>
                    <li onClick={handleModals} id="login" className={signInModal ? "active-btn" : "no-active-btn"}>Se connecter</li>
                </ul>
                {signUpModal && <SignUpForm />}
                {signInModal && <SignInForm />}

            </div>
        </div>
    );
};

export default index;

//condition && ce quon veut faire