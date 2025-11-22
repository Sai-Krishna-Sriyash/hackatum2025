import EventCard from '@/components/features/EventCard';
import { MOCK_EVENTS } from '@/lib/data';
import { Filter, Search, SlidersHorizontal, X } from 'lucide-react';
import React, { useState, useMemo } from 'react';



const EventsPage = ({ setSelectedEvent, user, filters, setFilters }) => {
  const [search, setSearch] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredEvents = useMemo(() => {
    return MOCK_EVENTS.filter(e => {
      if (search && !e.title.toLowerCase().includes(search.toLowerCase()) && !e.culture.toLowerCase().includes(search.toLowerCase())) return false;
      if (e.price > filters.maxPrice) return false;
      if (filters.culture && e.culture !== filters.culture) return false;
      return true;
    });
  }, [filters, user, search]);

  return (
    <div className="min-h-screen pb-20">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="hidden md:block w-64 bg-white p-4 rounded-2xl shadow-sm border border-[#E6F4F1] sticky top-24 shrink-0">
           <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2"><Filter size={18} className="text-[#67B99A]" /><h3 className="font-bold text-[#163C5D]">Filters</h3></div>
           <div className="space-y-4">
             <div><div className="flex justify-between mb-1"><label className="text-xs font-bold text-[#163C5D]">Max Price</label><span className="text-xs text-[#67B99A]">€{filters.maxPrice}</span></div><input type="range" max="50" value={filters.maxPrice} onChange={e => setFilters({...filters, maxPrice: parseInt(e.target.value)})} className="w-full accent-[#67B99A] h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer" /></div>
             <div><label className="text-xs font-bold text-[#163C5D] mb-1 block">Date</label><input type="date" className="w-full p-2 border rounded-lg text-sm" /></div>
             <div className="pt-2 border-t"><button onClick={() => setFilters({ maxPrice: 50, culture: '' })} className="text-xs text-gray-400 underline">Reset Filters</button></div>
          </div>
        </div>

        <div className="flex-1 w-full space-y-6">
          <div className="bg-white p-2 rounded-2xl shadow-sm border border-[#E6F4F1] flex items-center gap-2 sticky top-20 z-20">
            <Search className="text-gray-400 ml-2" size={20} />
            <input type="text" placeholder="Search by culture, host, or vibe..." className="flex-1 p-3 outline-none text-[#163C5D]" value={search} onChange={(e) => setSearch(e.target.value)} />
            <button className="bg-[#163C5D] text-white p-3 rounded-xl md:hidden" onClick={() => setIsFilterOpen(true)}><SlidersHorizontal size={18} /></button>
          </div>
          
          {filters.culture && (
            <div className="flex items-center gap-2 bg-[#E6F4F1] px-4 py-2 rounded-lg w-fit">
              <span className="text-sm text-[#2D7A83] font-bold">Filtering by: {filters.culture}</span>
              <button onClick={() => setFilters({ ...filters, culture: '' })}><X size={14} className="text-[#2D7A83]"/></button>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredEvents.map(event => (
              <EventCard key={event.id} event={event} onClick={setSelectedEvent} isSpecial={event.isSpecial} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;