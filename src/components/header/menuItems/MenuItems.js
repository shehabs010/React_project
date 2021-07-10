import '../Header.css';

import React from 'react';
import { NavLink } from 'react-router-dom';

import router from '../../../routes/router';

const MenuItems = () => (
  <ul className=" navbar-nav ml-auto pr-xl-5 pr-0 d-lg-flex d-block">
    <li className="nav-item d-lg-none d-block">
      <NavLink to="/" className="nav-link" exact activeClassName="active">
        الرئيسية
      </NavLink>
    </li>
    {router.map(
      (r, k) =>
        r.ismenuItem && (
          <li key={k} className="nav-item">
            <NavLink to={r.path} className="nav-link" exact activeClassName="active">
              {r.label}
            </NavLink>
          </li>
        )
    )}
  </ul>
);

export default MenuItems;
