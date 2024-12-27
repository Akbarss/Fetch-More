import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addItem, deleteItem, fetchItems, updateItem } from "./crudThunks";

interface CrudSlice {
  items: ICrudItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CrudSlice = {
  items: [],
  status: "idle",
  error: null,
};

const crudSlice = createSlice({
  name: "crud",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // Fetch
      .addCase(fetchItems.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action: PayloadAction<ICrudItem[]>) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch items";
      })
      // Add
      .addCase(addItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addItem.fulfilled, (state, action: PayloadAction<ICrudItem>) => {
        state.status = "succeeded";
        state.items.push(action.payload);
      })
      .addCase(addItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch items";
      })
      // Update
      .addCase(updateItem.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateItem.fulfilled, (state, action: PayloadAction<ICrudItem>) => {
        state.status = "succeeded";
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index >= 0) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to update item";
      })
      // Delete
      .addCase(deleteItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteItem.fulfilled, (state, action: PayloadAction<number>) => {
        state.status = "succeeded";
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to delete item";
      });
  },
});

export default crudSlice.reducer;
