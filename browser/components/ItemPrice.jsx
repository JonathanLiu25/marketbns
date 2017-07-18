import React from "react";

const ItemRow = ({ price }) => (
  <td className="price">
    {
      Object.keys(price).map((bulk) => (
        <div className={bulk} key={`${bulk}`}>
          {
            price[bulk].gold &&
            <span className="gold">
              {price[bulk].gold}
              <span>금</span>
            </span>
          }
          {
            price[bulk].silver &&
            <span className="silver">
              {price[bulk].silver}
              <span>은</span>
            </span>
          }
          {
            price[bulk].bronze &&
            <span className="bronze">
              {price[bulk].bronze}
              <span>동</span>
            </span>
          }
        </div>
      ))
    }
  </td>
);

export default ItemRow;
