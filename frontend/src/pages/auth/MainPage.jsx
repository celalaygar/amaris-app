

import React, { useState } from 'react';
import SignUpPage from './UserSignupPage';
import UserLoginPage from './UserLoginPage';

const MainPage = () => {


    const [isLoginPage, setIsLoginPage] = useState(true);

    const [isSignUpPage, setIsSignUpPage] = useState(false);

    const openLoginPage = () => {
        setIsLoginPage(true);
        setIsSignUpPage(false);
    }

    const openSignUpPage = () => {

        setIsLoginPage(false);
        setIsSignUpPage(true);
    }
    return (
        <div className='container'>
            <div className='row '>
                <div className='col-lg-12'>
                    <button onClick={openLoginPage} className='btn btn-secondary'>Üye Giriş</button>
                    <button onClick={openSignUpPage} className='btn btn-secondary'>Üye Kayıt</button>
                </div>
            </div>
            <div className='row'>
                <div className='col-lg-12 mt-2'>
                    {isLoginPage && <UserLoginPage />}
                    {isSignUpPage && <SignUpPage />}
                </div>
            </div>
        </div>
    );
};

export default MainPage;