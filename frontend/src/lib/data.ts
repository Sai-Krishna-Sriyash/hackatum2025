

const MOCK_USER = {
  name: "Sriyash Kommalapati",
  nationality: "German",
  avatar: "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1906669723.jpg",
  unlockedRegions: ["Maxvorstadt", "Schwabing"],
  stamps: [
    { 
      id: 1, 
      country: "Japan", 
      flag: "🇯🇵",
      event: "Sushi Workshop", 
      date: "2023-10-15", 
      location: "Maxvorstadt",
      summary: "Learned the art of Maki rolling with Yuki. The matcha tea afterwards was divine!",
      photos: [
        "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=300&q=80",
        "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=300&q=80",
        "https://images.unsplash.com/photo-1502364271109-0a9a75a2a9df?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHN1c2hpfGVufDB8fDB8fHww",
        "https://media.istockphoto.com/id/1325026820/photo/man-eating-delicious-sushi-at-outdoor-restaurant.webp?a=1&b=1&s=612x612&w=0&k=20&c=wWABHYZHZIGqWN4qIeKApAsSRsEnH0OYI9rvhx7J_fU="

      ]
    },
    { 
      id: 2, 
      country: "Brazil", 
      flag: "🇧🇷",
      event: "Samba Night", 
      date: "2023-11-02", 
      location: "Schwabing",
      summary: "Incredible energy! Danced until midnight. Met Mateo and planned a coffee meet.",
      photos: [
        "https://images.unsplash.com/photo-1761144846282-5c6286445c6d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YnJhemxpYW4lMjBzYW1iYXxlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1528000936410-deb9b2dee794?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGRhbmNpbmclMjBicmF6aWx8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1659700556679-6cb287a5c883?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FtYmF8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1506372023823-741c83b836fe?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fGNvZmZlZXxlbnwwfHwwfHx8MA%3D%3D"


      ]
    }
  ],
  buddies: [
    { id: 1, name: "Sarah Chen", nationality: "China", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80", phone: "+49 151 2233 4455" },
    { id: 2, name: "Mateo Silva", nationality: "Brazil", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80", phone: "+49 170 9988 7766" },
    { id: 3, name: "Lara Schmidt", nationality: "Germany", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80", phone: "+49 160 1122 3344" }
  ]
};

const RECOMMENDED_STAMPS = [
  { country: "Mexican", flag: "🇲🇽", reason: "Popular this week" },
  { country: "Indian", flag: "🇮🇳", reason: "Near you" },
  { country: "Italian", flag: "🇮🇹", reason: "Highly rated" },
  { country: "Moroccan", flag: "🇲🇦", reason: "New events added" }
];

const MOCK_EVENTS = [
  {
    id: 99,
    title: "Munich Art Night 2024",
    host: "City of Munich",
    culture: "Munich City",
    flag: "🇩🇪",
    date: "2024-12-01",
    location: "Olympiapark",
    price: 0,
    capacity: 500,
    image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=800&q=80",
    description: "The official monthly city gathering! Free entry for Passport holders with 5+ stamps.",
    type: "City Event",
    isSpecial: true
  },
  {
    id: 1,
    title: "Traditional Tea Ceremony",
    host: "Yuki Tanaka",
    culture: "Japanese",
    flag: "🇯🇵",
    date: "2024-11-24",
    location: "Maxvorstadt",
    price: 15,
    capacity: 10,
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80",
    description: "Experience the tranquility of a traditional tea ceremony hosted by Yuki.",
    type: "Workshop"
  },
  {
    id: 2,
    title: "Bavarian Pretzels & Beer",
    host: "Hans Gruber",
    culture: "Bavarian",
    flag: "🇩🇪",
    date: "2024-11-25",
    location: "Altstadt",
    price: 25,
    capacity: 20,
    image: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?auto=format&fit=crop&w=800&q=80",
    description: "Learn how to make authentic Brezn with a local baker.",
    type: "Food & Drink"
  },
  
  {
    id: 4,
    title: "Ethiopian Coffee Ritual",
    host: "Amara Bekele",
    culture: "Ethiopian",
    flag: "🇪🇹",
    date: "2024-11-28",
    location: "Au-Haidhausen",
    price: 12,
    capacity: 8,
    image: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=800&q=80",
    description: "Participate in the social and spiritual coffee ceremony.",
    type: "Ceremony"
  },
  {
    id: 5,
    title: "Mexican Taco Fiesta",
    host: "Diego Torres",
    culture: "Mexican",
    flag: "🇲🇽",
    date: "2024-11-29",
    location: "Schwabing",
    price: 20,
    capacity: 25,
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80",
    description: "Authentic street tacos made from scratch.",
    type: "Food & Drink"
  },
  {
    id: 6,
    title: "Indian Bollywood Dance",
    host: "Priya Patel",
    culture: "Indian",
    flag: "🇮🇳",
    date: "2024-12-02",
    location: "Giesing",
    price: 12,
    capacity: 20,
    image: "https://i.ytimg.com/vi/YxXuzrILWFA/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCqcYO-bPvo1HK3KsTA5iv5x1xMqA",
    description: "High energy dance workshop!",
    type: "Dance"
  }
];

const nationalities: Record<string, string> = {
  ST: "Select country..",
  AU: "Australia",
  BR: "Brazil",
  CA: "Canada",
  CN: "China",
  DE: "Germany",
  EG: "Egypt",
  ES: "Spain",
  FR: "France",
  GB: "United Kingdom",
  ID: "Indonesia",
  IN: "India",
  IT: "Italy",
  JP: "Japan",
  KR: "South Korea",
  MX: "Mexico",
  NG: "Nigeria",
  RU: "Russia",
  SA: "Saudi Arabia",
  TR: "Turkey",
  US: "United States",
};


const countryFlags = {
  "Australia": "🇦🇺",
  "Brazil": "🇧🇷",
  "Canada": "🇨🇦",
  "China": "🇨🇳",
  "Germany": "🇩🇪",
  "Egypt": "🇪🇬",
  "Spain": "🇪🇸",
  "France": "🇫🇷",
  "United Kingdom": "🇬🇧",
  "Indonesia": "🇮🇩",
  "India": "🇮🇳",
  "Italy": "🇮🇹",
  "Japan": "🇯🇵",
  "South Korea": "🇰🇷",
  "Mexico": "🇲🇽",
  "Nigeria": "🇳🇬",
  "Russia": "🇷🇺",
  "Saudi Arabia": "🇸🇦",
  "Turkey": "🇹🇷",
  "United States": "🇺🇸",
};

export { MOCK_EVENTS };
export { MOCK_USER };
export { RECOMMENDED_STAMPS };
export {nationalities}
export {countryFlags}