"use client";

import { motion } from "framer-motion";
import {
  Download,
  Plane,
  Pill,
  MapPin,
  Wifi,
  Utensils,
  Hotel,
  Sun,
  Zap,
  AlertCircle,
  Heart,
  ExternalLink,
  FileText,
  ShieldCheck,
  Wallet,
  Car,
  Coffee,
  Phone,
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

interface InfoCardProps {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  delay?: number;
}

function InfoCard({ icon: Icon, title, children, delay = 0 }: InfoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-all hover:shadow-lg"
    >
      <div className="flex items-start gap-4">
        <div className="shrink-0 p-3 bg-primary/10 rounded-lg">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1 space-y-3">
          <h3 className="text-lg font-bold text-foreground">{title}</h3>
          <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface AccommodationCardProps {
  name: string;
  type: string;
  distance: string;
  description: string;
  link?: string;
  delay: number;
}

function AccommodationCard({
  name,
  type,
  distance,
  description,
  link,
  delay,
}: AccommodationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4 }}
      className="bg-card border border-border rounded-lg p-4 hover:border-primary/40 transition-all group"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex-1">
          <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
            {name}
          </h4>
          <p className="text-xs text-muted-foreground mt-0.5">{type}</p>
        </div>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 p-1.5 hover:bg-primary/10 rounded-md transition-colors"
            aria-label={`Visit ${name} website`}
          >
            <ExternalLink className="w-4 h-4 text-primary" />
          </a>
        )}
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
        <MapPin className="w-3.5 h-3.5" />
        <span>{distance}</span>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </motion.div>
  );
}

export default function TravelGuidePage() {
  return (
    <div className="px-4 py-6 sm:px-6 sm:py-8 max-w-4xl mx-auto">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent p-8 border border-primary/20">
          {/* Animated background elements */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/20 rounded-full blur-3xl"
          />

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold mb-4"
            >
              <Plane className="w-3.5 h-3.5" />
              November 4–6, 2025
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-4xl font-bold text-foreground mb-3"
            >
              Welcome to Lagos
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-6"
            >
              Your guide to the MIRG-ICAIR Conference at University of Lagos
              Multipurpose Hall, Unilag Akoka. Everything you need for a smooth
              trip — fast, light, and mobile-first.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="/travel-checklist"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-md"
              >
                <FileText className="w-4 h-4" />
                Prep Checklist
              </a>
              <button
                onClick={() => {
                  // PDF download logic
                  window.print();
                }}
                className="inline-flex items-center gap-2 bg-card border border-border text-foreground px-5 py-2.5 rounded-lg font-semibold hover:border-primary/40 hover:bg-primary/5 transition-all"
              >
                <Download className="w-4 h-4" />
                Download Guide
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Before You Travel Section */}
      <motion.section
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="mb-12"
      >
        <motion.h2
          {...fadeInUp}
          className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2"
        >
          <Plane className="w-6 h-6 text-primary" />
          Before You Travel
        </motion.h2>

        <div className="space-y-4">
          <InfoCard icon={Sun} title="Pack for warm, humid weather" delay={0.1}>
            <p>
              Lagos in November is typically warm. Think breathable fabrics —
              cotton and linen are your friends. Comfortable walking shoes are a
              must (you'll be doing more walking than you think). Bring
              sunglasses and sunscreen.
            </p>
            <p>
              Pack a light jacket too — conference rooms can get chilly with AC,
              and evenings sometimes bring a breeze.
            </p>
          </InfoCard>

          <InfoCard icon={Zap} title="Electronics & power" delay={0.2}>
            <p>
              Bring your chargers and a portable power bank. Most hotels and
              conference rooms have outlets, but a backup battery is always
              smart for long conference days.
            </p>
            <p>
              Nigeria uses Type G plugs (same as UK). If you're coming from
              elsewhere, grab an adapter before you leave.
            </p>
          </InfoCard>

          <InfoCard icon={Pill} title="Health & vaccines" delay={0.3}>
            <p>
              Nigeria may require a Yellow Fever vaccination certificate
              depending on where you're coming from. Check with your local
              Nigerian embassy or consulate for the latest requirements.
            </p>
            <p>
              Bring any prescription meds in their original packaging. Pack a
              small first-aid kit and some insect repellent — Lagos is tropical,
              after all.
            </p>
          </InfoCard>

          <InfoCard icon={ShieldCheck} title="Travel insurance" delay={0.4}>
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <p>
                We strongly recommend travel insurance that covers medical
                emergencies and trip changes. Better safe than sorry.
              </p>
            </div>
          </InfoCard>
        </div>
      </motion.section>

      {/* Visas & Flights Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
          <Plane className="w-6 h-6 text-primary" />
          Visas & Flights
        </h2>

        <div className="space-y-4">
          <InfoCard icon={Plane} title="Visas">
            <p>
              Most visitors need to apply for a Nigerian visa ahead of time,
              unless you're eligible for Visa-on-Arrival or ECOWAS entry. Don't
              leave this to the last minute — check with the Nigerian Embassy or
              consulate in your country well before your trip.
            </p>
          </InfoCard>

          <InfoCard icon={MapPin} title="Flights">
            <p>
              Lagos's main airport is Murtala Muhammed International Airport
              (LOS). From there, rideshare apps like Bolt and Uber are the
              easiest way to reach Yaba/Unilag area.
            </p>
            <p>
              Airport taxis work too, but rideshares tend to be more
              straightforward and you can see the price upfront.
            </p>
          </InfoCard>
        </div>
      </motion.section>

      {/* Where to Stay Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-12"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Hotel className="w-6 h-6 text-primary" />
            Where to Stay
          </h2>
          <motion.a
            href="/hotels"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-sm text-primary font-semibold hover:underline flex items-center gap-1"
          >
            View all hotels
            <ExternalLink className="w-3.5 h-3.5" />
          </motion.a>
        </div>

        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20 rounded-xl p-6 mb-6">
          <div className="flex items-start gap-3">
            <Heart className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-foreground mb-2">
                Our top pick: Unilag Guest House
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The on-campus guest house is your closest option to the
                Multipurpose Hall. Choose from Mercury, Executive, or
                Ambassadorial rooms. See the attached price list for current
                rates and room photos.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <p className="text-sm text-muted-foreground font-medium">
            Other comfortable options (all within ~10 minutes depending on
            traffic):
          </p>

          <div className="grid gap-3">
            <AccommodationCard
              name="Go2Hotel45"
              type="Budget to midrange"
              distance="Alagomeji/Yaba"
              description="Solid choice for those watching their budget. Clean, comfortable, and well-located."
              link="https://go2hotel45.com"
              delay={0.1}
            />

            <AccommodationCard
              name="Caritas Inn, Yaba"
              type="Business-friendly"
              distance="Central Yaba"
              description="Convenient Yaba location that caters well to business travelers. Reliable and comfortable."
              link="https://caritasinnyabahotel.com"
              delay={0.2}
            />

            <AccommodationCard
              name="Mulligan Hotel"
              type="Mid-tier"
              distance="Yaba area"
              description="Established hotel with all the standard amenities you'd expect."
              link="https://mulligan.lagos-hotels-ng.com"
              delay={0.3}
            />

            <AccommodationCard
              name="Captain Residency Hotel"
              type="Business hotel"
              distance="Yaba, short drive to Unilag"
              description="Another good business option with a short commute to the conference venue."
              link="https://sembo.co.uk"
              delay={0.4}
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-muted/30 rounded-lg p-4 flex items-start gap-3"
        >
          <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Pro tip:</span> Book
            early. Lagos traffic and demand can mean limited availability,
            especially during conference season.
          </p>
        </motion.div>
      </motion.section>

      {/* Getting Around Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
          <Car className="w-6 h-6 text-primary" />
          Getting Around
        </h2>

        <div className="grid gap-4">
          <div className="bg-card border border-border rounded-lg p-5">
            <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
              <Phone className="w-5 h-5 text-primary" />
              Best options
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="shrink-0 w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                <div>
                  <span className="font-semibold text-foreground">
                    Rideshares (Bolt, Uber):
                  </span>{" "}
                  Safest and most predictable for conference travel. Download
                  the apps before you arrive.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="shrink-0 w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                <div>
                  <span className="font-semibold text-foreground">
                    Private taxi:
                  </span>{" "}
                  Your hotel can arrange this, or book one from the airport.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="shrink-0 w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                <div>
                  <span className="font-semibold text-foreground">
                    BRT / Local buses:
                  </span>{" "}
                  More economical but can be slower and less convenient if
                  you're unfamiliar with the routes.
                </div>
              </li>
            </ul>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="bg-muted/30 rounded-lg p-4 flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              Allow extra time during peak commute hours. Lagos traffic is real
              — build in buffer time to avoid stress.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* At the Venue Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
          <MapPin className="w-6 h-6 text-primary" />
          At the Venue
        </h2>

        <div className="space-y-4">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="shrink-0 p-3 bg-primary/10 rounded-lg">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground mb-2">
                  Unilag Multipurpose Hall
                </h3>
                <p className="text-sm text-muted-foreground mb-1">
                  (Jelili Adebisi Omotola Hall)
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The conference runs across the main hall and adjacent breakout
                  rooms on the Unilag campus in Akoka/Yaba. Floor plans are
                  available on the conference site.
                </p>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <h4 className="font-semibold text-foreground mb-3 text-sm">
                Facilities
              </h4>
              <div className="grid gap-3">
                <div className="flex items-start gap-3">
                  <Wifi className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-foreground font-medium">
                      Venue Wi-Fi
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Available but can be limited during peak times — save
                      offline copies of your slides just in case
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Coffee className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-foreground font-medium">
                      Café & charging
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Charging points and café stalls nearby for breaks
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-foreground font-medium">
                      Safety & support
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Onsite first aid and security throughout the event
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="border-t border-border pt-8 pb-4"
      >
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center gap-2 text-primary">
            <Heart className="w-5 h-5" />
            <span className="text-sm font-semibold">
              See you at the conference!
            </span>
          </div>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Questions or need help? Check out the full schedule, venue map, and
            more in the app navigation below.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
