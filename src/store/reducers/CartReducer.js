import {
  ADD_TO_CART_ERROR,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  UPDATE_CART,
} from "../action/CartAction";

const CartState = {
  carts: [],
  totalItems: 0,
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

        const updatedCarts = state.carts.map((cart) =>
          cart.userId === action.payload.userId
            ? { ...cart, products: updatedProducts }
            : cart
        );

        // Hitung totalItems
        const totalItems = updatedCarts.reduce(
          (sum, cart) =>
            sum +
            cart.products.reduce(
              (cartSum, product) => cartSum + product.quantity,
              0
            ),
          0
        );

        return {
          ...state,
          loading: false,
          carts: updatedCarts,
          totalItems, // Perbarui totalItems
        };
      } else {
        const newCart = {
          userId: action.payload.userId,
          date: action.payload.date,
          products: action.payload.products,
        };

        const updatedCarts = [...state.carts, newCart];

        // Hitung totalItems
        const totalItems = updatedCarts.reduce(
          (sum, cart) =>
            sum +
            cart.products.reduce(
              (cartSum, product) => cartSum + product.quantity,
              0
            ),
          0
        );

        return {
          ...state,
          loading: false,
          carts: updatedCarts,
          totalItems, // Perbarui totalItems
        };
      }
    }
    case ADD_TO_CART_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_CART: {
      const updatedCarts = [action.payload];

      // Hitung totalItems
      const totalItems = updatedCarts.reduce(
        (sum, cart) =>
          sum +
          cart.products.reduce(
            (cartSum, product) => cartSum + product.quantity,
            0
          ),
        0
      );

      return {
        ...state,
        carts: updatedCarts,
        totalItems, // Perbarui totalItems
      };
    }
    case "CHECKOUT_CART":
      return {
        ...state,
        carts: [],
        totalItems: 0, // Reset totalItems
      };
    default:
      return state;
  }
};
