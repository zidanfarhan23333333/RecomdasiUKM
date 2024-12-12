import {
  ADD_TO_CART_ERROR,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  UPDATE_CART,
} from "../action/CartAction";

const CartState = {
  carts: [],
  loading: false,
  error: null,
};

export const CartReducer = (state = CartState, action) => {
  switch (action.type) {
    case ADD_TO_CART_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ADD_TO_CART_SUCCESS: {
      const existingCart = state.carts.find(
        (cart) => cart.userId === action.payload.userId
      );

      if (existingCart) {
        const updatedProducts = [...existingCart.products];
        action.payload.products.forEach((newProduct) => {
          const existingProductIndex = updatedProducts.findIndex(
            (product) => product.productId === newProduct.productId
          );
          if (existingProductIndex !== -1) {
            updatedProducts[existingProductIndex].quantity +=
              newProduct.quantity;
          } else {
            updatedProducts.push(newProduct);
          }
        });
        return {
          ...state,
          loading: false,
          carts: state.carts.map((cart) =>
            cart.userId === action.payload.userId
              ? { ...cart, products: updatedProducts }
              : cart
          ),
        };
      } else {
        return {
          ...state,
          loading: false,
          carts: [
            ...state.carts,
            {
              userId: action.payload.userId,
              date: action.payload.date,
              products: action.payload.products,
            },
          ],
        };
      }
    }
    case ADD_TO_CART_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_CART:
      return {
        ...state,
        carts: [action.payload],
      };
    default:
      return state;
  }
};
