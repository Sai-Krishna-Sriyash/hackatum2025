'use client';
import EventCard from "@/components/features/EventCard";
import { MOCK_EVENTS } from "@/lib/data";
import { Search, MapPin, Calendar, User, CreditCard, Globe, Award, Menu, X, Filter, ChevronRight, PlusCircle, Star, SlidersHorizontal, Users, Settings, Check, Wallet, Camera, Phone, Share2, ArrowRight, Upload } from 'lucide-react';
import EventMap from "@/components/features/EventMap";
const HomePage = ({ user, setSelectedEvent }: { user: any, setSelectedEvent: any }) => {
  const cityEvent = MOCK_EVENTS.find(e => e.isSpecial);
  const regularEvents = MOCK_EVENTS.filter(e => !e.isSpecial);

  if (!cityEvent || !user) {
    return null;
  }

  return (
    
    <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 p-32">
      
      {/* 1. Culture Progress Dashboard */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E6F4F1] flex items-center gap-6 p -8">
        <div className="flex-1">
          <div className="flex justify-between items-end mb-2">
            <h2 className="font-bold text-[#163C5D] text-lg">World Cultures Experienced</h2>
            <span className="text-[#67B99A] font-bold text-xl">{user.stamps.length} <span className="text-gray-400 text-sm font-normal">/ 195</span></span>
          </div>
          <div className="w-full bg-[#E6F4F1] h-3 rounded-full overflow-hidden">
            <div className="bg-[#67B99A] h-full rounded-full" style={{ width: `${(user.stamps.length / 20) * 100}%` }}></div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Attend events from 3 more countries to earn the Globetrotter badge!</p>
        </div>
        <div className="hidden md:flex items-center justify-center bg-[#D4AF37]/10 w-16 h-16 rounded-full"><Globe className="text-[#D4AF37]" size={32} /></div>
      </div>

      {/* 2. Exploration Map */}
      <EventMap />

      {/* 3. Monthly City Event */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/10 to-[#E6F4F1] rounded-2xl transform -rotate-1" />
        <div className="relative bg-white border-2 border-[#D4AF37] rounded-2xl p-6 shadow-lg flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#163C5D] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide"><Star size={12} fill="#163C5D" /> Monthly City Event</div>
            <h3 className="text-2xl font-bold text-[#163C5D]">{cityEvent.title}</h3>
            <p className="text-gray-600 text-sm">{cityEvent.description}</p>
            <button onClick={() => setSelectedEvent(cityEvent)} className="bg-[#163C5D] text-white px-6 py-2 rounded-lg font-bold text-sm shadow hover:bg-[#2D7A83] transition w-full md:w-auto">View Official Event</button>
          </div>
          <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden shadow-md flex-shrink-0"><img src={cityEvent.image} alt="City Event" className="w-full h-full object-cover" /></div>
        </div>
      </div>

      {/* 4. Highlights Carousel */}
      <div className="space-y-4">
        <div className="flex justify-between items-end px-2">
          <h3 className="text-xl font-bold text-[#163C5D]">Upcoming Highlights</h3>
          <span onClick={() => document.getElementById('events-tab-trigger')?.click()} className="text-[#67B99A] text-sm font-bold cursor-pointer hover:underline">View all events →</span>
        </div>
        <div className="grid grid-flow-col auto-cols-[85%] md:auto-cols-[32%] lg:auto-cols-[24%] xl:auto-cols-[19%] gap-4 overflow-x-auto pb-6 px-2 scrollbar-hide snap-x snap-mandatory -mx-4 md:mx-0 px-4 md:px-0">
          {regularEvents.map(event => (
            <div key={event.id} className="snap-center h-full"><EventCard event={event} onClick={setSelectedEvent} isSpecial={false} /></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;