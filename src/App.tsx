/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { ReactNode, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, MapPin, Phone, Star, ChevronRight } from "lucide-react";
import { BookingPage } from "./components/Booking";
import StaffPage from "./components/StaffPortal";

const FadeIn = ({ children, delay = 0, className = "" }: { children: ReactNode, delay?: number, className?: string, key?: React.Key }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    className={className}
  >
    {children}
  </motion.div>
);

function Navbar({ onBook }: { onBook: () => void }) {
  return (
    <nav className="w-full flex items-center justify-between py-6 px-6 md:px-12 lg:px-24">
      <div className="flex items-center gap-2 font-serif text-2xl md:text-3xl font-semibold tracking-wide text-brand-accent">
        <img src="/logo.svg" alt="Finan Logo" className="h-8 md:h-10 w-auto" />
        <span>FINAN</span>
      </div>
      <div className="hidden md:flex space-x-10 text-sm font-medium text-brand-text/80">
        <a href="#about" className="hover:text-brand-primary transition-colors font-sans">About</a>
        <a href="#services" className="hover:text-brand-primary transition-colors font-sans">Services</a>
        <a href="#contact" className="hover:text-brand-primary transition-colors font-sans">Contact</a>
      </div>
      <button 
        onClick={onBook}
        className="hidden md:block px-6 py-2.5 bg-brand-accent text-white text-sm font-medium rounded-sm hover:bg-brand-accent/90 transition-colors font-sans uppercase tracking-widest text-[11px]"
      >
        Book an appointment
      </button>
    </nav>
  );
}

function Hero({ onBook }: { onBook: () => void }) {
  return (
    <section className="relative w-full min-h-[calc(100vh-100px)] flex flex-col md:flex-row items-center px-6 md:px-12 lg:px-24 py-12 gap-12 lg:gap-20">
      <div className="flex-1 space-y-8 z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-brand-text"
        >
          The art of a <br />
          <span className="italic text-brand-primary">perfect smile.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-base md:text-lg text-brand-text/70 max-w-md leading-relaxed font-light font-sans"
        >
          Experience world-class dental care in a calm, luxurious environment. We combine advanced technology with a gentle touch to transform your smile.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="pt-4 flex flex-wrap items-center gap-4"
        >
          <button 
            onClick={onBook}
            className="px-8 py-4 bg-brand-text text-white text-xs uppercase tracking-widest font-bold rounded-sm flex items-center gap-3 hover:bg-brand-text/90 transition-all group font-sans"
          >
            Begin Your Journey 
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <a href="#services" className="px-8 py-4 bg-transparent border border-brand-primary text-brand-primary text-xs uppercase tracking-widest font-bold rounded-sm hover:bg-brand-primary/5 transition-all font-sans text-center">
            Explore Services
          </a>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="flex-1 w-full h-[50vh] md:h-[70vh] bg-[#F0EFEA] rounded-sm flex items-center justify-center relative overflow-hidden"
      >
        {/* Subtle cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/10 to-transparent"></div>
        <span className="text-brand-text/20 font-sans font-medium tracking-[0.2em] uppercase text-xs">Cinematic Hero Image</span>
      </motion.div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <FadeIn>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-brand-text">
            Excellence in Every Detail
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-base md:text-lg text-brand-text/70 leading-relaxed font-light font-sans">
            At Finan Specialty Dental Clinic, we believe that a healthy smile is the foundation of confidence. Our clinic is designed to provide a serene, stress-free experience from the moment you walk in. With a focus on trust and professionalism, our expert team uses the latest techniques to ensure your comfort and deliver exceptional results.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    { title: "Cosmetic Dentistry", desc: "Veneers, whitening, and complete smile makeovers." },
    { title: "Implantology", desc: "Permanent, natural-looking solutions for missing teeth." },
    { title: "Orthodontics", desc: "Clear aligners and modern braces for perfect alignment." },
    { title: "Restorative Care", desc: "Crowns, bridges, and advanced restorative treatments." }
  ];

  return (
    <section id="services" className="py-24 md:py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* Services List */}
        <div className="space-y-12">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-brand-text/10 pb-8">
              <h2 className="font-serif text-4xl md:text-5xl text-brand-text">Our Expertise</h2>
              <p className="text-brand-text/60 max-w-sm font-light font-sans">Tailored treatments designed to meet your unique dental needs.</p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, i) => (
              <FadeIn key={i} delay={i * 0.1} className="space-y-4 group cursor-pointer">
                <div className={`h-1 w-12 ${i % 2 === 0 ? 'bg-brand-primary/30 group-hover:bg-brand-primary' : 'bg-brand-accent/30 group-hover:bg-brand-accent'} transition-colors duration-500`}></div>
                <h3 className="font-serif text-xl text-brand-text">{service.title}</h3>
                <p className="text-brand-text/70 font-light text-sm leading-relaxed font-sans">{service.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Transformations */}
        <div className="space-y-12">
          <FadeIn>
            <h3 className="font-serif text-3xl text-brand-text text-center">Transformations</h3>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((item) => (
              <FadeIn key={item} delay={item * 0.2} className="space-y-4">
                <div className="flex gap-2 h-64">
                  <div className="flex-1 bg-brand-bg rounded-sm flex items-center justify-center border border-brand-text/5">
                    <span className="text-brand-text/20 text-[10px] uppercase tracking-widest font-sans">Before</span>
                  </div>
                  <div className="flex-1 bg-brand-bg rounded-sm flex items-center justify-center border border-brand-text/5">
                    <span className="text-brand-text/20 text-[10px] uppercase tracking-widest font-sans">After</span>
                  </div>
                </div>
                <p className="text-center text-[11px] uppercase tracking-widest text-brand-text/40 font-bold font-sans">Complete Smile Makeover — Case {item}</p>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Case Studies & Testimonials */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <FadeIn className="space-y-8">
            <h3 className="font-serif text-3xl text-brand-text">Featured Case</h3>
            <div className="bg-white p-8 rounded-sm shadow-[0_4px_40px_-10px_rgba(0,0,0,0.05)] space-y-6 border border-brand-text/5">
              <div className="w-full h-48 bg-brand-bg flex items-center justify-center rounded-sm">
                <span className="text-brand-text/20 text-[10px] uppercase tracking-widest font-sans">Case Image</span>
              </div>
              <h4 className="font-serif text-xl">Restoring Confidence</h4>
              <p className="text-brand-text/70 font-light text-sm leading-relaxed font-sans">
                A complex full-mouth restoration involving implants and ceramic veneers. The patient achieved a natural, functional, and beautiful smile in just three visits.
              </p>
              <button className="text-brand-primary text-xs uppercase tracking-widest font-bold flex items-center gap-1 hover:gap-2 transition-all font-sans">
                Read Full Case <ChevronRight size={16} />
              </button>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} className="space-y-8">
            <h3 className="font-serif text-3xl text-brand-text">Patient Stories</h3>
            <div className="space-y-8">
              {[
                { quote: "The most calming dental experience I've ever had. The results exceeded my expectations.", author: "Sarah M." },
                { quote: "Professional, elegant, and truly painless. Finan Clinic changed how I view dentistry.", author: "James L." }
              ].map((testimonial, i) => (
                <div key={i} className="space-y-4 border-l-2 border-brand-accent/50 pl-6 py-2">
                  <div className="flex gap-1 text-brand-accent">
                    {[1,2,3,4,5].map(star => <Star key={star} size={14} fill="currentColor" />)}
                  </div>
                  <p className="text-lg font-serif italic text-brand-text/80">"{testimonial.quote}"</p>
                  <p className="text-xs uppercase tracking-widest font-bold text-brand-text/40 font-sans">— {testimonial.author}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

      </div>
    </section>
  );
}

function Contact({ onBook, onStaff }: { onBook: () => void, onStaff: () => void }) {
  return (
    <section id="contact" className="bg-brand-text text-white py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
        <FadeIn className="space-y-8 flex-1">
          <h2 className="font-serif text-4xl md:text-5xl">Ready for a change?</h2>
          <p className="text-white/70 font-light max-w-md leading-relaxed font-sans">
            Schedule your private consultation today and take the first step toward your perfect smile.
          </p>
          <button 
            onClick={onBook}
            className="px-8 py-4 bg-brand-accent text-white text-xs uppercase tracking-widest font-bold rounded-sm hover:bg-brand-accent/90 transition-colors font-sans"
          >
            Request an Appointment
          </button>
        </FadeIn>

        <FadeIn delay={0.2} className="flex-1 space-y-8 md:pl-12 md:border-l border-white/10">
          <div className="space-y-6">
            <div className="flex items-start gap-4 font-sans">
              <MapPin className="text-brand-primary shrink-0 mt-1" size={20} />
              <div>
                <h4 className="font-medium mb-1 uppercase tracking-widest text-[11px] text-white/50">Location</h4>
                <p className="text-white/80 font-light text-sm leading-relaxed">
                  Abrams Building, Cameroon St, Addis Ababa
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 font-sans">
              <Phone className="text-brand-primary shrink-0 mt-1" size={20} />
              <div>
                <h4 className="font-medium mb-1 uppercase tracking-widest text-[11px] text-white/50">Phone</h4>
                <p className="text-white/80 font-light text-sm">
                  +251 94 802 3831
                </p>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-white/30 uppercase tracking-widest font-bold font-sans">
            <span className="flex items-center gap-3">
              © 2026 <img src="/logo.svg" alt="Finan Logo" className="h-4 w-auto brightness-0 invert opacity-40" /> FINAN Specialty Dental Clinic
            </span>
            <div className="flex items-center gap-6">
              <button 
                onClick={onStaff}
                className="hover:text-white transition-colors"
              >
                Staff Portal
              </button>
              <span>Designed with elegance.</span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export default function App() {
  const [view, setView] = useState<"home" | "booking" | "staff">("home");

  if (view === "booking") {
    return <BookingPage onBack={() => setView("home")} />;
  }

  if (view === "staff") {
    return <StaffPage onClose={() => setView("home")} />;
  }

  return (
    <div className="min-h-screen selection:bg-brand-primary/20 selection:text-brand-text bg-brand-bg">
      <Navbar onBook={() => setView("booking")} />
      <main>
        <Hero onBook={() => setView("booking")} />
        <About />
        <Services />
      </main>
      <Contact onBook={() => setView("booking")} onStaff={() => setView("staff")} />
    </div>
  );
}
