import React from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function PaypalPayment({price, onSuccess, onCancel, onError, onClick }) {
  return (
    <PayPalScriptProvider options={{ clientId: "AXjFhbNzgjB3HtINW2-Bb6t5DBHb4EfWsE4v2Hy3WGxKoIbt-KYHsd-9AwC1RSevKWbUBSc2LLKabxNp", currency: "USD"}}>
      <div className="p-4 w-full bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-4! capitalize">service payment - ${price}</h2>
        <PayPalButtons
          onClick={onClick}
          className='w-full'
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    currency_code: "USD",  
                    value: price,  
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            onSuccess();
          }}
          onCancel={() => {
            onCancel();
          }}
          onError={(err) => {
            onError();
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
};