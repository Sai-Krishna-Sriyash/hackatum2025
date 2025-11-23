'use client';
import React, { useState, useMemo } from 'react';
import EventCard from '@/components/features/EventCard';
import EventModal from '@/components/modals/EventModal'; 
import { MOCK_EVENTS } from '@/lib/data';
import { Filter, Search, SlidersHorizontal, X, Calendar, MapPin, Globe, Tag, RotateCcw } from 'lucide-react';

// Mock data for dropdowns (in a real app, extract from DB)
const CATEGORIES = ["Food & Drink", "Workshop", "Music", "Art", "Sports", "Social"];
const LOCATIONS = ["Schwabing", "Maxvorstadt", "Giesing", "Altstadt", "Au-Haidhausen"];
const CULTURES = ["Japanese", "Italian", "Bavarian", "Mexican", "Indian", "Ethiopian"];

const EventsPage = ({ user }) => {
  // 1. Local State for Modal (Fixes the "doesn't work" issue)
  const [viewingEvent, setViewingEvent] = useState(null);

  // 2. Enhanced Filter State
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    maxPrice: 50,
    culture: '',
    date: '',
    location: '',
    category: ''
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // 3. Advanced Filtering Logic
  const filteredEvents = useMemo(() => {
    return MOCK_EVENTS.filter(e => {
      // Search (Title or Description)
      if (search && !e.title.toLowerCase().includes(search.toLowerCase()) && !e.description?.toLowerCase().includes(search.toLowerCase())) return false;
      
      // Price
      if (e.price > filters.maxPrice) return false;
      
      // Culture
      if (filters.culture && e.culture !== filters.culture) return false;
      
      // Date (Simple string match for demo, normally use Date objects)
      if (filters.date && e.date !== filters.date) return false;

      // Location (Partial match)
      if (filters.location && !e.location.includes(filters.location)) return false;

      // Category/Type (Mock property check)
      if (filters.category && e.type !== filters.category) return false;

      return true;
    });
  }, [filters, search]);

  // Helper to reset filters
  const resetFilters = () => {
    setFilters({ maxPrice: 50, culture: '', date: '', location: '', category: '' });
    setSearch('');
  };

  return (
    <div className="w-full min-h-screen pb-24 bg-[#F5F9F8]">
      
      {/* Header / Search Bar Mobile */}
      <div className="p-6 pb-0 md:hidden">
         <div className="bg-white p-2 rounded-2xl shadow-sm border border-[#E6F4F1] flex items-center gap-2">
            <Search className="text-gray-400 ml-2" size={20} />
            <input type="text" placeholder="Search..." className="flex-1 p-2 outline-none text-[#163C5D]" value={search} onChange={(e) => setSearch(e.target.value)} />
            <button className="bg-[#163C5D] text-white p-3 rounded-xl" onClick={() => setIsFilterOpen(!isFilterOpen)}>
              <SlidersHorizontal size={18} />
            </button>
         </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start p-6">
        
        {/* --- LEFT SIDEBAR FILTERS --- */}
        <aside className={`
          md:block w-full md:w-80 bg-white p-6 rounded-2xl shadow-sm border border-[#E6F4F1] sticky top-24 shrink-0
          ${isFilterOpen ? 'block' : 'hidden'} 
        `}>
           <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
             <div className="flex items-center gap-2">
               <Filter size={24} className="text-[#67B99A]" />
               <h3 className="font-bold text-[#163C5D] text-lg">Filters</h3>
             </div>
             <button onClick={resetFilters} className="text-xs text-gray-400 hover:text-[#2D7A83] flex items-center gap-1 transition">
               <RotateCcw size={12} /> Reset
             </button>
           </div>

           <div className="space-y-6">
             
             {/* Price Slider */}
             <div>
               <div className="flex justify-between mb-2">
                 <label className="text-xs font-bold text-[#163C5D] uppercase tracking-wide">Max Price</label>
                 <span className="text-xs font-bold text-[#67B99A] bg-[#E6F4F1] px-2 py-1 rounded">€{filters.maxPrice}</span>
               </div>
               <input 
                 type="range" 
                 max="100" 
                 value={filters.maxPrice} 
                 onChange={e => setFilters({...filters, maxPrice: parseInt(e.target.value)})} 
                 className="w-full accent-[#163C5D] h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer hover:bg-gray-300 transition" 
               />
               <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                 <span>Free</span>
                 <span>€100+</span>
               </div>
             </div>

             <hr className="border-gray-50" />

             {/* Date Picker */}
             <div>
               <label className="flex items-center gap-2 text-xs font-bold text-[#163C5D] mb-2 uppercase tracking-wide">
                 <Calendar size={14} className="text-[#67B99A]" /> Date
               </label>
               <input 
                  type="date" 
                  value={filters.date}
                  onChange={e => setFilters({...filters, date: e.target.value})}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-[#163C5D] focus:ring-2 focus:ring-[#67B99A] outline-none transition" 
               />
             </div>

             {/* Location Dropdown */}
             <div>
               <label className="flex items-center gap-2 text-xs font-bold text-[#163C5D] mb-2 uppercase tracking-wide">
                 <MapPin size={14} className="text-[#67B99A]" /> District
               </label>
               <select 
                  value={filters.location}
                  onChange={e => setFilters({...filters, location: e.target.value})}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-[#163C5D] focus:ring-2 focus:ring-[#67B99A] outline-none transition appearance-none cursor-pointer"
               >
                 <option value="">Any District</option>
                 {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
               </select>
             </div>

             {/* Category Chips */}
             <div>
               <label className="flex items-center gap-2 text-xs font-bold text-[#163C5D] mb-3 uppercase tracking-wide">
                 <Tag size={14} className="text-[#67B99A]" /> Category
               </label>
               <div className="flex flex-wrap gap-2">
                 {CATEGORIES.map(cat => (
                   <button
                     key={cat}
                     onClick={() => setFilters({...filters, category: filters.category === cat ? '' : cat})}
                     className={`text-xs px-3 py-1.5 rounded-full border transition ${
                       filters.category === cat 
                         ? 'bg-[#163C5D] text-white border-[#163C5D]' 
                         : 'bg-white text-gray-600 border-gray-200 hover:border-[#67B99A]'
                     }`}
                   >
                     {cat}
                   </button>
                 ))}
               </div>
             </div>

             {/* Culture Select */}
             <div>
               <label className="flex items-center gap-2 text-xs font-bold text-[#163C5D] mb-2 uppercase tracking-wide">
                 <Globe size={14} className="text-[#67B99A]" /> Culture
               </label>
               <select 
                  value={filters.culture}
                  onChange={e => setFilters({...filters, culture: e.target.value})}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-[#163C5D] focus:ring-2 focus:ring-[#67B99A] outline-none transition appearance-none cursor-pointer"
               >
                 <option value="">All Cultures</option>
                 {CULTURES.map(c => <option key={c} value={c}>{c}</option>)}
               </select>
             </div>

          </div>
        </aside>

        {/* --- RIGHT SIDE: EVENTS GRID --- */}
        <div className="flex-1 w-full space-y-6">
          
          {/* Desktop Search Bar */}
          <div className="hidden md:flex bg-white p-2 rounded-2xl shadow-sm border border-[#E6F4F1] items-center gap-2 sticky top-20 z-20">
            <Search className="text-gray-400 ml-4" size={20} />
            <input 
              type="text" 
              placeholder="Search by culture, host, or vibe..." 
              className="flex-1 p-3 outline-none text-[#163C5D] placeholder:text-gray-400" 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
            />
          </div>
          
          {/* Active Filters Display */}
          {(filters.culture || filters.date || filters.location || filters.category) && (
            <div className="flex flex-wrap gap-2">
              {filters.culture && (
                <div className="flex items-center gap-2 bg-white border border-[#E6F4F1] px-3 py-1 rounded-full shadow-sm">
                   <span className="text-xs text-[#2D7A83] font-bold">{filters.culture}</span>
                   <button onClick={() => setFilters({ ...filters, culture: '' })}><X size={12} className="text-gray-400 hover:text-red-500"/></button>
                </div>
              )}
              {filters.date && (
                <div className="flex items-center gap-2 bg-white border border-[#E6F4F1] px-3 py-1 rounded-full shadow-sm">
                   <span className="text-xs text-[#2D7A83] font-bold">{filters.date}</span>
                   <button onClick={() => setFilters({ ...filters, date: '' })}><X size={12} className="text-gray-400 hover:text-red-500"/></button>
                </div>
              )}
              {/* Add similar blocks for location/category if desired */}
            </div>
          )}

          {/* Results Grid */}
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6 pb-10">
              {filteredEvents.map(event => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  onClick={setViewingEvent} // Passes event to local state
                  isSpecial={event.isSpecial} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 opacity-60">
              <Search size={48} className="mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-bold text-[#163C5D]">No events found</h3>
              <p className="text-gray-500">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>

      {/* --- MODAL --- */}
      {viewingEvent && (
        <EventModal 
          event={viewingEvent} 
          onClose={() => setViewingEvent(null)} 
        />
      )}

    </div>
  );
};

export default EventsPage;