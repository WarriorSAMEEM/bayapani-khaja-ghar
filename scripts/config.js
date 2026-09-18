/* =========================================================
   BAYAPANI KHAJA GHAR — CENTRAL CONFIGURATION
   Edit business info here. Nothing else needs to change.
   ========================================================= */

export const BUSINESS = {
  name: "Bayapani Khaja Ghar",
  nameNp: "बयापानी खाजा घर",
  tagline: "Your Satisfaction Is Our Satisfaction",
  taglineNp: "तपाईंको सन्तुष्टि नै हाम्रो सन्तुष्टि हो",
  phoneDisplay: "9821233154",
  phoneDial: "+9779821233154",
  whatsapp: "9779821233154",       // international format, no +
  addressEn: "Khairahani 6, Parsa, Chitwan, Nepal",
  addressNp: "खैरहनी ६, पर्सा, चितवन, नेपाल",
  addressNote: "Behind Chaudhary Medical",
  hours: "6:30 AM – 9:00 PM",
  hoursNp: "बिहान ६:३० – बेलुका ९:००",
  googleMapsUrl: "https://share.google/TQzV5f70BfISX9l1h",
  googleReviewsUrl: "",            // add when supplied — button hides if empty
  // Opening moment in Nepal time (UTC+05:45). ISO with offset — unambiguous.
  openingIso: "2026-09-25T06:30:00+05:45",
  social: {
    facebook: "",                  // empty → icon auto-hides
    instagram: "",
    tiktok: ""
  }
};

/* MENU — add/edit items here. price:null hides price cleanly. */
export const MENU = [
  // Momo / मःमः
  { id:"m1", category:"Momo",     name:"Steam Momo (Veg)",   nameNp:"स्टिम मःमः (भेज)",  desc:"Fresh steamed dumplings, veg filling.",      price:null, image:"", available:true },
  { id:"m2", category:"Momo",     name:"Steam Momo (Chicken)",nameNp:"स्टिम मःमः (चिकन)",desc:"Juicy chicken momo, steamed to order.",      price:null, image:"", available:true },
  { id:"m3", category:"Momo",     name:"Fried Momo",          nameNp:"फ्राइड मःमः",       desc:"Crispy golden pan-fried momo.",              price:null, image:"", available:true },
  { id:"m4", category:"Momo",     name:"Jhol Momo",           nameNp:"झोल मःमः",          desc:"Momo in warm spiced sesame broth.",          price:null, image:"", available:true },
  // Chowmein / चाउमिन
  { id:"c1", category:"Chowmein", name:"Veg Chowmein",        nameNp:"भेज चाउमिन",        desc:"Stir-fried noodles with fresh vegetables.",  price:null, image:"", available:true },
  { id:"c2", category:"Chowmein", name:"Chicken Chowmein",    nameNp:"चिकन चाउमिन",       desc:"Noodles tossed with tender chicken.",        price:null, image:"", available:true },
  { id:"c3", category:"Chowmein", name:"Egg Chowmein",        nameNp:"अण्डा चाउमिन",      desc:"Classic egg chowmein.",                      price:null, image:"", available:true },
  // Paratha / पराठा
  { id:"p1", category:"Paratha",  name:"Plain Paratha",       nameNp:"सादा पराठा",        desc:"Soft layered flatbread.",                    price:null, image:"", available:true },
  { id:"p2", category:"Paratha",  name:"Egg Paratha",         nameNp:"अण्डा पराठा",       desc:"Paratha wrapped around seasoned egg.",       price:null, image:"", available:true },
  // Egg / अण्डा
  { id:"e1", category:"Egg",      name:"Boiled Egg",          nameNp:"उसिनेको अण्डा",     desc:"Simple boiled egg.",                         price:null, image:"", available:true },
  { id:"e2", category:"Egg",      name:"Omelette",            nameNp:"अम्लेट",            desc:"Fluffy pan omelette.",                       price:null, image:"", available:true },
  // Tea / चिया
  { id:"t1", category:"Tea",      name:"Milk Tea",            nameNp:"दूध चिया",          desc:"Hot Nepali milk tea.",                       price:null, image:"", available:true },
  { id:"t2", category:"Tea",      name:"Black Tea",           nameNp:"कालो चिया",         desc:"Plain black tea.",                           price:null, image:"", available:true },
  { id:"t3", category:"Tea",      name:"Lemon Tea",           nameNp:"लेमन चिया",         desc:"Tea with fresh lemon.",                      price:null, image:"", available:true },
  // Coffee / कफी
  { id:"k1", category:"Coffee",   name:"Milk Coffee",         nameNp:"दूध कफी",           desc:"Hot milk coffee.",                           price:null, image:"", available:true },
  { id:"k2", category:"Coffee",   name:"Black Coffee",        nameNp:"कालो कफी",          desc:"Strong black coffee.",                       price:null, image:"", available:true },
  // Energy Drinks
  { id:"en1",category:"Energy Drinks", name:"Energy Drink",   nameNp:"इनर्जी ड्रिंक",     desc:"Chilled energy drink.",                      price:null, image:"", available:true },
  // Juice / जुस
  { id:"j1", category:"Juice",    name:"Fresh Juice",         nameNp:"ताजा जुस",          desc:"Seasonal fresh juice.",                      price:null, image:"", available:true },
  // Cold Drinks
  { id:"cd1",category:"Cold Drinks", name:"Cold Drink",       nameNp:"कोल्ड ड्रिंक",      desc:"Chilled bottled soft drink.",                price:null, image:"", available:true }
];

/* OFFERS — only active + non-expired are shown publicly. */
export const OFFERS = [
  // Example shape (leave empty for empty-state):
  // { id:"o1", title:"Opening Week Special", desc:"...", price:null,
  //   validUntil:"2026-10-02", active:true, image:"", category:"Momo" }
];

/* ANNOUNCEMENT — only shown when active:true */
export const ANNOUNCEMENT = {
  active: true,
  text: "We open 25 September 2026 — 2083 असोज 09 गते।",
  buttonText: "See Menu",
  buttonLink: "#menu"
};

/* GALLERY — real photos go here later. Empty = graceful placeholder grid. */
export const GALLERY = [
  // { src:"/assets/photo1.jpg", caption:"Steam momo, fresh from the steamer", active:true, order:1 }
];