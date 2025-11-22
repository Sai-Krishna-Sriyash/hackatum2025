'use client';

import { createClient } from '@/lib/client_supabase';
import { MOCK_USER, nationalities } from '@/lib/data';

import { ArrowRight, Check, ChevronRight, MapPin, PlusCircle, Upload, Users, X } from 'lucide-react';
import React, { useState } from 'react';

type FormData = {
  title: string;
  host: string;
  culture: string;
  flag: string;
  date: string;
  time: string;
  location: string;
  price: number;
  capacity: number;
  description: string;
  image:   File | null;
  type: 'Food & Drink' | 'Experience' | 'Other';
};

const HostEventModal = ({ onClose }) => {
  const [isPublishing, setIsPublishing] = useState(false);
  const [success, setSuccess] = useState(false);
  const supabase = createClient();
  
  const [formData, setFormData] = useState<FormData>({
    title: '',
    host: MOCK_USER.name,
    culture: '',
    flag: '🌍',
    date: '',
    time: '',
    location: '',
    price: 0,
    capacity: 10,
    description: '',
    image: null,
    type: 'Food & Drink'
  });

  const handlePublish = async () => {
    setIsPublishing(true);

    try {
      if (!formData.image){
        return;
      }

      const filename = `${Date.now()}_${formData.image.name}`;
      const { data, error } = await supabase.storage
              .from("event_pictures") 
              .upload(filename,  formData.image);

      if (error) {
            console.error("Upload error:", error);
            setIsPublishing(false);
          } else {
              console.log("Uploaded:", data);
              const { data: publicUrlData } = supabase.storage
                .from("event_pictures")
                .getPublicUrl(filename);

              const res = await fetch(`https://geocode.maps.co/search?q=${formData.location}&api_key=${process.env.NEXT_PUBLIC_GEO_CODING_KEY}`)
              if (!res.ok) {
                  throw new Error("Failed to fetch geocoding data");
                }

              const geoinfo = await res.json();

              const result = await supabase.from('events').insert([{
                image: 'publicUrlData',
                event_date: formData.date,
                title: formData.title,
                address: formData.location,
                country: formData.culture,
                price: formData.price,
                description: formData.description,
                owner_id: '1223',
                capacity: formData.capacity,
                type: 'NormalEvent',
                lat: parseFloat(geoinfo[0].lat),
                lon: parseFloat(geoinfo[0].lon)

              }])
              setIsPublishing(false);
              setSuccess(true);
            }



        

    } catch (error) {
      console.log("ERROR");
    }


    setIsPublishing(false);
    
  };

  const handleFlagSelect = (e) => {
    const culture = e.target.value;
    let flag = '🌍';
    if (culture === 'Italian') flag = '🇮🇹';
    if (culture === 'Japanese') flag = '🇯🇵';
    if (culture === 'Bavarian') flag = '🇩🇪';
    if (culture === 'Mexican') flag = '🇲🇽';
    setFormData({...formData, culture, flag});
  };

  if (success) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#163C5D]/80 backdrop-blur-sm">
        <div className="bg-white rounded-2xl p-8 text-center animate-in fade-in zoom-in max-w-sm w-full">
          <div className="w-16 h-16 bg-[#67B99A]/20 text-[#67B99A] rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={32} />
          </div>
          <h2 className="text-xl font-bold text-[#163C5D]">Event Published!</h2>
          <p className="text-gray-500 mb-4">Your event is now live and connectable.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 w-full z-100 flex items-center justify-center p-4 bg-[#163C5D]/80 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl animate-in fade-in zoom-in duration-200 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="bg-[#163C5D] p-5 text-white flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-[#D4AF37] p-2 rounded-full text-[#163C5D]">
              <PlusCircle size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold">Host an Event</h2>
              <p className="text-[#67B99A] text-xs">Share your culture with Munich</p>
            </div>
          </div>
          <button onClick={onClose} className="hover:bg-white/10 p-2 rounded-full transition"><X size={20} /></button>
        </div>
        
        <div className="p-6 space-y-4 overflow-y-auto custom-scrollbar">
          <div>
            <label className="block text-xs font-bold text-[#163C5D] mb-1 uppercase tracking-wide">Event Title</label>
            <input 
              type="text" 
              placeholder="e.g. Italian Pasta Night" 
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#67B99A] outline-none text-[#163C5D] font-medium placeholder:font-normal"
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#163C5D] mb-1 uppercase tracking-wide">Culture / Flag</label>
              <div className="relative">
                <select 
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#67B99A] outline-none bg-white appearance-none"
                  onChange={handleFlagSelect}
                >
                  {Object.entries(nationalities).map(([code, name]) => (
                    <option key={code} value={name}>
                     {name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-3 pointer-events-none text-gray-400">
                  <ChevronRight size={16} className="rotate-90" />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#163C5D] mb-1 uppercase tracking-wide">Event Type</label>
              <div className="relative">
                <select className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#67B99A] outline-none bg-white appearance-none">
                  <option>Food & Drink</option>
                  <option>Workshop</option>
                  <option>Dance</option>
                  <option>Family-Friendly</option>
                  <option>Festival</option>
                  <option>Ceremony</option>
                  <option>Sport</option>
                  <option>Holiday</option>
                  <option>Language Exchange</option>
                </select>
                <div className="absolute right-3 top-3 pointer-events-none text-gray-400">
                  <ChevronRight size={16} className="rotate-90" />
                </div>
              </div>
            </div>
          </div>

          <div>
             <label className="block text-xs font-bold text-[#163C5D] mb-1 uppercase tracking-wide">Location (Address)</label>
             <div className="relative">
                <MapPin size={16} className="absolute left-3 top-3.5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="e.g. Schwabing, Munich" 
                  className="w-full pl-10 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#67B99A] outline-none" 
                  value={formData.location}
                  onChange={e => setFormData({...formData, location: e.target.value})}
                />
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#163C5D] mb-1 uppercase tracking-wide">Date</label>
              <input type="date" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#67B99A] outline-none text-gray-600" />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#163C5D] mb-1 uppercase tracking-wide">Time</label>
              <input type="time" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#67B99A] outline-none text-gray-600" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#163C5D] mb-1 uppercase tracking-wide">Price (€)</label>
              <div className="relative">
                 <span className="absolute left-3 top-3 text-gray-400">€</span>
                 <input type="number" placeholder="0" className="w-full pl-8 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#67B99A] outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#163C5D] mb-1 uppercase tracking-wide">Capacity</label>
              <div className="relative">
                 <Users size={16} className="absolute left-3 top-3.5 text-gray-400" />
                 <input type="number" placeholder="10" className="w-full pl-10 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#67B99A] outline-none" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#163C5D] mb-1 uppercase tracking-wide">
              Cover Image
            </label>
            <div
              onClick={() => document.getElementById("fileInput")?.click()}
              className="relative h-44 border-2 border-dashed border-gray-200 rounded-xl p-6 text-gray-400 hover:border-[#67B99A] hover:bg-[#F0F9F6] transition cursor-pointer flex items-center justify-center overflow-hidden w-full"
            >
              {formData.image ? (
                <img
                  src={URL.createObjectURL(formData.image)}
                  alt="Preview"
                  className=" absolute top-0 left-0 w-full h-full object-cover rounded-xl"
                />
              ) : (
                <Upload size={24} className="text-gray-400 group-hover:text-[#67B99A]" />
              )}
            </div>

            <input
              id="fileInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setFormData({ ...formData, image: e.target.files[0] });
                }
              }}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#163C5D] mb-1 uppercase tracking-wide">Description</label>
            <textarea 
              rows={3} 
              placeholder="Tell guests what to expect..." 
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#67B99A] outline-none resize-none"
            ></textarea>
          </div>

          <div className="pt-2">
            <button 
              onClick={handlePublish} 
              disabled={isPublishing}
              className="w-full bg-[#163C5D] text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-[#2D7A83] transition flex justify-center items-center gap-2 disabled:opacity-70"
            >
              {isPublishing ? "Processing..." : <>Publish Event <ArrowRight size={18} /></>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostEventModal;