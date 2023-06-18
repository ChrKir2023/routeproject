import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './Sidebar.css';
import RouteAdd from "../routeadd/RouteAdd";
import { Routes, Route, Link } from "react-router-dom";

export default props => {
  return (
    <Menu width={ '20%' } >
      <a className="menu-item" href="/">
        Αρχική σελίδα
      </a>
      <Link className="menu-item" to="/RouteAdd">
		Εισαγωγή διαδρομής και σημείων
	  </Link>
    </Menu>
  );
};
