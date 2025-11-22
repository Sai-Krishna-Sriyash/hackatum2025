const KulturLogo = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" stroke="#67B99A" strokeWidth="6" className="opacity-20" />
    <path d="M50 5 A 45 45 0 0 1 50 95" stroke="#67B99A" strokeWidth="2" className="opacity-20" />
    <ellipse cx="50" cy="50" rx="45" ry="20" stroke="#67B99A" strokeWidth="2" className="opacity-20" />
    <circle cx="30" cy="40" r="6" fill="#163C5D" />
    <circle cx="70" cy="30" r="6" fill="#163C5D" />
    <circle cx="50" cy="70" r="6" fill="#163C5D" />
    <path d="M30 40 L 70 30 L 50 70 Z" stroke="#2D7A83" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="70" cy="30" r="2" fill="#D4AF37" />
  </svg>
);