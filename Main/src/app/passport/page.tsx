import {RECOMMENDED_STAMPS} from "@/lib/data";
import {ArrowRight, ArrowLeft} from "lucide-react";
import {useState} from "react";

const PassportPage = ({user, onUnvisitedClick}) => {
  const [viewMode, setViewMode] = useState('visited');

  interface Memory {
    photos: string[],
    flag: string,
    country: string,
    summary: string,
    event: string,
    date: string
  }

  const [selectedMemory, setSelectedMemory] = useState<Memory | null>();

  return (
      <div className="space-y-6 p-32">
        <div className="text-center pb-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-[#163C5D] font-serif tracking-wide">PASSPORT &
            MEMORIES</h2>
          <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">Official Cultural
            Record</p>
        </div>
        <div className="flex justify-center gap-4">
          <button onClick={() => setViewMode('visited')}
                  className={`px-6 py-2 rounded-full text-sm font-bold transition ${viewMode === 'visited' ? 'bg-[#163C5D] text-white shadow-lg' : 'bg-white text-gray-400 hover:bg-gray-50'}`}>My
            Collection
          </button>
          <button onClick={() => setViewMode('unvisited')}
                  className={`px-6 py-2 rounded-full text-sm font-bold transition ${viewMode === 'unvisited' ? 'bg-[#67B99A] text-white shadow-lg' : 'bg-white text-gray-400 hover:bg-gray-50'}`}>Recommended
          </button>
        </div>

        {viewMode === 'visited' && (
            <div className="grid grid-col md:grid-cols-3 gap-4 animate-in slide-in-from-bottom-4">
              {user.stamps.map((stamp) => (
                  <div key={stamp.id} onClick={() => setSelectedMemory(stamp)}
                       className=" bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-xl transition cursor-pointer group relative overflow-hidden flex flex-col items-center  p-32 text-center">
                    <div className="absolute top-0 left-0 w-full h-2 bg-[#67B99A]"/>
                    <span
                        className="text-4xl mb-2 group-hover:scale-110 transition transform duration-300">{stamp.flag}</span>
                    <h3 className="font-bold text-[#163C5D] text-sm uppercase tracking-wide">{stamp.country}</h3>
                    <div
                        className="absolute bottom-0 left-0 right-0 bg-[#E6F4F1] p-2 translate-y-full group-hover:translate-y-0 transition text-xs text-[#2D7A83] font-bold">View
                      Memory Journal
                    </div>
                  </div>
              ))}
            </div>
        )}

        {viewMode === 'unvisited' && (
            <div className="space-y-4 animate-in slide-in-from-bottom-4">
              <p className="text-center text-sm text-gray-500">Tap a country to find events &
                collect the stamp!</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {RECOMMENDED_STAMPS.map((rec, idx) => (
                    <div key={idx} onClick={() => onUnvisitedClick(rec.country)}
                         className="bg-white p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-[#67B99A] hover:bg-[#E6F4F1]/30 transition cursor-pointer flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <div
                            className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center grayscale group-hover:grayscale-0 transition">
                          <span className="text-2xl">{rec.flag}</span></div>
                        <div><h3 className="font-bold text-[#163C5D]">{rec.country}</h3><p
                            className="text-xs text-[#67B99A] font-medium">{rec.reason}</p></div>
                      </div>
                      <ArrowRight className="text-gray-300 group-hover:text-[#67B99A] transition"
                                  size={20}/>
                    </div>
                ))}
              </div>
            </div>
        )}
        {/* This is a comment */}
        {selectedMemory && (
            <div
                className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/80 backdrop-blur-sm">
              <div
                  className="bg-[#FDFBF7] rounded-lg max-w-2xl w-full shadow-2xl relative overflow-hidden animate-in zoom-in duration-200 flex flex-col h-[85vh]">
                <div
                    className="bg-[#163C5D] p-4 text-white flex justify-between items-center shrink-0">
                  <h3 className="font-serif tracking-widest">JOURNAL ENTRY</h3>
                  <button onClick={() => setSelectedMemory(null)}></button>
                </div>
                <button onClick={() => setSelectedMemory(null)}
                        className="hover:text-[#67B99A] transition mt-1">
                  <ArrowLeft size={32}/>
                </button>
                <div className="p-6 overflow-y-auto">
                  <div className="flex items-center gap-3 mb-6"><span
                      className="text-4xl">{selectedMemory.flag}</span>
                    <div><h2
                        className="text-2xl font-bold text-[#163C5D]">{selectedMemory.country}</h2>
                      <p className="text-[#2D7A83] text-sm">{selectedMemory.event} • {selectedMemory.date}</p>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6"><p
                      className="text-gray-600 italic font-serif text-sm leading-relaxed">"{selectedMemory.summary}"</p>
                  </div>
                  <div className="grid grid-cols-2 gap-16 mt-16 flex flex-grow ">{selectedMemory.photos.map((photo, i) => (
                      <img key={i} src={photo}
                           className="rounded-lg object-cover w-full h-32 hover:scale-105 transition"
                           alt="Memory"/>))}</div>
                </div>
              </div>
            </div>
        )}

      </div>
  );
};

export default PassportPage;