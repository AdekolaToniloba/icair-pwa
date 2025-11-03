"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import { useState } from "react";

interface Hotel {
  id: string;
  name: string;
  address: string;
  image: string;
  googleMapsUrl: string;
  distance?: string; // Optional, for display purposes
}

const hotelsData: Hotel[] = [
  {
    id: "unilag-guest-house",
    name: "Unilag Guest House",
    address: "University of Lagos, Akoka, Lagos",
    image: "/hotels/guest-house.jpg",
    googleMapsUrl: "https://maps.google.com/?q=University+of+Lagos+Guest+House",
    distance: "2 min walk",
  },
  {
    id: "go2hotel45",
    name: "Go2Hotel45",
    address: "15 Tokunbo St, Yaba, Lagos 100001, Lagos",
    image: "/hotels/go2hotel45.webp",
    googleMapsUrl: "https://maps.google.com/?q=Go2Hotel45+Lagos",
    distance: "10 min drive",
  },
  {
    id: "caritas-inn",
    name: "Caritas Inn",
    address: "336 Herbert Macaulay Wy, Onike, Lagos 100001, Lagos",
    image: "/hotels/caritas.jpeg",
    googleMapsUrl: "https://maps.google.com/?q=Caritas+Inn+Lagos",
    distance: "8 min drive",
  },
  {
    id: "mulligan-hotel",
    name: "Mulligan Hotel",
    address: "17a Commercial Ave, Yaba, Lagos 101245, Lagos",
    image: "/hotels/mulligan.jpg",
    googleMapsUrl: "https://maps.google.com/?q=Mulligan+Hotel+Lagos",
    distance: "12 min drive",
  },
  {
    id: "radisson-blu-lagos",
    name: "Radisson Blu Hotel",
    address: "38-40 Isaac John St, Ikeja GRA, Lagos 100271, Lagos",
    image: "/hotels/radisson-blu.jpg",
    googleMapsUrl: "https://maps.app.goo.gl/nrqdu7yActKzhCvq7",
    distance: "20 min drive",
  },
  {
    id: "sojourner",
    name: "The Sojourner by Genesis",
    address: "16 Oba Akinjobi Way, Ikeja GRA, Street 101233, Lagos",
    image: "/hotels/sojourner.jpg",
    googleMapsUrl: "https://maps.app.goo.gl/qtwn1qAm783Xhije9",
    distance: "22 min drive",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function HotelsPage() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="px-4 py-6 sm:px-6 sm:py-8 pb-24"
    >
      {/* Header */}
      <motion.div variants={item} className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Where to Stay
        </h1>
        <p className="text-muted-foreground">
          Recommended accommodations near the conference venue
        </p>
      </motion.div>

      {/* Hotels Grid */}
      <motion.div
        variants={item}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {hotelsData.map((hotel, idx) => (
          <HotelCard key={hotel.id} hotel={hotel} index={idx} />
        ))}
      </motion.div>
    </motion.div>
  );
}

function HotelCard({ hotel, index }: { hotel: Hotel; index: number }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="bg-card rounded-xl border border-border overflow-hidden hover:border-primary/40 hover:shadow-lg transition-all"
    >
      {/* Hotel Image */}
      <div className="relative h-48 bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden">
        {/* Placeholder/Loading state */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <div className="text-6xl opacity-30">🏨</div>
          </div>
        )}

        {/* Actual Image */}
        {!imageError && (
          <img
            src={hotel.image}
            alt={hotel.name}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true);
              setImageLoaded(false);
            }}
          />
        )}

        {/* Fallback icon if image fails */}
        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <div className="text-6xl opacity-30">🏨</div>
          </div>
        )}

        {/* Distance Badge (Optional) */}
        {hotel.distance && (
          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
            {hotel.distance}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Hotel Name */}
        <h3 className="text-lg font-bold text-foreground mb-2">{hotel.name}</h3>

        {/* Address */}
        <div className="flex items-start gap-2 mb-4">
          <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground line-clamp-2">
            {hotel.address}
          </p>
        </div>

        {/* Get Directions Button */}
        <motion.a
          href={hotel.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors"
        >
          <Navigation className="w-4 h-4" />
          Get Directions
        </motion.a>
      </div>
    </motion.div>
  );
}
