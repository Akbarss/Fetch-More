import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

export const addItem = createAsyncThunk("crud/addItem", async (item: Omit<ICrudItem, "id">) => {
  const response = await axios.post<ICrudItem>(API_URL, item);
  return response.data;
});

export const fetchItems = createAsyncThunk("crud/fetchItems", async () => {
  const response = await axios.get<ICrudItem[]>(API_URL);
  return response.data;
});

export const updateItem = createAsyncThunk(
  "crud/updateItem",
  async ({ id, item }: { id: number; item: Partial<ICrudItem> }) => {
    const response = await axios.put<ICrudItem>(`${API_URL}/${id}`, item);
    return response.data;
  }
);

export const deleteItem = createAsyncThunk("crud/deleteItem", async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});
