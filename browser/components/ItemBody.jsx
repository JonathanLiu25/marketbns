import React from "react";
import ItemRow from "./ItemRow.jsx";

const ItemBody = props => (
  <div className="tbody">
    {props.items.length && props.items.map((item, itemIdx) => {
      if (props.showAll || itemIdx === 0) item.show = true;
      return <ItemRow item={item} key={`item-row-${itemIdx}`} />;
    })}
  </div>
);

export default ItemBody;
