import React, { Component, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserLoginPage from './pages/auth/UserLoginPage';
import { connect, useDispatch, useSelector } from 'react-redux';
import SideBarMenu from './components/sidebar/Sidebar';
import TopMenu from './components/topmenu/TopMenu';
import * as PATH from './constant/linkConstant';
import { RouteBaseList } from './constant/routeLinksConstant';
import ApiService from './services/base/ApiService';
import AlertifyService from './services/AlertifyService';
import Axios from 'axios';
import ProtectedRoute from './ProtectedRoute';
import { logoutAsync, selectedAuthentication, updateStateInStorage } from './redux/redux-toolkit/authentication/AuthenticationSlice';
import MainPage from './pages/auth/MainPage';


const App = () => {
  const selectedAuth = useSelector(selectedAuthentication);
  const [toggled, setToggled] = useState(false);
  const [controlToggle, setControlToggle] = useState("d-flex ");
  const dispatch = useDispatch();


  Axios.interceptors.response.use(response => {
    return response;
  }, async error => {
    console.log(selectedAuth.jwttoken)
    if (selectedAuth.jwttoken !== undefined && error.response.status === 401) {
      // ApiService.defaultLogout(selectedAuth.username);
      // ApiService.logout();

      await dispatch(logoutAsync(null));
      AlertifyService.alert("Lütfen Tekrar Giriş yapınız !!!");
    }

    throw error;
  });


  let routeList = (
    <>
      <Route path={PATH.PATH_LOGIN} element={selectedAuth.isLoggedIn ? <HomePage /> : <MainPage />} />
      {
        RouteBaseList.map((route, index) =>

          <Route key={index} path={route.path} element={
            route.protectedRoute === true ?
              <ProtectedRoute roles={[...route.roles]}>
                {route.element}
              </ProtectedRoute>
              :
              route.element
          } />
        )
      }
    </>
  )
  let view = null;
  if (!selectedAuth.isLoggedIn) {
    view = (
      <>
        <BrowserRouter>
          <Routes>
            {routeList}
          </Routes>
        </BrowserRouter>
      </>
    );
  }
  if (selectedAuth.isLoggedIn) {
    view = (
      <div className={controlToggle ? controlToggle : undefined} id="wrapper">
        <BrowserRouter>
          <SideBarMenu />
          <div id="page-content-wrapper">
            <TopMenu />
            <div className="container-fluid">
              <Routes>
                {routeList}
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );

  }
  return (
    <>
      {view}

    </>
  )

};


export default App;