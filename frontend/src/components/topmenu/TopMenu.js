
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ApiService from '../../services/base/ApiService';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './TopMenu.css';
import { logoutAsync, selectedAuthentication } from '../../redux/redux-toolkit/authentication/AuthenticationSlice';
import * as alertify from 'alertifyjs';
import { PATH_UPDATE_MY_ACCOUNT, PATH_USER_DETAIL } from '../../constant/linkConstant';

const TopMenu = props => {
    const selectedAuth = useSelector(selectedAuthentication);
    const { isLoggedIn, username, role } = selectedAuth;

    const [navbarClassName, setNavbarClassName] = useState("navbar-toggler ");
    const [ariaExpanded, setAriaExpanded] = useState("false");
    const [navbarTargetDivClassName, setNavbarTargetDivClassName] = useState("navbar-collapse collapse");

    const dispatch = useDispatch();

    const onclickNavbar = (event) => {
        event.preventDefault();
        console.log(0)
        if (navbarClassName.includes("collapsed")) {
            setNavbarClassName("navbar-toggler ");
            setAriaExpanded("false");
            setNavbarTargetDivClassName("navbar-collapse collapse");
        } else {
            setNavbarClassName("navbar-toggler collapsed");
            setAriaExpanded("true");
            setNavbarTargetDivClassName("navbar-collapse collapse show");
        }
    }
    const onLogout = async () => {
        await alertify.confirm('Emin misiniz?', 'Çıkmak istediğinizden emin misiniz?',
            logoutYes, logoutNo)
            .set('labels', { ok: 'Evet', cancel: 'Hayır' });;
    }

    const logoutYes = async () => {
        try {
            await ApiService.logout();
            await ApiService.changeAuthToken(null);
            await dispatch(logoutAsync(null));
        } catch (error) {
            if (error.response) {
                console.log(error.response.data)
            }
            else if (error.request)
                console.log(error.request);
            else
                console.log(error.message);
        }
    }
    const logoutNo = async () => {
        return;
    }

    let links = (
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom ">

        </nav>
    );

    if (isLoggedIn) {
        links = (
            <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom  pl-2">

                <button
                    className={navbarClassName}
                    onClick={e => onclickNavbar(e)}
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded={ariaExpanded}
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={navbarTargetDivClassName} id="navbarSupportedContent">
                    <div className="navbar-nav">
                        <div className="nav-item dropdown">
                            <div className="dropdown">
                                <button
                                    className="btn dropdown-toggle"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    {username}
                                </button>
                                <ul className="dropdown-menu">
                                    <li key={3}><Link className="dropdown-item" to={PATH_USER_DETAIL}> Hesabım </Link></li>
                                    <li key={4}><Link className="dropdown-item" to={"/update-my-account/" + username}>  Bilgilerimi Güncelle </Link></li>
                                    <li key={31}><Link className="dropdown-item" to={"/update-my-password"}> Şifremi Güncelle </Link></li>
                                    <li key={6}><span className="dropdown-item" onClick={onLogout} style={{ cursor: "pointer" }}> Çıkış </span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="nav-item " onClick={onLogout} style={{ cursor: "pointer" }} >
                        <img
                            style={{ height: "20px", marginLeft: "12px" }}
                            src='https://icon-library.com/images/signout-icon/signout-icon-6.jpg' />
                        Çıkış
                    </div>
                </div>
            </nav>
        );
    }
    return (
        links
    )
}
export default TopMenu;