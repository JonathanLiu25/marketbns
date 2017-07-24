import React from "react";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import Footer from "./Footer";

const Root = props => (
  <div id="app">
    <Navbar />
    <SearchBar {...props} />
    {props.children}
    <Footer />
  </div>
);

export default Root;
