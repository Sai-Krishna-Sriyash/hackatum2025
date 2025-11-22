import { SignOutButton } from "@clerk/nextjs";
import { Check, ChevronRight, CreditCard, Globe, MapPin, User } from "lucide-react";
import { useState } from "react";

const ProfilePage = ({ user }) => {
  const [subPage, setSubPage] = useState('main');

  if (subPage === 'edit') return (
    <div className="space-y-4">
      <button onClick={() => setSubPage('main')} className="text-[#2D7A83] text-sm font-bold flex items-center gap-1"><ChevronRight className="rotate-180" size={16}/> Back</button>
      <h2 className="text-xl font-bold text-[#163C5D]">Edit Profile</h2>
      <input className="w-full p-3 bg-white border rounded-xl" defaultValue={user.name} />
      <button className="w-full bg-[#67B99A] text-white p-3 rounded-xl font-bold">Save Changes</button>
    </div>
  );

  if (subPage === 'payment') return (
    <div className="space-y-4">
       <button onClick={() => setSubPage('main')} className="text-[#2D7A83] text-sm font-bold flex items-center gap-1"><ChevronRight className="rotate-180" size={16}/> Back</button>
       <h2 className="text-xl font-bold text-[#163C5D]">Payment Methods</h2>
       <div className="bg-white p-4 rounded-xl border flex items-center gap-3"><div className="bg-[#163C5D] text-white p-2 rounded"><CreditCard size={20} /></div><div className="flex-1"><p className="font-bold text-[#163C5D]">Visa 4242</p></div><Check className="text-[#67B99A]" /></div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E6F4F1] flex items-center gap-6">
        <div className="w-24 h-24 rounded-full p-1 border-2 border-[#67B99A]"><img src={user.avatar} className="w-full h-full rounded-full object-cover" alt="Profile" /></div>
        <div><h2 className="text-2xl font-bold text-[#163C5D]">{user.name}</h2><p className="text-[#2D7A83] flex items-center gap-1"><Globe size={14} /> {user.nationality}</p></div>
      </div>
      <div className="space-y-4">
        <button onClick={() => setSubPage('edit')} className="w-full bg-white p-4 rounded-xl flex justify-between items-center text-[#163C5D] hover:bg-[#E6F4F1] transition shadow-sm">Edit Profile <ChevronRight size={16}/></button>
        <button onClick={() => setSubPage('payment')} className="w-full bg-white p-4 rounded-xl flex justify-between items-center text-[#163C5D] hover:bg-[#E6F4F1] transition shadow-sm">Payment Methods <ChevronRight size={16}/></button>
        <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-center">
					<SignOutButton redirectUrl="/sign-in">
						<button onClick={()=> console.log("CLICKED")} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Sign Out</button>
					</SignOutButton>
				</div>
      </div>
    </div>
  );
};

export default ProfilePage;