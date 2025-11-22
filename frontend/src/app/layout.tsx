import './globals.css'
import type { Metadata } from 'next'
import { Rubik } from 'next/font/google'
import { useState } from 'react'
import Header from '../components/layout/Header'
import HomePage from '@/app/page'
import EventsPage from '@/app/events/page'
import PassportPage from '@/app/passport/page'
import ProfilePage from '@/app/profile/page'
import { MOCK_USER } from '@/lib/data';

const rubik = Rubik({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-rubik',
})

export const metadata: Metadata = {
  title: 'KulturKonnect',
  description: 'Unlock Munich. One culture at a time.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [showHostModal, setShowHostModal] = useState(false);
  const [showBuddyModal, setShowBuddyModal] = useState(false);
  const [user, setUser] = useState(MOCK_USER);
  const [filters, setFilters] = useState({ maxPrice: 50, date: '', location: '', cityExclusive: false, culture: '', unvisitedOnly: false });

  const handleUnvisitedClick = (culture) => {
    setFilters(prev => ({ ...prev, culture: culture }));
    setActiveTab('events');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <HomePage user={user} setSelectedEvent={setSelectedEvent} />;
      case 'events': return <EventsPage user={user} setSelectedEvent={setSelectedEvent} filters={filters} setFilters={setFilters} />;
      case 'passport': return <PassportPage user={user} onUnvisitedClick={handleUnvisitedClick} />;
      case 'profile': return <ProfilePage user={user} />;
      default: return <HomePage user={user} setSelectedEvent={setSelectedEvent} />;
    }
  };
  return (
    <html lang="en">
      <body className={`${rubik.variable} font-sans bg-minga-mint text-minga-blue min-h-screen flex flex-col`}>
        
        {/* TOP HEADER */}

        
        <div className="min-h-screen bg-[#F5F9F8] font-sans text-[#163C5D]">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} setShowHostModal={setShowHostModal} setShowBuddyModal={setShowBuddyModal} />
      <main className="max-w-6xl mx-auto px-4 py-6 pb-24 md:pb-6">
        {renderContent()}
      </main>
      
      {selectedEvent && !showPayment && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#163C5D]/60 backdrop-blur-sm">
           <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6 relative animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
             <button onClick={() => setSelectedEvent(null)} className="absolute top-4 right-4 bg-gray-100 p-2 rounded-full"><X size={20}/></button>
             <div className="mb-4"><img src={selectedEvent.image} className="w-full h-40 object-cover rounded-xl" /></div>
             <div className="flex gap-2 items-center mb-2"><span className="text-2xl">{selectedEvent.flag}</span><h2 className="text-2xl font-bold text-[#163C5D]">{selectedEvent.title}</h2></div>
             <p className="text-gray-600 mb-4">{selectedEvent.description}</p>
             <button onClick={() => setShowPayment(true)} className="w-full bg-[#163C5D] text-white py-3 rounded-xl font-bold hover:bg-[#2D7A83] transition shadow-lg">Book Ticket • €{selectedEvent.price}</button>
           </div>
        </div>
      )}

      {showPayment && selectedEvent && <PaymentModal event={selectedEvent} onClose={() => setShowPayment(false)} />}
      {showHostModal && <HostEventModal onClose={() => setShowHostModal(false)} />}
      {showBuddyModal && <BuddyModal user={user} onClose={() => setShowBuddyModal(false)} />}
      
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 flex justify-between items-center z-40 pb-safe">
        {['home', 'events', 'passport', 'profile'].map((id) => (
          <button key={id} onClick={() => setActiveTab(id)} className={`flex flex-col items-center gap-1 capitalize ${activeTab === id ? 'text-[#67B99A]' : 'text-gray-400'}`}>
            {id === 'home' && <MapPin size={24} />}
            {id === 'events' && <Calendar size={24} />}
            {id === 'passport' && <Award size={24} />}
            {id === 'profile' && <User size={24} />}
            <span className="text-[10px] font-bold">{id}</span>
          </button>
        ))}
      </div>
    </div>
      

        {/* Main Content Area */}
        <div className="flex-1 relative z-0"> 
          {children}
        </div>

      </body>
    </html>
  )
}