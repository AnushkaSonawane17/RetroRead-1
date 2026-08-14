import React, { useEffect, useState } from 'react';
import {
  CheckCircle,
  Package,
  User,
  MapPin,
  Clock,
  CreditCard,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OrdersPage = () => {

  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    const savedOrders = JSON.parse(
      localStorage.getItem('orders') || '[]'
    );

    setOrders(savedOrders);

  }, []);


  return (

    <div className="min-h-screen bg-[#F6EFE3] py-10 px-4">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}

        <div className="bg-[#FFFBF3] rounded-2xl border border-[#E2D5BC] p-6 mb-6">

          <button
            onClick={() => navigate('/marketplace')}
            className="flex items-center gap-2 text-sm text-[#8A7F6B] hover:text-[#1E2A42] mb-5"
          >
            <ArrowLeft size={16} />
            Back to Marketplace
          </button>


          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-full bg-[#3E7C74]/10 border border-[#3E7C74]/30 flex items-center justify-center">

              <Package
                size={22}
                className="text-[#3E7C74]"
              />

            </div>

            <div>

              <h1 className="text-3xl font-bold text-[#1E2A42]">
                My Orders
              </h1>

              <p className="text-sm text-[#8A7F6B] mt-1">
                Books you've claimed from the marketplace
              </p>

            </div>

          </div>

        </div>


        {/* SUCCESS MESSAGE */}

        {orders.length > 0 && (

          <div className="bg-[#EAF5ED] border border-[#B9D8C0] rounded-2xl p-5 mb-6 flex items-start gap-4">

            <CheckCircle
              size={24}
              className="text-[#3E7C74] flex-shrink-0 mt-0.5"
            />

            <div>

              <h2 className="font-semibold text-[#245A4E]">
                Order placed successfully!
              </h2>

              <p className="text-sm text-[#527268] mt-1">
                Your order has been recorded. You can pay the seller
                after the book is delivered to you.
              </p>

            </div>

          </div>

        )}


        {/* NO ORDERS */}

        {orders.length === 0 ? (

          <div className="bg-[#FFFBF3] border border-[#E2D5BC] rounded-2xl p-12 text-center">

            <Package
              size={45}
              className="mx-auto text-[#C9A567] mb-4"
            />

            <h2 className="text-xl font-semibold text-[#1E2A42]">
              No orders yet
            </h2>

            <p className="text-sm text-[#8A7F6B] mt-2">
              Claim a book from the marketplace and it will appear here.
            </p>

            <button
              onClick={() => navigate('/marketplace')}
              className="mt-5 px-6 py-2.5 rounded-full bg-[#C9A567] text-[#1E2A42] text-sm font-semibold hover:bg-[#B8934F] transition"
            >
              Browse Marketplace
            </button>

          </div>

        ) : (

          <div className="space-y-5">

            {orders.map((order) => (

              <div
                key={order.id}
                className="bg-[#FFFBF3] border border-[#E2D5BC] rounded-2xl overflow-hidden shadow-[0_8px_20px_-14px_rgba(30,42,66,0.3)]"
              >

                {/* ORDER HEADER */}

                <div className="px-5 py-4 border-b border-[#E2D5BC] flex flex-col sm:flex-row justify-between gap-3">

                  <div>

                    <p className="text-[10px] uppercase tracking-wider text-[#8A7F6B]">
                      Order ID
                    </p>

                    <p className="text-sm font-semibold text-[#1E2A42]">
                      {order.id}
                    </p>

                  </div>


                  <div className="flex items-center gap-2">

                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF5ED] text-[#3E7C74] text-xs font-medium">

                      <CheckCircle size={12} />

                      {order.status}

                    </span>

                  </div>

                </div>


                {/* ORDER BODY */}

                <div className="p-5">

                  <div className="flex flex-col sm:flex-row gap-5">

                    {/* BOOK IMAGE */}

                    <img
                      src={order.image}
                      alt={order.title}
                      className="w-24 h-32 object-cover rounded-lg shadow-md bg-[#EDE2CE]"
                    />


                    {/* BOOK INFO */}

                    <div className="flex-1">

                      <h2 className="text-lg font-semibold text-[#1E2A42]">
                        {order.title}
                      </h2>

                      <p className="text-sm text-[#5B6478]">
                        {order.author}
                      </p>


                      <div className="flex flex-wrap gap-3 mt-3 text-xs text-[#8A7F6B]">

                        <span className="flex items-center gap-1">
                          <User size={12} />
                          {order.seller}
                        </span>

                        <span className="flex items-center gap-1">
                          <MapPin size={12} />
                          {order.city}
                        </span>

                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          Order placed
                        </span>

                      </div>


                      {/* PRICE */}

                      <div className="mt-4">

                        <span className="text-xs text-[#8A7F6B]">
                          Amount
                        </span>

                        <p className="text-xl font-bold text-[#6B4C82]">
                          ₹{order.price}
                        </p>

                      </div>

                    </div>

                  </div>


                  {/* PAYMENT MESSAGE */}

                  <div className="mt-5 p-4 rounded-xl bg-[#F6EFE3] border border-[#E2D5BC]">

                    <div className="flex items-start gap-3">

                      <CreditCard
                        size={18}
                        className="text-[#C9A567] mt-0.5"
                      />

                      <div>

                        <p className="text-sm font-semibold text-[#1E2A42]">
                          Payment: After Delivery
                        </p>

                        <p className="text-xs text-[#8A7F6B] mt-1">
                          No payment is required right now.
                          Please pay ₹{order.price} directly to the seller
                          after you receive the book.
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );

};

export default OrdersPage;