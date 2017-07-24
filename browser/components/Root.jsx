import React from "react";
import Navbar from "./Navbar.jsx";
import SearchBar from "./SearchBar.jsx";
import Footer from "./Footer.jsx";

const Root = props => (
  <div id="app">
    <Navbar />
    <SearchBar {...props} />
    {props.children}
    <Footer />
  </div>
);

export default Root;
