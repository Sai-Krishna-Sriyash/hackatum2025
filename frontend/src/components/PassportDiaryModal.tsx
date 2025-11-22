// src/components/PassportDiaryModal.tsx
import React, { useState } from 'react';

interface DiaryEntry {
  id: number;
  eventName: string;
  date: string;
  photoUrl?: string;
  aiDescription?: string; // <--- The AI Magic
}

interface PassportDiaryModalProps {
  countryName: string;
  isOpen: boolean;
  onClose: () => void;
}

const PassportDiaryModal = ({ countryName, isOpen, onClose }: PassportDiaryModalProps) => {
  if (!isOpen) return null;

  // MOCK DATA: In a real app, you'd fetch this from your DB based on the Country
  const memories: DiaryEntry[] = [
    {
      id: 1,
      eventName: "Traditional Tea Ceremony",
      date: "Nov 12, 2025",
      photoUrl: "https://images.unsplash.com/photo-1542308826-5f7203b86a8a?q=80&w=600", // Stock matcha photo
      aiDescription: "✨ AI Analysis: A serene bowl of Matcha tea, prepared with traditional bamboo whisking techniques."
    },
    {
      id: 2,
      eventName: "Tokyo Street Food Night",
      date: "Oct 05, 2025",
      photoUrl: "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?q=80&w=600", // Stock sushi photo
      aiDescription: "✨ AI Analysis: Fresh salmon sashimi displayed with an artistic touch, highlighting Japanese culinary precision."
    }
  ];

  // STATE for handling new uploads (Simulation)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [entries, setEntries] = useState(memories);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);

      // SIMULATING AI ANALYSIS (Wait 2 seconds then add photo)
      setTimeout(() => {
        const newEntry: DiaryEntry = {
          id: Date.now(),
          eventName: "My Personal Upload",
          date: "Just now",
          photoUrl: URL.createObjectURL(e.target.files![0]),
          aiDescription: "✨ AI Analysis: (Simulated) The AI detects happy people enjoying a cultural exchange moment!"
        };
        setEntries([newEntry, ...entries]);
        setIsUploading(false);
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">

      {/* Modal Box */}
      <div className="bg-[#DDF4E7] w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-[#26667F]">

        {/* Header */}
        <div className="bg-[#124170] p-6 text-white flex justify-between items-center shrink-0">
          <div>
            <h2 className="text-2xl font-bold">My {countryName} Diary</h2>
            <p className="text-white/70 text-sm">3 Events Attended • 2 Memories Saved</p>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white text-3xl">&times;</button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-6 scrollbar-hide">

          {/* 1. UPLOAD SECTION */}
          <div className="border-2 border-dashed border-[#26667F]/40 rounded-xl p-6 text-center hover:bg-white/40 transition cursor-pointer relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            {isUploading ? (
              <p className="text-[#67C090] font-bold animate-pulse">✨ AI is analyzing your memory...</p>
            ) : (
              <div>
                <span className="text-3xl block mb-2">📸</span>
                <p className="text-[#124170] font-medium">Add a photo to your diary</p>
                <p className="text-xs text-gray-500">AI will auto-generate a caption for you</p>
              </div>
            )}
          </div>

          {/* 2. MEMORY CARDS */}
          {entries.map((memory) => (
            <div key={memory.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-[#26667F]/20 flex flex-col md:flex-row">
              {/* Image Section */}
              <div className="md:w-1/2 h-48 md:h-auto bg-gray-200 relative">
                 {memory.photoUrl ? (
                   <img src={memory.photoUrl} alt="memory" className="w-full h-full object-cover" />
                 ) : (
                   <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                 )}
              </div>

              {/* Text Section */}
              <div className="p-4 md:w-1/2 flex flex-col justify-center">
                 <div className="mb-3">
                    <h3 className="font-bold text-[#124170] text-lg">{memory.eventName}</h3>
                    <p className="text-xs text-gray-500">{memory.date}</p>
                 </div>

                 {/* AI Description Bubble */}
                 <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 relative">
                    <div className="absolute -top-2 right-2 text-xs bg-white border border-blue-200 px-2 rounded-full text-blue-500 font-bold">
                       GEMINI AI
                    </div>
                    <p className="text-sm text-[#26667F] italic">
                       &#34;{memory.aiDescription}&#34;
                    </p>
                 </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default PassportDiaryModal;