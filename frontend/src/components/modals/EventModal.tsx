import React from 'react';
import { X, Calendar, MapPin, User, Share2, Heart, Star } from 'lucide-react';

const EventModal = ({ event, onClose }) => {
  if (!event) return null;

  return (
    // 1. The Backdrop (Grayed out & Opaque)
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#163C5D]/80 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* 2. The Modal Container (Enlarged) */}
      <div 
        className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] shadow-2xl relative overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        
        {/* Header Image */}
        <div className="relative h-64 md:h-80 shrink-0">
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#163C5D]/80 via-transparent to-transparent" />
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 backdrop-blur-md p-2 rounded-full text-white transition-all"
          >
            <X size={24} />
          </button>

          <div className="absolute bottom-6 left-6 text-white max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-[#D4AF37] text-[#163C5D] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                <span className="text-lg">{event.flag}</span> {event.culture}
              </span>
              {event.isSpecial && (
                <span className="bg-[#163C5D] border border-[#D4AF37] text-[#D4AF37] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Star size={12} fill="currentColor" /> Featured Event
                </span>
              )}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight shadow-sm font-serif tracking-wide">{event.title}</h2>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-8 overflow-y-auto custom-scrollbar">
          <div className="flex flex-col md:flex-row gap-8">
            
            {/* Left Column: Main Info */}
            <div className="flex-1 space-y-8">
              
              {/* Host Info & Price */}
              <div className="flex items-center justify-between pb-6 border-b border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#E6F4F1] flex items-center justify-center text-[#2D7A83] border-2 border-white shadow-sm">
                    <User size={28} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">Hosted by</p>
                    <p className="font-bold text-[#163C5D] text-lg">{event.host}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">Ticket Price</p>
                  <p className="text-3xl font-bold text-[#2D7A83]">
                    {event.price === 0 ? 'Free' : `€${event.price}`}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h3 className="font-bold text-[#163C5D] text-xl">About this Event</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {event.description || "Join us for an immersive cultural experience! This event is designed to bring people together to celebrate traditions, food, and art. Don't miss out on this unique opportunity to connect with the community."}
                </p>
              </div>
            </div>

            {/* Right Column: Details Box */}
            <div className="w-full md:w-72 shrink-0 space-y-4">
              <div className="bg-[#F5F9F8] p-6 rounded-2xl space-y-6 border border-[#E6F4F1]">
                
                <div className="flex gap-4">
                  <div className="bg-white p-3 rounded-xl shadow-sm h-fit text-[#67B99A]">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold mb-1">Date & Time</p>
                    <p className="font-bold text-[#163C5D]">{new Date(event.date).toLocaleDateString("de-DE")}</p>
                    <p className="text-sm text-gray-500">18:00 - 21:00</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-white p-3 rounded-xl shadow-sm h-fit text-[#67B99A]">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold mb-1">Location</p>
                    <p className="font-bold text-[#163C5D]">{event.location}</p>
                    <p className="text-xs text-gray-400 mt-1 underline cursor-pointer">View on Map</p>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <button className="w-full bg-[#163C5D] text-white font-bold py-4 rounded-xl hover:bg-[#2D7A83] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                Book Ticket
              </button>
              
              
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;