import { useState } from "react";
import "../../styles/Usables/dropdown.css";

export default function DropDown({ items, onChangeSelection, selectedId }) {
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(!open);
  }

  function handleClickItem(index) {
    onChangeSelection(index);
    setOpen(false);
  }

  return (
    <div className="dropdown">
      <button onClick={handleOpen}>
        {items.length != 0
          ? items.filter((item) => item.id === selectedId)[0].name
          : "Smartmeter"}
      </button>
      {open && items.length != 0 ? (
        <ul className="menu">
          {items.map((item, index) => {
            return (
              <li className="menu-item" key={index}>
                <button onClick={() => handleClickItem(item.id)}>
                  {item.name}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
