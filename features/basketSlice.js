import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
};
console.disableYellowBox = true;


export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        addToBasket: (state, action) => {
            state.items = [...state.items, action.payload];
        },
        removeFromBasket: (state, action) => {
            // Remove an item from the basket using filter
            const index = state.items.findIndex((item) => item.id === action.payload.id);
            let newBasket = [...state.items]
            if (index >= 0) {
                newBasket.splice(index, 1);
            } else {
                console.warn(
                    'cant remove'
                )
            }
            state.items = newBasket;
        },
    },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;
export const selectBasketItems = (state) => state.basket.items;

export const selectBasketItemWithId = (state, id) => state.basket.items.filter((item) => item.id === id)

export const selectBasketTotal  = (state) => state.basket.items.reduce(
    (total, item) => total += item.price, 0);
export default basketSlice.reducer;
