

const Header = ({ activeTab, setActiveTab, setShowHostModal, setShowBuddyModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = [
    { id: 'home', label: 'Home', icon: <MapPin size={18} /> },
    { id: 'events', label: 'Events', icon: <Calendar size={18} /> },
    { id: 'passport', label: 'Passport', icon: <Award size={18} /> },
    { id: 'profile', label: 'Profile', icon: <User size={18} /> },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#163C5D] text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-xl tracking-wider cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="bg-white rounded-full p-0.5"><KulturLogo className="w-8 h-8" /></div>
          <span>Kultur<span className="text-[#67B99A]">Konnect</span></span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all ${activeTab === item.id ? 'bg-[#67B99A] text-[#163C5D] font-medium' : 'hover:bg-[#2D7A83] hover:text-white'}`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
          <button onClick={() => setShowBuddyModal(true)} className="flex items-center gap-2 px-3 py-2 hover:text-[#67B99A] transition"><Users size={18} /> My Buddies</button>
          <button onClick={() => setShowHostModal(true)} className="ml-2 bg-[#D4AF37] text-[#163C5D] px-4 py-2 rounded-full font-bold text-sm shadow hover:bg-[#e5bd3f] transition flex items-center gap-2"><PlusCircle size={16} /> Host Event</button>
        </nav>

        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X /> : <Menu />}</button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-[#133452] border-t border-[#2D7A83]">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => { setActiveTab(item.id); setIsMenuOpen(false); }} className="w-full flex items-center gap-3 px-6 py-4 border-b border-[#2D7A83] last:border-0 text-gray-300">{item.label}</button>
          ))}
          <button onClick={() => setShowHostModal(true)} className="w-full flex items-center gap-3 px-6 py-4 text-[#D4AF37] font-bold bg-[#163C5D]/50"><PlusCircle size={18} /> Host an Event</button>
        </div>
      )}
    </header>
  );
};


export default Header;