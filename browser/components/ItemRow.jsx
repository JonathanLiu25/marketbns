import React from "react";

const ItemRow = ({ item }) => (
  <tr className={item.attr ? "show" : ""}>
    <td className={Array.isArray(item.child[0].attr.class) ? item.child[0].attr.class.join(" ") : item.child[0].attr.class}>
      <img
        alt={Array.isArray(item.child[0].child[0].attr.alt) ? item.child[0].child[0].attr.alt.join(" ") : item.child[0].child[0].attr.alt}
        className={item.child[0].child[0].attr.class}
        src={item.child[0].child[0].attr.src} />
      {item.child[0].child[1] && <span className={item.child[0].child[1].attr.class}>{item.child[0].child[1].child[0].text}</span>}
    </td>
    <td className={Array.isArray(item.child[1].attr.class) ? item.child[1].attr.class.join(" ") : item.child[1].attr.class}>
      <span className={Array.isArray(item.child[1].child[0].attr.class) ? item.child[1].child[0].attr.class.join(" ") : item.child[1].child[0].attr.class}>
        {item.child[1].child[0].child[0].text}
      </span>
    </td>
    <td className={Array.isArray(item.child[2].attr.class) ? item.child[2].attr.class.join(" ") : item.child[2].attr.class}>
      <div className={item.child[2].child[0].attr.class}>
        <span className={item.child[2].child[0].child[0].attr.class}>
          {item.child[2].child[0].child[0].child[0].text}
          <span>
            {item.child[2].child[0].child[0].child[1].child[0].text}
          </span>
        </span>
        {item.child[2].child[0].child[1] &&
          <span className={item.child[2].child[0].child[1].attr.class}>
            {item.child[2].child[0].child[1].child[0].text}
            <span>
              {item.child[2].child[0].child[1].child[1].child[0].text}
            </span>
          </span>
        }
        {item.child[2].child[0].child[2] &&
          <span className={item.child[2].child[0].child[2].attr.class}>
            {item.child[2].child[0].child[2].child[0].text}
            <span>
              {item.child[2].child[0].child[2].child[1].child[0].text}
            </span>
          </span>
        }
      </div>
      {item.child[2].child[1] &&
        <div className={item.child[2].child[1].attr.class}>
          <span className={item.child[2].child[1].child[0].attr.class}>
            {item.child[2].child[1].child[0].child[0].text}
            <span>
              {item.child[2].child[1].child[0].child[1].child[0].text}
            </span>
          </span>
          {item.child[2].child[1].child[1] &&
            <span className={item.child[2].child[1].child[1].attr.class}>
              {item.child[2].child[1].child[1].child[0].text}
              <span>
                {item.child[2].child[1].child[1].child[1].child[0].text}
              </span>
            </span>
          }
          {item.child[2].child[1].child[2] &&
            <span className={item.child[2].child[1].child[2].attr.class}>
              {item.child[2].child[1].child[2].child[0].text}
              <span>
                {item.child[2].child[1].child[2].child[1].child[0].text}
              </span>
            </span>
          }
        </div>}
    </td>
  </tr>
);

export default ItemRow;
