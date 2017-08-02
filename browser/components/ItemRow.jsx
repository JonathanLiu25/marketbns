import React from "react";
import { Link } from "react-router-dom";
import ItemPrice from "./ItemPrice.jsx";

const ItemRow = ({ item }) => (
  <Link to={`/${item.info.name}?exact=${item.info.exact}`} className={`tr ${item.show ? "show" : ""}`}>
    <div className="td iconCell">
      <img
        alt={item.alt}
        className="iconImg"
        src={item.src} />
      {item.amount > 1 && <span className="amount">{item.amount}</span>}
    </div>

    <div className={`td text ${item.grade}`}>
      <span className="name noneAttribute">
        {item.alt}
      </span>
    </div>

    <ItemPrice price={item.price} info={item.info} />
  </Link>
);

export default ItemRow;
