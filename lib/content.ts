// Real Two Men content only. Addresses, hours and signature items were captured
// from twomenbagels.com for the earlier landing page; anything not confirmed is a
// [PLACEHOLDER: ...] for the owner to fill.

export type Outlet = {
  slug: string;
  name: string;
  address: string;
  postal: string;
  street: string;
  hours: string;
  opens: string;
  closes: string;
  lastOrder: string;
  sketch: string;
  signature: string;
  mapUrl: string;
};

const map = (q: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Two Men Bagel House ${q}`)}`;

export const outlets: Outlet[] = [
  {
    slug: "tanjong-pagar",
    name: "Tanjong Pagar",
    address: "16 Enggor St #01-12, Icon Village Altez, Singapore 079717",
    street: "16 Enggor St #01-12",
    postal: "079717",
    hours: "Daily, 8am – 3.30pm",
    opens: "08:00",
    closes: "15:30",
    lastOrder: "Last order 3.15pm",
    sketch: "/img/sketch-tp.jpg",
    signature: "The Jurassic Project",
    mapUrl: map("16 Enggor St #01-12 Icon Village Altez Singapore 079717"),
  },
  {
    slug: "novena",
    name: "Novena",
    address: "103 Irrawaddy Rd #01-04, Royal Square, Singapore 329566",
    street: "103 Irrawaddy Rd #01-04",
    postal: "329566",
    hours: "Daily, 8am – 3.30pm",
    opens: "08:00",
    closes: "15:30",
    lastOrder: "Last order 3.15pm",
    sketch: "/img/sketch-nv.jpg",
    signature: "All My Exes",
    mapUrl: map("103 Irrawaddy Rd #01-04 Royal Square Singapore 329566"),
  },
  {
    slug: "holland-village",
    name: "Holland Village",
    address: "17D Lor Liput, Singapore 277773",
    street: "17D Lor Liput",
    postal: "277773",
    hours: "Daily, 8am – 3.30pm",
    opens: "08:00",
    closes: "15:30",
    lastOrder: "Last order 3.15pm",
    sketch: "/img/sketch-hv.jpg",
    signature: "What She Ordered",
    mapUrl: map("17D Lor Liput Singapore 277773"),
  },
  {
    slug: "joo-chiat",
    name: "Joo Chiat",
    address: "465 Joo Chiat Rd, Singapore 427677",
    street: "465 Joo Chiat Rd",
    postal: "427677",
    hours: "Daily, 8am – 3.30pm",
    opens: "08:00",
    closes: "15:30",
    lastOrder: "Last order 3.15pm",
    sketch: "/img/sketch-jc.jpg",
    signature: "Boss Hogg",
    mapUrl: map("465 Joo Chiat Rd Singapore 427677"),
  },
  {
    slug: "punggol",
    name: "Punggol",
    address: "Punggol Digital District, 98 Punggol Way #01-212, Singapore 829857",
    street: "98 Punggol Way #01-212",
    postal: "829857",
    hours: "Daily, 8am – 4pm",
    opens: "08:00",
    closes: "16:00",
    lastOrder: "Last order 3.30pm",
    sketch: "/img/sketch-pg.jpg",
    signature: "Finding Nemo",
    mapUrl: map("98 Punggol Way #01-212 Singapore 829857"),
  },
];

export type Specimen = { name: string; fact: string; src: string; alt: string };

export const lineup: Specimen[] = [
  { name: "The Jurassic Project", fact: "Signature at Tanjong Pagar", src: "/img/tp-the-jurassic-project.png", alt: "The Jurassic Project bagel sandwich, stacked with sliced meats, pickled greens and slaw." },
  { name: "All My Exes", fact: "Signature at Novena", src: "/img/nv-all-my-exes.png", alt: "The All My Exes bagel sandwich." },
  { name: "What She Ordered", fact: "Signature at Holland Village", src: "/img/hv-what-she-ordered.png", alt: "The What She Ordered bagel sandwich." },
  { name: "Boss Hogg", fact: "Signature at Joo Chiat", src: "/img/jc-boss-hogg.png", alt: "The Boss Hogg bagel sandwich." },
  { name: "Finding Nemo", fact: "Signature at Punggol", src: "/img/pg-finding-nemo.png", alt: "The Finding Nemo bagel sandwich." },
  { name: "Sesame", fact: "Bagel", src: "/img/bagel-sesame.png", alt: "A sesame-crusted bagel." },
  { name: "All Sorts", fact: "Bagel", src: "/img/bagel-all-sorts.png", alt: "An all sorts bagel loaded with mixed toppings." },
  { name: "Jalapeño Cheddar", fact: "Bagel", src: "/img/bagel-jalapeno-cheddar.png", alt: "A jalapeño cheddar bagel." },
  { name: "Blueberry", fact: "Bagel", src: "/img/bagel-blueberry.png", alt: "A blueberry bagel." },
  { name: "Garlic", fact: "Bagel", src: "/img/bagel-garlic.png", alt: "A garlic bagel." },
  { name: "Plain", fact: "Bagel", src: "/img/bagel-plain.png", alt: "A plain bagel." },
];

export type OrderLink = { label: string; note: string; href: string; external: boolean; platform?: string };

export const orderLinks: OrderLink[] = [
  { label: "Free islandwide delivery", note: "Order online", href: "https://www.twomenbagels.com/order-now", external: true, platform: "the ordering site" },
  { label: "Build your own bagel", note: "On Oddle", href: "https://twomenbagelsbyob.oddle.me/en_SG?productId=8aa600449f202fff019f2259ccd92d4f", external: true, platform: "Oddle" },
  { label: "GrabFood", note: "Delivery on GrabFood", href: "https://www.twomenbagels.com/order", external: true, platform: "the GrabFood page" },
  { label: "Event orders", note: "Personal and corporate", href: "/events-catering", external: false },
];

export const nav = [
  { label: "Our Story", href: "/#story" },
  { label: "Outlets", href: "/#find-us" },
  { label: "Community", href: "/community" },
  { label: "Events & Catering", href: "/events-catering" },
  { label: "Join Us", href: "/join-us" },
];

export const links = {
  eber: "https://tmbh.eber.co/",
  instagram: "https://www.instagram.com/twomenbagelhouse/",
  facebook: "https://www.facebook.com/twomenbagelhouse",
};

export const photos = {
  party: { src: "/img/site-banner-02.jpg", alt: "A packed Two Men party, the crowd cheering in front of a Tmbh banner." },
  shirts: { src: "/img/site-banner-03.jpg", alt: "Three crew members, arms round each other, in shirts reading Welcome to Bagel House." },
  dough: { src: "/img/site-banner-04.jpg", alt: "A baker in a bandana working dough under a cloud of flour." },
  counter: { src: "/img/site-banner-05.jpg", alt: "A crew member at the counter in a shirt reading Sons and Daughters of the Bagel, Two Men, Founded '14." },
};

// The brand letter from twomenbagels.com, signed "yours to keep, tmbh".
export const story = [
  "Most people remember Two Men as that unassuming little hole-in-the-wall bagel shop — the one with queues so long they started forming friendships, and a kitchen that never stopped moving, churning out bagel sandwiches with the kind of energy only true passion can provide.",
  "In an era where new brands appear faster than you can say “artisan sourdough,” and social media hype moves in waves louder than any oven buzzer, our story has had its moments of doubt. Through the noise, through the trends, something quietly kept Two Men on its feet — not because we were perfect, but because we stayed stubbornly true to what we believed in.",
  "So, what really makes Two Men, well… Two Men?",
  "This letter isn’t an attempt to unravel some grand mystery of our existence or to translate our DNA into fluffy metaphors. It’s simply a question — a quiet invitation to think about who we’ve become and who we still want to be. The answer we choose today will shape the flavour of tomorrow.",
  "Two Men stands together today not because of two young dreamers from a decade ago, but because a new generation of bakers, baristas, and believers has taken up the same simple idea — that honest food, made with care, is worth showing up for. They’re the ones who keep the flame alive, one bagel at a time.",
];

// Community strip media, from the brand's own Instagram posts. All 4:5.
export type CommunityMedia =
  | { type: "image"; src: string; alt: string; width: number; height: number }
  | { type: "video"; src: string; poster: string; label: string };

export const communityMedia: CommunityMedia[] = [
  {
    type: "image",
    src: "/media/crunching-tiger.jpg",
    width: 1600,
    height: 2000,
    alt: "Poster for the Crunching Tiger: a fried chicken bagel sandwich with pickles and lettuce, framed by cobwebs, jack-o'-lanterns and the bagel boys in Halloween costume.",
  },
  {
    type: "video",
    src: "/media/community-clip-2.mp4",
    poster: "/media/community-clip-2.jpg",
    label: "Spooky Sheet: the bagel boys as two ghosts in caps, one saying boo",
  },
  {
    type: "image",
    src: "/media/crew-shirts.jpg",
    width: 1080,
    height: 1350,
    alt: "Two crew members in black shirts printed Two Men Bagel House, Treat-ment Facilities, Singapore, Bangkok, Hong Kong, Licensed 2014.",
  },
  {
    type: "video",
    src: "/media/community-clip-1.mp4",
    poster: "/media/community-clip-1.jpg",
    label: "Treat Your Girl Right shirts, marked extremely limited, held up with bagels",
  },
  {
    type: "image",
    src: "/media/foodie-hong-kong.jpg",
    width: 1024,
    height: 1280,
    alt: "Foodie headline over a halved bagel sandwich: Singapore's New York bagel brand Two Men Bagel House arrives in Hong Kong.",
  },
];
