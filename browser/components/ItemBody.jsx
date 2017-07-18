import React from "react";
import ItemRow from "./ItemRow";

const ItemBody = ({ items }) => {
  const tableBody = items.child[0];
  return (
    <tbody>
      {tableBody.child.length && tableBody.child.map((item, itemIdx) => <ItemRow item={item} key={`item-row-${itemIdx}`} />)}
    </tbody>
  );
};

export default ItemBody;
