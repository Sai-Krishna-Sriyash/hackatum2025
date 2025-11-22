import React, { useState } from 'react';



const BuddyModal = ({ user, onClose }) => {
  const [inviteSent, setInviteSent] = useState(false);
  const handleInvite = () => { setInviteSent(true); setTimeout(() => setInviteSent(false), 2000); };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#163C5D]/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-[#163C5D] flex items-center gap-2"><Users size={18} /> My Buddies</h3>
          <button onClick={onClose}><X size={18} className="text-gray-400" /></button>
        </div>
        <div className="p-2 max-h-[50vh] overflow-y-auto">
          {user.buddies.map(buddy => (
            <div key={buddy.id} className="flex items-center gap-3 p-3 hover:bg-[#E6F4F1] rounded-xl transition cursor-pointer group">
              <img src={buddy.avatar} className="w-10 h-10 rounded-full object-cover" alt={buddy.name} />
              <div className="flex-1">
                <h4 className="font-bold text-[#163C5D] text-sm">{buddy.name}</h4>
                <p className="text-xs text-[#2D7A83]">{buddy.nationality}</p>
              </div>
              <button 
                onClick={() => alert(`Contact ${buddy.name}:\nMobile: ${buddy.phone}`)}
                className="text-[#67B99A] opacity-0 group-hover:opacity-100 font-bold text-xs bg-white border border-[#67B99A] px-2 py-1 rounded shadow hover:bg-[#67B99A] hover:text-white transition"
              >
                Contact
              </button>
            </div>
          ))}
          <div className="p-3 pt-4">
            <button onClick={handleInvite} className={`w-full p-3 text-center text-xs font-bold rounded-lg transition ${inviteSent ? 'bg-[#67B99A] text-white' : 'bg-[#E6F4F1] text-[#2D7A83] hover:bg-[#d0eae4]'}`}>
              {inviteSent ? "Invitation Sent! ✉️" : "+ Invite new friends via Link"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};