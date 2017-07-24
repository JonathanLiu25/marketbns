import React from "react";
import ItemRow from "./ItemRow.jsx";

const ItemBody = props => (
  <tbody>
    {props.items.length && props.items.map((item, itemIdx) => {
      if (props.showAll) item.show = true;
      if (itemIdx === 0) item.show = true;
      return (<ItemRow
        item={item}
        key={`item-row-${itemIdx}`} />);
    })}
  </tbody>
);

export default ItemBody;
