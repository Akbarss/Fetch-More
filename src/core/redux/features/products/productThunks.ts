import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk("products/getProducts", async () => {
  const response = await axios.get("https://dummyjson.com/products");
  return response.data.products as IProducts[];
});
