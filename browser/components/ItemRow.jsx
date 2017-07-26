import React from "react";
import { Link } from "react-router-dom";
import ItemPrice from "./ItemPrice.jsx";

const ItemRow = ({ item }) => (
  <tr className={item.show ? "show" : ""}>
    <td className="iconCell">
      <Link to={`/${item.info.name}?exact=${item.info.exact}`}>
        <img
          alt={item.alt}
          className="iconImg"
          src={item.src} />
        {item.amount > 1 && <span className="amount">{item.amount}</span>}
      </Link>
    </td>

    <td className={`text ${item.grade}`}>
      <span className="name noneAttribute">
        {item.alt}
      </span>
    </td>

    <ItemPrice price={item.price} info={item.info} />
  </tr>
);

export default ItemRow;
