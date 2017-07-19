import React from "react";
import ItemRow from "./ItemRow";

const ItemBody = ({ items }) => (
  <tbody>
    {items.length && items.map((item, itemIdx) => <ItemRow item={item} key={`item-row-${itemIdx}`} />)}
  </tbody>
);

export default ItemBody;
