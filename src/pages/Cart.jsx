import React from "react";
import Doc1 from "../assets/doc1.jpeg";
import Doc2 from "../assets/doc2.jpeg";

const Cart = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center border-b pb-4">
          <h1 className="text-2xl font-bold">My Cart</h1>
          <button className="text-sm text-gray-500 hover:text-gray-800">
            &larr; Continue shopping
          </button>
        </div>

        <div className="mt-6 space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center space-x-4">
              <img
                src={Doc1}
                alt="Xiaomi 365"
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h2 className="font-semibold">Xiaomi 365</h2>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              {/* Price */}
              <div className="flex flex-col items-center">
                <label className="text-sm text-gray-600">Price</label>
                <p className="text-gray-800">484.99€</p>
              </div>
              {/* Quantity */}
              <div className="flex flex-col items-center border rounded-lg">
                <label className="text-sm text-gray-600">Quantity</label>
                <div className="flex items-center">
                  <button className="px-3 py-1 text-gray-500 hover:text-gray-800">
                    -
                  </button>
                  <input
                    type="number"
                    value="1"
                    min="1"
                    className="w-12 text-center border-none outline-none"
                  />
                  <button className="px-3 py-1 text-gray-500 hover:text-gray-800">
                    +
                  </button>
                </div>
              </div>
              {/* Total */}
              <div className="flex flex-col items-center">
                <label className="text-sm text-gray-600">Total</label>
                <p className="font-semibold">484.99€</p>
              </div>
            </div>
          </div>

          {/* Product Item 2 */}
          <div className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center space-x-4">
              <img
                src={Doc2}
                alt="Ninebot ES2"
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h2 className="font-semibold">Ninebot ES2</h2>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              {/* Price */}
              <div className="flex flex-col items-center">
                <label className="text-sm text-gray-600">Price</label>
                <p className="text-gray-800">489.99€</p>
              </div>
              {/* Quantity */}
              <div className="flex flex-col items-center border rounded-lg">
                <label className="text-sm text-gray-600">Quantity</label>
                <div className="flex items-center">
                  <button className="px-3 py-1 text-gray-500 hover:text-gray-800">
                    -
                  </button>
                  <input
                    type="number"
                    value="3"
                    min="1"
                    className="w-12 text-center border-none outline-none"
                  />
                  <button className="px-3 py-1 text-gray-500 hover:text-gray-800">
                    +
                  </button>
                </div>
              </div>
              {/* Total */}
              <div className="flex flex-col items-center">
                <label className="text-sm text-gray-600">Total</label>
                <p className="font-semibold">1469.97€</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quantity Warning */}
        <div className="mt-4">
          <p className="text-sm text-red-500">
            Quantity tidak terpenuhi untuk produk tertentu
          </p>
        </div>

        {/* Checkout Button */}
        <div className="mt-6 text-right">
          <button className="bg-red-500 text-white px-6 py-3 rounded-lg shadow hover:bg-red-600">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
