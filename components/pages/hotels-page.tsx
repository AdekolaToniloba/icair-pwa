"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Star, MapPin, Phone, MessageCircle, ChevronDown, Check } from "lucide-react"
import { useState, useEffect } from "react"

interface Hotel {
  id: string
  name: string
  distance: string
  price: number
  rating: number
  image?: string
  roomTypes?: string[]
  whatsapp?: string
  discountBadge?: string
  discountPrice?: number
  featured?: boolean
}

const hotelsData: Hotel[] = [
  {
    id: "unilag-guest-house",
    name: "Unilag Guest House",
    distance: "2 min",
    price: 15000,
    rating: 4.8,
    discountPrice: 12750,
    discountBadge: "15% Conference Discount",
    featured: true,
    roomTypes: ["Mercury", "Executive", "Ambassadorial"],
    whatsapp: "+2348012345678",
  },
  {
    id: "go2hotel45",
    name: "Go2Hotel45",
    distance: "10 min",
    price: 8000,
    rating: 4.2,
  },
  {
    id: "caritas-inn",
    name: "Caritas Inn",
    distance: "8 min",
    price: 10000,
    rating: 4.5,
  },
  {
    id: "mulligan-hotel",
    name: "Mulligan Hotel",
    distance: "12 min",
    price: 12000,
    rating: 4.0,
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function HotelsPage() {
  const [hotels, setHotels] = useState<Hotel[]>(hotelsData)
  const [priceRange, setPriceRange] = useState(20000)
  const [maxDistance, setMaxDistance] = useState(20)
  const [sortBy, setSortBy] = useState("rating")
  const [showComparison, setShowComparison] = useState(false)
  const [selectedHotels, setSelectedHotels] = useState<string[]>([])
  const [expandedHotel, setExpandedHotel] = useState<string | null>(null)

  useEffect(() => {
    const filtered = hotelsData.filter((hotel) => {
      const distance = Number.parseInt(hotel.distance)
      return hotel.price <= priceRange && distance <= maxDistance
    })

    // Sort based on selected option
    if (sortBy === "price") {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === "distance") {
      filtered.sort((a, b) => Number.parseInt(a.distance) - Number.parseInt(b.distance))
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating)
    }

    setHotels(filtered)
  }, [priceRange, maxDistance, sortBy])

  const toggleHotelSelection = (hotelId: string) => {
    setSelectedHotels((prev) => (prev.includes(hotelId) ? prev.filter((id) => id !== hotelId) : [...prev, hotelId]))
  }

  const comparisonHotels = hotelsData.filter((h) => selectedHotels.includes(h.id))

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="px-4 py-6 sm:px-6 sm:py-8 pb-8">
      <h2 className="text-2xl font-bold mb-6 text-foreground" data-testid="hotels-title">
        Where to Stay
      </h2>

      {/* Featured Hotel Section */}
      {hotelsData.find((h) => h.featured) && (
        <motion.div variants={item} className="mb-8">
          <h3 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">Featured Hotel</h3>
          <FeaturedHotelCard hotel={hotelsData.find((h) => h.featured)!} onSelect={toggleHotelSelection} />
        </motion.div>
      )}

      {/* Filter Section */}
      <motion.div variants={item} className="bg-card rounded-lg border border-border p-4 mb-6">
        <h3 className="font-bold text-foreground mb-4">Filters & Sort</h3>

        {/* Price Range Slider */}
        <div className="mb-4">
          <label htmlFor="price-slider" className="text-sm font-medium text-foreground mb-2 block">
            Price: ₦{priceRange.toLocaleString()}
          </label>
          <input
            id="price-slider"
            type="range"
            min="5000"
            max="20000"
            step="1000"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full h-2 bg-primary/20 rounded-lg appearance-none cursor-pointer accent-primary"
            data-testid="price-slider"
            aria-valuetext={`₦${priceRange.toLocaleString()}`}
            aria-label="Price range filter"
          />
          <p className="text-xs text-muted-foreground mt-1">₦5,000 - ₦20,000</p>
        </div>

        {/* Distance Filter */}
        <div className="mb-4">
          <label htmlFor="distance-slider" className="text-sm font-medium text-foreground mb-2 block">
            Distance: {maxDistance} min
          </label>
          <input
            id="distance-slider"
            type="range"
            min="5"
            max="20"
            step="1"
            value={maxDistance}
            onChange={(e) => setMaxDistance(Number(e.target.value))}
            className="w-full h-2 bg-primary/20 rounded-lg appearance-none cursor-pointer accent-primary"
            data-testid="distance-slider"
            aria-valuetext={`${maxDistance} minutes`}
            aria-label="Distance range filter"
          />
          <p className="text-xs text-muted-foreground mt-1">5 - 20 minutes</p>
        </div>

        {/* Sort Options */}
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Sort By</label>
          <div className="flex gap-2 flex-wrap">
            {[
              { value: "rating", label: "Rating" },
              { value: "price", label: "Price" },
              { value: "distance", label: "Distance" },
            ].map((option) => (
              <motion.button
                key={option.value}
                onClick={() => setSortBy(option.value)}
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  sortBy === option.value ? "bg-primary text-white" : "bg-primary/10 text-primary hover:bg-primary/20"
                }`}
                data-testid={`sort-${option.value}`}
                aria-pressed={sortBy === option.value}
              >
                {option.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Comparison Toggle */}
        <motion.button
          onClick={() => setShowComparison(!showComparison)}
          whileTap={{ scale: 0.95 }}
          className="mt-4 w-full px-3 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 font-medium text-sm transition-all"
          data-testid="toggle-comparison"
          aria-expanded={showComparison}
          aria-label={`${showComparison ? "Hide" : "Show"} hotel comparison (${selectedHotels.length} selected)`}
        >
          {showComparison ? "Hide Comparison" : "Show Comparison"} ({selectedHotels.length})
        </motion.button>
      </motion.div>

      {/* Hotels List */}
      <motion.div variants={item} className="mb-8">
        <p className="text-sm text-muted-foreground mb-4" role="status" aria-live="polite">
          {hotels.length} hotels found
        </p>
        <div className="space-y-3">
          {hotels.map((hotel, idx) => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
              index={idx}
              isSelected={selectedHotels.includes(hotel.id)}
              onSelect={toggleHotelSelection}
              isExpanded={expandedHotel === hotel.id}
              onToggleExpand={() => setExpandedHotel(expandedHotel === hotel.id ? null : hotel.id)}
              showComparison={showComparison}
            />
          ))}
        </div>
      </motion.div>

      {/* Comparison Section */}
      <AnimatePresence>
        {showComparison && comparisonHotels.length > 0 && <ComparisonSection hotels={comparisonHotels} />}
      </AnimatePresence>

      {/* Loading Skeleton */}
      {hotels.length === 0 && (
        <motion.div variants={item} className="text-center py-8">
          <p className="text-muted-foreground">No hotels match your filters. Try adjusting them.</p>
        </motion.div>
      )}
    </motion.div>
  )
}

// Featured Hotel Card Component
function FeaturedHotelCard({
  hotel,
  onSelect,
}: {
  hotel: Hotel
  onSelect: (id: string) => void
}) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [currentImageIdx, setCurrentImageIdx] = useState(0)

  const roomImages = ["/luxury-hotel-room.png", "/modern-bedroom.png"]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-xl border-2 border-primary/30 overflow-hidden shadow-lg"
      data-testid={`hotel-${hotel.id}`}
    >
      {/* Image Carousel */}
      <div className="relative h-48 bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden">
        <motion.img
          key={currentImageIdx}
          src={roomImages[currentImageIdx]}
          alt={`${hotel.name} room ${currentImageIdx + 1}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full object-cover"
          onLoad={() => setImageLoaded(true)}
        />

        {/* Discount Badge */}
        {hotel.discountBadge && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-3 left-3 bg-secondary text-white px-3 py-1 rounded-full text-xs font-bold"
          >
            {hotel.discountBadge}
          </motion.div>
        )}

        {/* Carousel Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {roomImages.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => setCurrentImageIdx(idx)}
              className={`h-2 rounded-full transition-all ${
                currentImageIdx === idx ? "w-6 bg-white" : "w-2 bg-white/50"
              }`}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-bold text-foreground">{hotel.name}</h3>
            <p className="text-xs text-muted-foreground">{hotel.distance} walk from venue</p>
          </div>
          <motion.button
            onClick={() => onSelect(hotel.id)}
            whileTap={{ scale: 0.9 }}
            className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
            data-testid={`select-${hotel.id}`}
          >
            <Check size={20} className="text-primary" />
          </motion.button>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={i < Math.floor(hotel.rating) ? "fill-secondary text-secondary" : "text-muted-foreground"}
            />
          ))}
          <span className="text-sm font-semibold text-foreground">{hotel.rating}</span>
        </div>

        {/* Price */}
        <div className="mb-4 p-3 bg-primary/5 rounded-lg">
          <p className="text-xs text-muted-foreground">Conference Rate</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-primary">₦{hotel.discountPrice?.toLocaleString()}</span>
            <span className="text-sm line-through text-muted-foreground">₦{hotel.price.toLocaleString()}</span>
          </div>
        </div>

        {/* Room Types */}
        {hotel.roomTypes && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-foreground mb-2">Room Types</p>
            <div className="flex gap-2 flex-wrap">
              {hotel.roomTypes.map((room) => (
                <span key={room} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                  {room}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Booking Buttons */}
        <div className="flex gap-2">
          {hotel.whatsapp && (
            <motion.a
              href={`https://wa.me/${hotel.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.95 }}
              className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg font-semibold text-sm hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
              data-testid={`whatsapp-${hotel.id}`}
            >
              <MessageCircle size={16} />
              WhatsApp
            </motion.a>
          )}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="flex-1 px-4 py-2 border-2 border-primary text-primary rounded-lg font-semibold text-sm hover:bg-primary/5 transition-colors flex items-center justify-center gap-2"
            data-testid={`call-${hotel.id}`}
          >
            <Phone size={16} />
            Call
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

// Hotel Card Component
function HotelCard({
  hotel,
  index,
  isSelected,
  onSelect,
  isExpanded,
  onToggleExpand,
  showComparison,
}: {
  hotel: Hotel
  index: number
  isSelected: boolean
  onSelect: (id: string) => void
  isExpanded: boolean
  onToggleExpand: () => void
  showComparison: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="bg-card rounded-lg border border-border overflow-hidden shadow-sm hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer"
      data-testid={`hotel-${hotel.id}`}
      onClick={onToggleExpand}
    >
      <div className="p-4">
        <div className="flex gap-4">
          {/* Checkbox for Comparison */}
          {showComparison && (
            <motion.button
              onClick={(e) => {
                e.stopPropagation()
                onSelect(hotel.id)
              }}
              whileTap={{ scale: 0.9 }}
              className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center ${
                isSelected ? "bg-primary border-primary" : "border-border"
              }`}
              data-testid={`checkbox-${hotel.id}`}
              role="checkbox"
              aria-checked={isSelected}
              aria-label={`Select ${hotel.name} for comparison`}
            >
              {isSelected && <Check size={16} className="text-white" aria-hidden="true" />}
            </motion.button>
          )}

          {/* Hotel Image/Icon */}
          <div className="flex-shrink-0">
            <div className="h-16 w-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl" aria-hidden="true">
                🏨
              </span>
            </div>
          </div>

          {/* Hotel Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-foreground">{hotel.name}</h3>
                <div className="flex items-center gap-2 mt-1" aria-label={`Rating: ${hotel.rating} stars`}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className={
                        i < Math.floor(hotel.rating) ? "fill-secondary text-secondary" : "text-muted-foreground"
                      }
                      aria-hidden="true"
                    />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">{hotel.rating}</span>
                </div>
              </div>
              <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }} aria-hidden="true">
                <ChevronDown size={20} className="text-muted-foreground" />
              </motion.div>
            </div>

            {/* Distance and Price */}
            <div className="mt-2 flex gap-4 text-sm">
              <div
                className="flex items-center gap-1 text-muted-foreground"
                aria-label={`${hotel.distance} walk from venue`}
              >
                <MapPin size={14} className="text-primary" aria-hidden="true" />
                {hotel.distance}
              </div>
              <div className="font-bold text-primary" aria-label={`Price: ₦${hotel.price.toLocaleString()} per night`}>
                ₦{hotel.price.toLocaleString()}/night
              </div>
            </div>
          </div>
        </div>

        {/* Expanded Details */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 pt-4 border-t border-border"
            >
              <div className="space-y-3">
                {hotel.roomTypes && (
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-1">Available Rooms</p>
                    <div className="flex gap-2 flex-wrap">
                      {hotel.roomTypes.map((room) => (
                        <span key={room} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                          {room}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 px-3 py-2 bg-green-500 text-white rounded font-semibold text-xs hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                    data-testid={`whatsapp-${hotel.id}`}
                  >
                    <MessageCircle size={14} />
                    Book via WhatsApp
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 px-3 py-2 border border-primary text-primary rounded font-semibold text-xs hover:bg-primary/5 transition-colors flex items-center justify-center gap-2"
                    data-testid={`call-${hotel.id}`}
                  >
                    <Phone size={14} />
                    Call Hotel
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

// Comparison Section Component
function ComparisonSection({ hotels }: { hotels: Hotel[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-card rounded-lg border-2 border-primary/30 p-4"
      data-testid="comparison-section"
      role="region"
      aria-label="Hotel comparison table"
    >
      <h3 className="font-bold text-foreground mb-4">Comparison ({hotels.length} hotels)</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm" role="table">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 font-semibold text-foreground">Hotel</th>
              <th className="text-right py-2 font-semibold text-foreground">Price</th>
              <th className="text-right py-2 font-semibold text-foreground">Rating</th>
              <th className="text-right py-2 font-semibold text-foreground">Distance</th>
            </tr>
          </thead>
          <tbody>
            {hotels.map((hotel, idx) => (
              <motion.tr
                key={hotel.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="border-b border-border hover:bg-primary/5 transition-colors"
              >
                <td className="py-3 text-foreground font-medium">{hotel.name}</td>
                <td className="text-right py-3 text-primary font-bold">
                  ₦{(hotel.discountPrice || hotel.price).toLocaleString()}
                </td>
                <td className="text-right py-3 text-foreground">{hotel.rating}★</td>
                <td className="text-right py-3 text-muted-foreground">{hotel.distance}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Save Comparison Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        className="w-full mt-4 px-4 py-2 bg-primary text-white rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors"
        data-testid="save-comparison"
      >
        Save Comparison
      </motion.button>
    </motion.div>
  )
}
