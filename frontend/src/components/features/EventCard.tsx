'use client';
import React, { useState, useMemo } from 'react';
import { Search, MapPin, Calendar, User, CreditCard, Globe, Award, Menu, X, Filter, ChevronRight, PlusCircle, Star, SlidersHorizontal, Users, Settings, Check, Wallet, Camera, Phone, Share2, ArrowRight, Upload } from 'lucide-react';


const EventCard = ({ event, onClick, isSpecial }) => (
  <div 
    onClick={() => onClick(event)}
    className={`bg-white rounded-xl shadow-sm hover:shadow-xl transition-all overflow-hidden cursor-pointer group flex flex-col h-full ${isSpecial ? 'border-2 border-[#D4AF37] ring-4 ring-[#D4AF37]/10' : 'border border-[#E6F4F1]'}`}
  >
    <div className="h-48 overflow-hidden relative">
      <img 
        src={event.image} 
        alt={event.title} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className={`absolute top-3 right-3 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-2 ${isSpecial ? 'bg-[#D4AF37] text-[#163C5D]' : 'bg-[#163C5D]'}`}>
        <span className="text-base">{event.flag}</span>
        <span>{event.culture}</span>
      </div>
      {isSpecial && (
        <div className="absolute top-3 left-3 bg-[#D4AF37] text-[#163C5D] p-1.5 rounded-full shadow-sm">
          <Star size={16} fill="#163C5D" />
        </div>
      )}
    </div>
    <div className="p-5 flex flex-col flex-grow">
      <div className="flex justify-between items-start mb-3">
        <h3 className={`font-bold text-lg leading-tight line-clamp-2 ${isSpecial ? 'text-[#b08d1e]' : 'text-[#163C5D]'}`}>{event.title}</h3>
        <span className="text-[#2D7A83] font-bold whitespace-nowrap ml-3 bg-[#E6F4F1] px-2 py-1 rounded text-sm h-fit">
          {event.price === 0 ? 'Free' : `€${event.price}`}
        </span>
      </div>
      
      <div className="space-y-2 text-sm text-gray-600 mb-6 flex-grow">
        <div className="flex items-center gap-2">
          <User size={14} className="text-[#67B99A]" />
          <span className="font-medium text-[#163C5D]">Hosted by {event.host}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={14} className="text-[#67B99A]" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={14} className="text-[#67B99A]" />
          <span className="truncate">{event.location}</span>
        </div>
      </div>

      <button className={`w-full font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 mt-auto ${isSpecial ? 'bg-[#D4AF37] text-[#163C5D] hover:bg-[#e5bd3f]' : 'bg-[#E6F4F1] text-[#2D7A83] hover:bg-[#67B99A] hover:text-white'}`}>
        View Details <ChevronRight size={16} />
      </button>
    </div>
  </div>
);

export default EventCard;