import { Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ContactPage from "../pages/information/ContactPage";
import InfoPage from "../pages/information/InfoPage";
import MyAccountEditPage from "../pages/user/myAccount/MyAccountEditPage";
import NyAccountPage from "../pages/user/myAccount/MyAccountPage";
import MyAccountPasswordEdiPage from "../pages/user/myAccount/MyAccountPasswordEdiPage";
import UserListPage from "../pages/user/UserListPage";
import UserPage from "../pages/user/UserPage";
import UserSignUpPage from "../pages/user/UserSignUpPage";
import * as PATH from "./linkConstant";
import * as ROLE from "./roleConstant";
import NotePage from "../pages/note/NotePage";

export const RouteBaseList = [
    {
        path: "*",
        roles: [ROLE.ROLE_ADMIN, ROLE.ROLE_MANAGER],
        element: <Navigate to="/" />,
        key: "PATH_DEFAULT",
        protectedRoute: false,
    },
    {
        path: PATH.PATH_DEFAULT,
        roles: [ROLE.ROLE_ADMIN, ROLE.ROLE_MANAGER],
        element: <HomePage />,
        key: "HomePage_PATH_DEFAULT",
        protectedRoute: true,
    },
    {
        path: PATH.PATH_INDEX,
        roles: [ROLE.ROLE_ADMIN, ROLE.ROLE_MANAGER],
        element: <HomePage />,
        key: "HomePage_PATH_INDEX",
        protectedRoute: true,
    },
    {
        path: PATH.PATH_CONTACT_PAGE,
        roles: [ROLE.ROLE_ADMIN, ROLE.ROLE_MANAGER],
        element: <ContactPage />,
        key: "ContactPage",
        protectedRoute: true,
    },
    {
        path: PATH.PATH_INFO_PAGE,
        roles: [ROLE.ROLE_ADMIN],
        element: <InfoPage />,
        key: "InfoPage",
        protectedRoute: true,
    },
    {
        path: PATH.PATH_USERS,
        roles: [ROLE.ROLE_ADMIN, ROLE.ROLE_MANAGER],
        element: <UserListPage />,
        key: "UserListPage",
        protectedRoute: true,
    },
    {
        path: PATH.PATH_SAVE_USER,
        roles: [ROLE.ROLE_ADMIN, ROLE.ROLE_MANAGER],
        element: <UserSignUpPage />,
        key: "UserSignUpPage",
        protectedRoute: true,
    },
    {
        path: PATH.PATH_USER_DETAIL,
        roles: [ROLE.ROLE_ADMIN, ROLE.ROLE_MANAGER],
        element: <NyAccountPage />,
        key: "NyAccountPage",
        protectedRoute: true,
    },
    {
        path: PATH.PATH_UPDATE_MY_PASSWORD,
        roles: [ROLE.ROLE_ADMIN, ROLE.ROLE_MANAGER],
        element: <MyAccountPasswordEdiPage />,
        key: "MyAccountPasswordEdiPage",
        protectedRoute: true,
    },
    {
        path: PATH.PATH_UPDATE_MY_ACCOUNT,
        roles: [ROLE.ROLE_ADMIN, ROLE.ROLE_MANAGER],
        element: <MyAccountEditPage />,
        key: "MyAccountEditPage",
        protectedRoute: true,
    },
    {
        path: "/notes",
        roles: [ROLE.ROLE_ADMIN, ROLE.ROLE_MANAGER],
        element: <NotePage />,
        key: "NotePage",
        protectedRoute: true,
    },
]
