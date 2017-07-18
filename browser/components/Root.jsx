import React from "react";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import Footer from "./Footer";

const Root = ({ children }) => (
  <div id="app">
    <Navbar />
    <SearchBar />
    {children}
    <Footer />
  </div>
);

export default Root;
