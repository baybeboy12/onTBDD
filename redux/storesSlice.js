import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getStores = createAsyncThunk("stores/getStores", async () => {
  const response = await fetch(
    `https://65434a7d01b5e279de20240f.mockapi.io/shopcafe/`
  );
  return await response.json();
});
export const update = createAsyncThunk("stores/addDrink", async (item) => {
  const response = await fetch(
    `https://65434a7d01b5e279de20240f.mockapi.io/shopcafe/${item.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }
  );
  return await response.json();
});

const storesSlice = createSlice({
  name: "stores",
  initialState: {
    stores: [],
    shop: {
      orders: [],
    },
  },
  reducers: {
    shopInit: (state, action) => {
      state.shop = action.payload;
    },
    addDrink: (state, action) => {
      const index = state.shop.orders.findIndex(
        (item) => item.name === action.payload.name
      );
      if (index > -1) {
        state.shop.orders[index] = {
          ...state.shop.orders[index],
          sl: state.shop.orders[index].sl + 1,
        };
      } else {
        state.shop.orders.push(action.payload);
      }
    },
    removeDrink: (state, action) => {
      const index = state.shop.orders.findIndex(
        (item) => item.name === action.payload.name
      );
      if (state.shop.orders[index].sl > 1) {
        state.shop.orders[index] = {
          ...state.shop.orders[index],
          sl: state.shop.orders[index].sl - 1,
        };
      } else {
        const index = state.shop.orders.filter(
          (item) => item.id !== action.payload.id
        );
        state.shop = { ...state.shop, orders: index };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStores.fulfilled, (state, action) => {
        state.stores = action.payload;
      })
      .addCase(update.fulfilled, (state, action) => {
        state.stores = action.payload;
      });
  },
});
export const { shopInit, addDrink, removeDrink } = storesSlice.actions;
export default storesSlice.reducer;
