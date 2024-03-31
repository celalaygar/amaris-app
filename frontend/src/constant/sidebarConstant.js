import * as ROLE from "./roleConstant";

export const linkList = [
    {
        to: "/index",
        icon: "home",
        name: "Anasayfa",
        submenu: [],
        role: [ROLE.ROLE_ADMIN, ROLE.ROLE_MANAGER]
    },
    {
        to: "/users",
        icon: "users",
        name: "Üyeler",
        submenu: [],
        role: [ROLE.ROLE_ADMIN, ROLE.ROLE_MANAGER]

    },
    {
        to: "/save-user",
        icon: "user-plus",
        name: "Üye Kaydet",
        submenu: [],
        role: [ROLE.ROLE_ADMIN, ROLE.ROLE_MANAGER]

    },
    {
        to: "/notes",
        icon: "bars",
        name: "Notlar",
        submenu: [],
        role: [ROLE.ROLE_ADMIN, ROLE.ROLE_MANAGER]

    },
    {
        to: "/contact-page",
        icon: "phone",
        name: "İletişim",
        submenu: [],
        role: [ROLE.ROLE_ADMIN, ROLE.ROLE_MANAGER]
    },
    {
        to: "/info-page",
        icon: "circle-info",
        name: "Bilgi",
        submenu: [],
        role: [ROLE.ROLE_ADMIN, ROLE.ROLE_MANAGER]
    },
];