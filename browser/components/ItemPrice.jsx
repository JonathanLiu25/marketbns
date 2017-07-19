import React from "react";

const ItemRow = ({ price, info }) => {
  const buyAmount = info.buy;
  const cheapAmount = info.cheap;
  const sellAmount = info.sellAmount;

  const unitPrice = price.unit
    ?
    +(price.unit.gold || 0) * 10000 + +(price.unit.silver || 0) * 100 + +(price.unit.bronze || 0)
    :
    +(price.total.gold || 0) * 10000 + +(price.total.silver || 0) * 100 + +(price.total.bronze || 0);

  let color = "";

  if (unitPrice <= buyAmount) {
    color = "green";
  } else if (unitPrice <= cheapAmount) {
    color = "orange";
  } else if (unitPrice > sellAmount) {
    color = "red";
  }

  return (
    <td className={`price price-${color}`}>
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
};

export default ItemRow;
