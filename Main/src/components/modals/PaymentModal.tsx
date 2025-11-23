'use client';
import { CreditCard, X } from "lucide-react";

const PaymentModal = ({ event, onClose }) => (
  <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
    <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6 relative">
      <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-black"><X size={20}/></button>
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-[#E6F4F1] rounded-full flex items-center justify-center mx-auto mb-3 text-[#2D7A83]"><CreditCard size={24} /></div>
        <h3 className="text-xl font-bold text-[#163C5D]">Secure Payment</h3>
        <p className="text-sm text-gray-500">via Stripe (Mock)</p>
      </div>
      <div className="bg-[#F8FAFC] p-4 rounded-xl mb-6 border border-gray-100">
        <div className="flex justify-between text-sm mb-2"><span className="text-gray-600">Event Ticket</span><span className="font-bold text-[#163C5D]">€{event.price}</span></div>
        <div className="flex justify-between text-sm mb-2"><span className="text-gray-600">Service Fee</span><span className="font-bold text-[#163C5D]">€2.00</span></div>
        <div className="border-t border-gray-200 my-2 pt-2 flex justify-between font-bold text-[#163C5D]"><span>Total</span><span>€{event.price + 2}.00</span></div>
      </div>
      <button onClick={() => { alert("Payment Processed!"); onClose(); }} className="w-full bg-[#635BFF] text-white py-3 rounded-xl font-bold hover:bg-[#4b44d4] transition shadow-lg flex items-center justify-center gap-2">
        Pay with Stripe
      </button>
    </div>
  </div>
);

export default PaymentModal;