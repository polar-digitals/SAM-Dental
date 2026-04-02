import { motion, AnimatePresence } from "motion/react";
import {
  X, Phone, Calendar, Clock, User, Mail, MessageSquare, CheckCircle,
  ChevronRight, AlertCircle, RefreshCw
} from "lucide-react";
import { useState } from "react";
import { supabase } from "./StaffPortal";

// ─── TYPES ───────────────────────────────────────────────────────────────────
export interface Appointment {
  id?: string;
  created_at?: string;
  service: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
  status?: "pending" | "confirmed" | "cancelled";
}

// ─── BOOKING NAV ─────────────────────────────────────────────────────────────
export const BookingNav = ({ onBack, title = "FINAN" }: { onBack: () => void; title?: string }) => (
  <nav className="w-full py-5 px-6 md:px-12 flex justify-between items-center border-b border-brand-primary/10 bg-brand-bg">
    <div className="flex items-center gap-2">
      <img src="/logo.svg" alt="FINAN Logo" className="h-10 w-auto object-contain" />
      <span className="font-serif text-3xl font-semibold tracking-tight uppercase leading-none text-brand-text">{title}</span>
    </div>
    <button onClick={onBack} className="flex items-center gap-2 text-xs uppercase tracking-widest text-brand-text/50 hover:text-brand-text transition-colors">
      <X className="w-4 h-4" /> Close
    </button>
  </nav>
);

// ─── BOOKING PAGE ─────────────────────────────────────────────────────────────
export const BookingPage = ({ onBack }: { onBack: () => void }) => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [form, setForm] = useState<Appointment>({
    service: "", date: "", time: "", name: "", phone: "", email: "", notes: "", status: "pending"
  });

  const services = ["Cosmetic Dentistry", "Dental Implants", "Orthodontics", "General Care",
    "Teeth Whitening", "Root Canal", "Dental Cleaning", "Emergency Care"];
  const times = ["8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM"];

  const handleSubmit = async () => {
    setSaving(true);
    setSaveError("");

    const newAppointment = {
      service: form.service,
      date: form.date,
      time: form.time,
      name: form.name,
      phone: form.phone,
      email: form.email,
      notes: form.notes,
      status: "pending" as const,
    };

    try {
      const { error } = await supabase.from("appointments").insert(newAppointment);

      if (error) {
         setSaveError(`Database Error: ${error.message}`);
         // Fallback to local storage for safety
         const localData = JSON.parse(localStorage.getItem('localAppointments') || '[]');
         localStorage.setItem('localAppointments', JSON.stringify([newAppointment, ...localData]));
      } else {
        setSubmitted(true);
      }
    } catch (e) {
      setSaveError("Connection failed. Saved to local storage.");
      const localData = JSON.parse(localStorage.getItem('localAppointments') || '[]');
      localStorage.setItem('localAppointments', JSON.stringify([newAppointment, ...localData]));
      setSubmitted(true);
    } finally {
      setSaving(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-brand-bg flex flex-col">
        <BookingNav onBack={onBack} />
        <div className="flex-1 flex items-center justify-center px-6 py-24">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="text-center max-w-lg">
            <div className="w-24 h-24 rounded-full bg-brand-accent/20 flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-12 h-12 text-brand-accent" />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-4">Appointment Confirmed!</h2>
            <p className="text-brand-text/60 text-lg leading-relaxed mb-2">Thank you, <strong>{form.name}</strong>. Your appointment for</p>
            <p className="text-brand-primary font-serif text-2xl mb-2">{form.service}</p>
            <p className="text-brand-text/60 mb-4">on <strong>{form.date}</strong> at <strong>{form.time}</strong> has been booked.</p>
            {saveError && <p className="text-xs text-brand-text/40 mb-4 italic">{saveError}</p>}
            <p className="text-brand-text/50 text-sm mb-10">We look forward to seeing you at FINAN Specialty Dental Clinic!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => { setSubmitted(false); setStep(1); setForm({ service: "", date: "", time: "", name: "", phone: "", email: "", notes: "", status: "pending" }); }} className="px-8 py-4 border border-brand-primary/20 hover:border-brand-primary transition-colors uppercase tracking-widest text-xs font-bold">Book Another</button>
              <button onClick={onBack} className="px-8 py-4 bg-brand-primary text-white hover:bg-brand-accent transition-all duration-300 uppercase tracking-widest text-xs font-bold">Back to Home</button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col">
      <BookingNav onBack={onBack} />
      <div className="w-full h-1 bg-brand-primary/10">
        <motion.div className="h-full bg-brand-accent" initial={{ width: "0%" }} animate={{ width: step === 1 ? "33%" : step === 2 ? "66%" : "100%" }} transition={{ duration: 0.4 }} />
      </div>
      <div className="flex-1 max-w-4xl mx-auto w-full px-6 md:px-12 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <span className="text-brand-accent uppercase tracking-[0.3em] text-xs font-semibold">Step {step} of 3</span>
          <h1 className="text-4xl md:text-6xl font-serif font-light mt-3 text-brand-text">
            {step === 1 && "Choose a Service."}{step === 2 && "Pick Your Time."}{step === 3 && "Your Details."}
          </h1>
        </motion.div>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
                {services.map((s) => (
                  <button key={s} onClick={() => setForm({ ...form, service: s })} className={`p-5 text-left border rounded-sm transition-all duration-300 ${form.service === s ? "bg-brand-primary text-white border-brand-primary" : "bg-brand-bg border-brand-text/10 hover:border-brand-primary/40 text-brand-text"}`}>
                    <span className="text-sm font-medium leading-tight">{s}</span>
                  </button>
                ))}
              </div>
              <button disabled={!form.service} onClick={() => setStep(2)} className="px-10 py-4 bg-brand-primary text-white hover:bg-brand-accent transition-all duration-300 uppercase tracking-widest text-xs font-bold disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2">
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }}>
              <div className="grid md:grid-cols-2 gap-10 mb-10">
                <div>
                  <label className="flex items-center gap-2 text-xs uppercase tracking-widest text-brand-text/50 mb-3"><Calendar className="w-4 h-4 text-brand-accent" /> Select Date</label>
                  <input type="date" min={new Date().toISOString().split("T")[0]} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full border border-brand-text/10 bg-transparent px-4 py-4 text-brand-text focus:border-brand-primary outline-none transition-colors font-sans text-sm rounded-sm" />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-xs uppercase tracking-widest text-brand-text/50 mb-3"><Clock className="w-4 h-4 text-brand-accent" /> Select Time</label>
                  <div className="grid grid-cols-3 gap-2">
                    {times.map((t) => (
                      <button key={t} onClick={() => setForm({ ...form, time: t })} className={`py-2 text-xs border rounded-sm transition-all duration-200 ${form.time === t ? "bg-brand-primary text-white border-brand-primary" : "border-brand-text/10 hover:border-brand-primary/40 text-brand-text"}`}>{t}</button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <button onClick={() => setStep(1)} className="px-8 py-4 border border-brand-text/10 hover:border-brand-primary transition-colors text-brand-text uppercase tracking-widest text-xs font-bold rounded-sm">Back</button>
                <button disabled={!form.date || !form.time} onClick={() => setStep(3)} className="px-10 py-4 bg-brand-primary text-white hover:bg-brand-accent transition-all duration-300 uppercase tracking-widest text-xs font-bold disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2 rounded-sm">Continue <ChevronRight className="w-4 h-4" /></button>
              </div>
            </motion.div>
          )}
          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }}>
              <div className="bg-brand-primary/5 border border-brand-primary/10 p-6 mb-8 flex flex-wrap gap-6 rounded-sm">
                <div><p className="text-[10px] uppercase tracking-widest text-brand-text/40">Service</p><p className="font-serif text-lg mt-1 text-brand-text">{form.service}</p></div>
                <div><p className="text-[10px] uppercase tracking-widest text-brand-text/40">Date</p><p className="font-serif text-lg mt-1 text-brand-text">{form.date}</p></div>
                <div><p className="text-[10px] uppercase tracking-widest text-brand-text/40">Time</p><p className="font-serif text-lg mt-1 text-brand-text">{form.time}</p></div>
              </div>
              <div className="grid md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="flex items-center gap-2 text-xs uppercase tracking-widest text-brand-text/50 mb-2"><User className="w-3.5 h-3.5 text-brand-accent" /> Full Name *</label>
                  <input type="text" placeholder="Your full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-brand-text/10 bg-transparent px-4 py-3.5 text-brand-text focus:border-brand-primary outline-none transition-colors text-sm rounded-sm" />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-xs uppercase tracking-widest text-brand-text/50 mb-2"><Phone className="w-3.5 h-3.5 text-brand-accent" /> Phone Number *</label>
                  <input type="tel" placeholder="+251 9XX XXX XXX" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full border border-brand-text/10 bg-transparent px-4 py-3.5 text-brand-text focus:border-brand-primary outline-none transition-colors text-sm rounded-sm" />
                </div>
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 text-xs uppercase tracking-widest text-brand-text/50 mb-2"><Mail className="w-3.5 h-3.5 text-brand-accent" /> Email Address *</label>
                  <input type="email" placeholder="your@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border border-brand-text/10 bg-transparent px-4 py-3.5 text-brand-text focus:border-brand-primary outline-none transition-colors text-sm rounded-sm" />
                </div>
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 text-xs uppercase tracking-widest text-brand-text/50 mb-2"><MessageSquare className="w-3.5 h-3.5 text-brand-accent" /> Additional Notes</label>
                  <textarea placeholder="Any special concerns or questions..." rows={4} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="w-full border border-brand-text/10 bg-transparent px-4 py-3.5 text-brand-text focus:border-brand-primary outline-none transition-colors text-sm resize-none rounded-sm" />
                </div>
              </div>
              {saveError && (
                <div className="flex items-center gap-2 text-amber-600 text-sm mb-4 p-3 bg-amber-50 border border-amber-200">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />{saveError}
                </div>
              )}
              <div className="flex gap-4">
                <button onClick={() => setStep(2)} className="px-8 py-4 border border-brand-text/10 hover:border-brand-primary text-brand-text transition-colors uppercase tracking-widest text-xs font-bold rounded-sm">Back</button>
                <button disabled={!form.name || !form.phone || !form.email || saving} onClick={handleSubmit} className="px-10 py-4 bg-brand-primary text-white hover:bg-brand-accent transition-all duration-300 uppercase tracking-widest text-xs font-bold disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2 rounded-sm">
                  {saving ? <><RefreshCw className="w-4 h-4 animate-spin" /> Saving...</> : <><CheckCircle className="w-4 h-4" /> Confirm Booking</>}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
