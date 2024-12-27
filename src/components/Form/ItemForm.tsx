import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, updateItem } from "../../core/redux/features/crud/crudThunks";
import { AppDispatch, RootState } from "../../core/redux/store";

interface ItemFromProps {
  selectedItem: ICrudItem | null;
  onClear: () => void;
}

const ItemForm: React.FC<ItemFromProps> = ({ selectedItem, onClear }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { status, error } = useSelector((state: RootState) => state.crud);
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (selectedItem) {
      setTitle(selectedItem.title);
    } else {
      setTitle("");
    }
  }, [selectedItem]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItem) {
      dispatch(updateItem({ id: selectedItem.id, item: { title } }));
    } else {
      dispatch(addItem({ title }));
    }
    onClear();
  };

  const isLoading = status === "loading";

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={isLoading}
        placeholder="Enter item title"
      />
      <button type="submit" disabled={isLoading}>
        {selectedItem ? (isLoading ? "Updating..." : "Update") : isLoading ? "Adding" : "Add"}
      </button>
      {selectedItem && (
        <button type="button" onClick={onClear}>
          Clear
        </button>
      )}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {isLoading && <p>Loading...</p>}
    </form>
  );
};

export default ItemForm;
