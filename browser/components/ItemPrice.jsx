import React from "react";
import Audio from "./Audio.js";

const ItemRow = ({ price, info }) => {

  const unitPrice = price.unit
    ?
    +(price.unit.gold || 0) * 10000 + +(price.unit.silver || 0) * 100 + +(price.unit.bronze || 0)
    :
    +(price.total.gold || 0) * 10000 + +(price.total.silver || 0) * 100 + +(price.total.bronze || 0);

  let color = "";

  if (unitPrice <= info.buy) {
    if (unitPrice) { // this prevents 0 and undefined since the market requires at least 1 copper
      color = "green";
      Audio.play();
    }
  } else if (unitPrice <= info.cheap) {
    color = "orange";
  } else if (unitPrice > info.sellAmount) {
    color = "red";
  }

  return (
    <div className={`td price bg-${color}`}>
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
    </div>
  );
};

export default ItemRow;
