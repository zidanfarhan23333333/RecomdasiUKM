import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Rama from "../assets/rama.png";

const Pembayaran = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("bank");
  const [discountCode, setDiscountCode] = useState();

  return (
    <section className="py-10 px-6 max-w-4xl mx-auto mt-20">
      {/* Tombol Kembali */}
      <button
        className="text-blue-600 flex items-center mb-4"
        onClick={() => navigate("pelatih/:id")}
      >
        &larr; Kembali
      </button>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Kolom Kiri - Detail Pemesanan */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold">Konfirmasi Pemesanan</h2>

          <div className="flex items-center mt-4">
            <img
              src={Rama}
              alt="Pelatih"
              className="w-16 h-16 rounded-lg mr-4 object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold">Herdyan Ramadhan</h3>
              <p className="text-gray-500 text-sm">Pelatih Bulutangkis</p>
              <p className="text-gray-700 font-medium mt-1">
                Rp.50.000/Pertemuan
              </p>
            </div>
          </div>

          <div className="mt-4 border-t pt-4">
            <p className="text-gray-600 text-sm">
              <span className="font-semibold">Jenis Olahraga:</span> Bulutangkis
            </p>
            <p className="text-gray-600 text-sm">
              <span className="font-semibold">Jadwal:</span> Rabu, 14.00
            </p>
          </div>

          {/* Input Voucher / Diskon */}
          <div className="mt-4">
            <input
              type="text"
              placeholder="Gift or discount code"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              className="w-3/4 p-2 border rounded-lg"
            />
            <button className="bg-gray-400 text-white px-4 py-2 rounded-lg ml-2">
              Apply
            </button>
          </div>

          {/* Subtotal & Total */}
          <div className="mt-4 border-t pt-4">
            <p className="text-gray-600">
              Subtotal <span className="float-right">Rp.50.000</span>
            </p>
            <p className="text-lg font-semibold mt-1">
              Total <span className="float-right">Rp.50.000</span>
            </p>
            <p className="text-xs text-gray-500">Including $2.24 in taxes</p>
          </div>
        </div>

        {/* Kolom Kanan - Metode Pembayaran */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold">Payment</h2>

          {/* Pilihan Metode Pembayaran */}
          <div className="mt-4">
            <p className="text-gray-700 font-medium">Pay With:</p>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2"
                />
                Card
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="payment"
                  value="bank"
                  checked={paymentMethod === "bank"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2"
                />
                Bank
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="payment"
                  value="transfer"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2"
                />
                Transfer
              </label>
            </div>

            {/* Pilihan Bank */}
            {paymentMethod === "bank" && (
              <select className="mt-3 w-full p-2 border rounded-lg">
                <option>Choose your bank</option>
                <option>Bank BCA</option>
                <option>Bank Mandiri</option>
                <option>Bank BRI</option>
              </select>
            )}
          </div>
        </div>
      </div>

      {/* Tombol Konfirmasi & Batal */}
      <div className="mt-6 flex gap-4">
        <button className="bg-blue-600 text-white py-3 px-6 rounded-lg w-1/2">
          Konfirmasi Pelatih
        </button>
        <button className="bg-gray-400 text-white py-3 px-6 rounded-lg w-1/2">
          Batalkan Pemesanan
        </button>
      </div>
    </section>
  );
};

export default Pembayaran;
