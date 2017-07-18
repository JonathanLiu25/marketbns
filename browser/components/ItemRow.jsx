import React from "react";

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
        {item.alt}
      </span>
    </td>

    <td className="price">
      {item.price.unit && <div className="unit">
        {item.price.unit.gold &&
          <span className="gold">
            {item.price.unit.gold}
            <span>금</span>
          </span>}
        {item.price.unit.silver &&
          <span className="silver">
            {item.price.unit.silver}
            <span>은</span>
          </span>
        }
        {item.price.unit.bronze &&
          <span className="bronze">
            {item.price.unit.bronze}
            <span>동</span>
          </span>
        }
      </div>}
      <div className="total">
        {item.price.total.gold &&
          <span className="gold">
            {item.price.total.gold}
            <span>금</span>
          </span>}
        {item.price.total.silver &&
          <span className="silver">
            {item.price.total.silver}
            <span>은</span>
          </span>
        }
        {item.price.total.bronze &&
          <span className="bronze">
            {item.price.total.bronze}
            <span>동</span>
          </span>
        }
      </div>
    </td>
  </tr>
);

export default ItemRow;
