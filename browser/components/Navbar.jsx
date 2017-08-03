import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Navbar = ({ loading }) => (
  <nav className="nav">
    <Link to="/">Home</Link>
    {loading &&
      <div className="spinner">
        <div className="double-bounce1" />
        <div className="double-bounce2" />
      </div>
    }
  </nav>
);

const mapStateToProps = state => ({ loading: state.loading });

const mapDispatchToProps = {};

const NavbarContainer = connect(mapStateToProps, mapDispatchToProps)(Navbar);

export default NavbarContainer;
