import React, { useState } from 'react';
import './simple-sidebar.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as ICON from '../../assets/icons';
import { linkList } from '../../constant/sidebarConstant';
import { selectedAuthentication } from '../../redux/redux-toolkit/authentication/AuthenticationSlice';
import SecureLS from 'secure-ls';

const SideBarMenu = () => {

  const secureLS = new SecureLS();
  const selectedAuth = useSelector(selectedAuthentication);
  const [triggerUseEffect, setTriggerUseEffect] = useState(0);



  let links = null;
  if (selectedAuth.isLoggedIn) {
    links = (
      <ul className="list-unstyled components" >
        {linkList.map((link) =>
          <li key={link.to} className={triggerUseEffect === link.to && "active"}>
            <Link
              to={link.to}
              onClick={() => setTriggerUseEffect(link.to)}
            >
              <FontAwesomeIcon className="fa-sm" icon={link.icon} />
              &nbsp;&nbsp; {link.name}
            </Link>
          </li>
        )}
      </ul>
    );
  };

  return (
    <div className="text-white " id="sidebar-wrapper">
      <div className="sidebar-heading ml-auto">
        {selectedAuth.username}
      </div>
      <div className="list-group ">
        <nav id="sidebar" >
          {links}
        </nav>
      </div>
    </div>
  )
}
export default SideBarMenu;