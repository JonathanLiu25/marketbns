import React from "react";
import ItemPrice from "./ItemPrice";

const ItemRow = ({ item }) => (
  <tr className={item.show ? "show" : ""}>
    <td className="iconCell">
      <img
        alt={item.alt}
        className="iconImg"
        src={item.src} />
      {item.amount > 1 && <span className="num">{item.amount}</span>}
    </td>

    <td className={`text ${item.grade}`}>
      <span className="name noneAttribute">
        {item.info.name}
      </span>
    </td>

    <ItemPrice price={item.price} info={item.info} />
  </tr>
);

export default ItemRow;
