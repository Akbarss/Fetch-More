import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../core/redux/store";

interface ListItemsProps {
  onEdit: (item: ICrudItem) => void;
}

const ListItems: React.FC<ListItemsProps> = ({ onEdit }) => {
  const items = useSelector((state: RootState) => state.crud.items);

  return (
    <div>
      <h2>List of Items</h2>
      {items.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <span>{item.title}</span>
              <button onClick={() => onEdit(item)}>Edit</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListItems;
