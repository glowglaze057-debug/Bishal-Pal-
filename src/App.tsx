/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Utensils, 
  Calendar, 
  Users, 
  Clock, 
  Phone, 
  Mail, 
  User, 
  MessageSquare, 
  CheckCircle2, 
  ChevronRight,
  MapPin,
  Instagram,
  Facebook,
  Twitter
} from 'lucide-react';

// --- Types ---
interface BookingData {
  fullName: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  requests: string;
}

const TIME_SLOTS = [
  '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM',
  '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM'
];

export default function App() {
  const [bookingData, setBookingData] = useState<BookingData>({
    fullName: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    guests: 2,
    requests: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [minDate, setMinDate] = useState('');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setMinDate(today);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookingData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingData.fullName || !bookingData.phone || !bookingData.date || !bookingData.time) {
      alert('Please fill in all required fields.');
      return;
    }
    if (!/^\d{10}$/.test(bookingData.phone)) {
      alert('Please enter a valid 10-digit phone number.');
      return;
    }
    setShowSuccess(true);
  };

  const resetForm = () => {
    setBookingData({
      fullName: '',
      phone: '',
      email: '',
      date: '',
      time: '',
      guests: 2,
      requests: ''
    });
    setShowSuccess(false);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark text-brand-cream font-sans selection:bg-brand-gold selection:text-brand-dark">
      {/* --- Navigation --- */}
      <nav className="fixed top-0 w-full z-50 bg-brand-dark/90 backdrop-blur-xl border-b border-brand-gold/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-gold rounded-lg flex items-center justify-center shadow-lg shadow-brand-gold/20">
              <Utensils className="text-brand-dark w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-brand-cream">Tandoori Hotel</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-brand-gold font-semibold">Gazole, Malda</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-10 text-xs font-bold uppercase tracking-widest">
            <button onClick={() => scrollToSection('home')} className="hover:text-brand-gold transition-colors">Home</button>
            <button onClick={() => scrollToSection('menu')} className="hover:text-brand-gold transition-colors">Menu</button>
            <button onClick={() => scrollToSection('booking')} className="hover:text-brand-gold transition-colors">Reservations</button>
          </div>
          <button 
            onClick={() => scrollToSection('booking')}
            className="bg-brand-gold text-brand-dark px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-brand-gold/80 transition-all shadow-xl shadow-brand-gold/10 active:scale-95"
          >
            Book Table
          </button>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=1920" 
            alt="Tandoori Specialties" 
            className="w-full h-full object-cover opacity-60 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/90 via-brand-dark/70 to-brand-dark" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="inline-block text-brand-gold text-xs font-bold tracking-[0.5em] uppercase mb-6">Authentic Indian Cuisine</span>
            <h1 className="text-6xl md:text-9xl font-bold text-brand-cream mb-8 leading-tight tracking-tighter">
              Tandoori <span className="text-brand-gold italic font-serif">Hotel</span>
            </h1>
            <p className="text-lg md:text-xl text-brand-cream/70 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Discover the art of traditional tandoor cooking. A symphony of spices, smoke, and soul served in the heart of Gazole.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => scrollToSection('booking')}
                className="w-full sm:w-auto bg-brand-gold text-brand-dark px-12 py-5 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-brand-gold/80 transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-3"
              >
                Reserve a Table <ChevronRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => scrollToSection('menu')}
                className="w-full sm:w-auto border border-brand-gold/30 text-brand-cream px-12 py-5 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-brand-gold/10 transition-all backdrop-blur-sm active:scale-95"
              >
                Explore Menu
              </button>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-brand-gold/50"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-brand-gold to-transparent" />
        </motion.div>
      </section>

      {/* --- Menu Section (Image Based) --- */}
      <section id="menu" className="py-32 px-6 bg-brand-accent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <span className="text-brand-gold text-xs font-bold tracking-[0.4em] uppercase mb-4 block">Culinary Masterpieces</span>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-brand-cream">Our Menu Card</h2>
            <div className="w-20 h-[1px] bg-brand-gold mx-auto" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="group relative overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-brand-gold/10"
            >
              <img 
                src="https://ais-pre-buylwsnq3zvjbjk5kxrbji-274663843383.asia-southeast1.run.app/menu1.jpg" 
                alt="Tandoori Hotel Menu Card 1" 
                className="w-full h-auto transform group-hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback if the image doesn't exist at that path
                  e.currentTarget.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1200";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-8 left-8">
                <h3 className="text-2xl font-bold text-white mb-2">Main Course & Starters</h3>
                <p className="text-brand-gold text-xs font-bold uppercase tracking-widest">Page 01</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="group relative overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-brand-gold/10"
            >
              <img 
                src="https://ais-pre-buylwsnq3zvjbjk5kxrbji-274663843383.asia-southeast1.run.app/menu2.jpg" 
                alt="Tandoori Hotel Menu Card 2" 
                className="w-full h-auto transform group-hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback if the image doesn't exist at that path
                  e.currentTarget.src = "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=1200";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-8 left-8">
                <h3 className="text-2xl font-bold text-white mb-2">Desserts & Beverages</h3>
                <p className="text-brand-gold text-xs font-bold uppercase tracking-widest">Page 02</p>
              </div>
            </motion.div>
          </div>
          
          <div className="mt-20 text-center">
            <p className="text-brand-cream/40 text-sm italic max-w-xl mx-auto">
              "Cooking is an art, but all art requires knowing something about the techniques and materials." — Our chefs bring years of expertise to your plate.
            </p>
          </div>
        </div>
      </section>

      {/* --- Booking Section --- */}
      <section id="booking" className="py-32 bg-brand-dark relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-gold/5 rounded-full -translate-x-1/2 translate-y-1/2 blur-[120px]" />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <span className="text-brand-gold text-xs font-bold tracking-[0.4em] uppercase mb-6 block">Reservation</span>
            <h2 className="text-5xl md:text-7xl font-bold mb-10 text-brand-cream leading-tight">Book Your <br /><span className="text-brand-gold">Dining Table</span></h2>
            <p className="text-brand-cream/60 text-lg mb-12 max-w-md leading-relaxed font-light">
              Experience the warmth of our hospitality. Whether it's a quiet dinner or a grand celebration, we ensure every moment is special.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-brand-gold/10 border border-brand-gold/20 rounded-2xl flex items-center justify-center group-hover:bg-brand-gold transition-all duration-500">
                  <Phone className="w-6 h-6 text-brand-gold group-hover:text-brand-dark transition-colors" />
                </div>
                <div>
                  <p className="text-[10px] text-brand-gold font-bold uppercase tracking-widest mb-1">Owner Contact</p>
                  <p className="text-xl font-bold text-brand-cream">7393383765</p>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-brand-gold/10 border border-brand-gold/20 rounded-2xl flex items-center justify-center group-hover:bg-brand-gold transition-all duration-500">
                  <MapPin className="w-6 h-6 text-brand-gold group-hover:text-brand-dark transition-colors" />
                </div>
                <div>
                  <p className="text-[10px] text-brand-gold font-bold uppercase tracking-widest mb-1">Location</p>
                  <p className="text-xl font-bold text-brand-cream">Gazole, Malda, Pin 732124</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#121212] p-10 md:p-14 rounded-[3rem] shadow-2xl border border-brand-gold/10 relative z-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold/60 flex items-center gap-2">
                    <User className="w-3 h-3" /> Full Name
                  </label>
                  <input 
                    required
                    type="text"
                    name="fullName"
                    value={bookingData.fullName}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    className="w-full px-0 py-3 bg-transparent border-b border-brand-gold/20 focus:border-brand-gold outline-none transition-all text-brand-cream placeholder:text-brand-cream/20"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold/60 flex items-center gap-2">
                    <Phone className="w-3 h-3" /> Mobile Number
                  </label>
                  <input 
                    required
                    type="tel"
                    name="phone"
                    value={bookingData.phone}
                    onChange={handleInputChange}
                    placeholder="10-digit number"
                    className="w-full px-0 py-3 bg-transparent border-b border-brand-gold/20 focus:border-brand-gold outline-none transition-all text-brand-cream placeholder:text-brand-cream/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold/60 flex items-center gap-2">
                    <Calendar className="w-3 h-3" /> Select Date
                  </label>
                  <input 
                    required
                    type="date"
                    name="date"
                    min={minDate}
                    value={bookingData.date}
                    onChange={handleInputChange}
                    className="w-full px-0 py-3 bg-transparent border-b border-brand-gold/20 focus:border-brand-gold outline-none transition-all text-brand-cream [color-scheme:dark]"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold/60 flex items-center gap-2">
                    <Clock className="w-3 h-3" /> Preferred Time
                  </label>
                  <select 
                    required
                    name="time"
                    value={bookingData.time}
                    onChange={handleInputChange}
                    className="w-full px-0 py-3 bg-transparent border-b border-brand-gold/20 focus:border-brand-gold outline-none transition-all text-brand-cream appearance-none"
                  >
                    <option value="" className="bg-[#121212]">Select Slot</option>
                    {TIME_SLOTS.map(slot => (
                      <option key={slot} value={slot} className="bg-[#121212] text-brand-cream">{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold/60 flex items-center gap-2">
                  <Users className="w-3 h-3" /> Number of Guests
                </label>
                <input 
                  required
                  type="number"
                  name="guests"
                  min="1"
                  max="20"
                  value={bookingData.guests}
                  onChange={handleInputChange}
                  className="w-full px-0 py-3 bg-transparent border-b border-brand-gold/20 focus:border-brand-gold outline-none transition-all text-brand-cream"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold/60 flex items-center gap-2">
                  <MessageSquare className="w-3 h-3" /> Special Requests
                </label>
                <textarea 
                  name="requests"
                  value={bookingData.requests}
                  onChange={handleInputChange}
                  rows={2}
                  placeholder="Any special requirements?"
                  className="w-full px-0 py-3 bg-transparent border-b border-brand-gold/20 focus:border-brand-gold outline-none transition-all resize-none text-brand-cream placeholder:text-brand-cream/20"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-brand-gold text-brand-dark py-6 rounded-2xl text-xs font-bold uppercase tracking-[0.3em] hover:bg-brand-gold/80 transition-all shadow-2xl active:scale-[0.98]"
              >
                Confirm Reservation
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* --- Success Modal --- */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-brand-dark/95 backdrop-blur-2xl"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#121212] w-full max-w-md rounded-[3.5rem] p-12 text-center shadow-2xl border border-brand-gold/20 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-brand-gold" />
              
              <div className="w-24 h-24 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-10 border border-brand-gold/20">
                <CheckCircle2 className="w-12 h-12 text-brand-gold" />
              </div>
              
              <h3 className="text-3xl font-bold mb-4 text-brand-cream">Reservation Confirmed</h3>
              <p className="text-brand-cream/50 mb-10 text-sm">Thank you for choosing Tandoori Hotel. We look forward to serving you.</p>
              
              <div className="bg-brand-accent rounded-3xl p-8 mb-10 text-left space-y-4 border border-brand-gold/5">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold/40">Guest</span>
                  <span className="font-bold text-sm">{bookingData.fullName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold/40">Date & Time</span>
                  <span className="font-bold text-sm">{bookingData.date} • {bookingData.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold/40">Party Size</span>
                  <span className="font-bold text-sm">{bookingData.guests} People</span>
                </div>
              </div>
              
              <button 
                onClick={resetForm}
                className="w-full bg-brand-gold text-brand-dark py-5 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-brand-gold/80 transition-all shadow-lg active:scale-95"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Footer --- */}
      <footer className="bg-brand-accent py-20 border-t border-brand-gold/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-center text-center md:text-left">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                <Utensils className="text-brand-gold w-6 h-6" />
                <span className="text-2xl font-bold tracking-tight text-brand-cream">Tandoori Hotel</span>
              </div>
              <p className="text-brand-cream/40 text-sm leading-relaxed">
                Gazole, Malda, Pin code 732124<br />
                Authentic Tandoori & Indian Cuisine
              </p>
            </div>
            
            <div className="flex justify-center gap-8">
              <a href="#" className="w-12 h-12 rounded-full border border-brand-gold/20 flex items-center justify-center hover:bg-brand-gold hover:text-brand-dark transition-all duration-500">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-brand-gold/20 flex items-center justify-center hover:bg-brand-gold hover:text-brand-dark transition-all duration-500">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-brand-gold/20 flex items-center justify-center hover:bg-brand-gold hover:text-brand-dark transition-all duration-500">
                <Twitter className="w-5 h-5" />
              </a>
            </div>

            <div className="text-center md:text-right">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold mb-2">Contact Owner</p>
              <p className="text-xl font-bold text-brand-cream">7393383765</p>
            </div>
          </div>
          
          <div className="mt-20 pt-10 border-t border-brand-gold/5 text-center">
            <p className="text-brand-cream/20 text-[10px] uppercase tracking-widest">© 2026 Tandoori Hotel • Designed for Excellence</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
