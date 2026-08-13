// src/Components/Pages/SellerSignupPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, Mail, Lock, User, Building2, MapPin, Phone, ArrowRight, CheckCircle, Eye, EyeOff } from 'lucide-react';

const SellerSignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    storeName: '', email: '', password: '', confirmPassword: '',
    address: '', city: '', state: '', pincode: '', phone: '', gst: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => { setMounted(true); }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('token', 'seller-token');
    localStorage.setItem('userRole', 'seller');
    navigate('/sell-book');
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center px-4 py-10 overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Work+Sans:wght@400;500;600&display=swap');
        .font-display { font-family: 'Fraunces', serif; }
        .font-body { font-family: 'Work Sans', sans-serif; }

        .glass-card {
          background: rgba(255,251,243,0.78);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.5);
          box-shadow: 0 40px 80px -30px rgba(30,42,66,0.4);
          border-radius: 32px;
          max-width: 460px;
          width: 100%;
        }

        .input-field {
          display: flex;
          align-items: center;
          background: rgba(255,251,243,0.5);
          backdrop-filter: blur(6px);
          border: 1.5px solid rgba(255,255,255,0.4);
          border-radius: 12px;
          transition: all 0.4s ease;
          height: 46px;
        }
        .input-field:focus-within {
          background: rgba(255,251,243,0.9);
          border-color: #6B4C82;
          box-shadow: 0 0 0 4px rgba(107,76,130,0.08);
          transform: translateY(-2px);
        }
        .input-field .icon { color: #8A7F6B; padding-left: 12px; flex-shrink: 0; }
        .input-field:focus-within .icon { color: #6B4C82; }
        .input-field input {
          background: transparent;
          width: 100%;
          padding: 0 12px;
          height: 100%;
          font-size: 14px;
          color: #1E2A42;
          outline: none;
          border: none;
          font-family: 'Work Sans', sans-serif;
        }
        .input-field input::placeholder { color: #A89B8A; }

        .seal-btn { position: relative; overflow: hidden; cursor: pointer; }
        @keyframes shimmer-sweep { 0% { transform: translateX(-120%) skewX(-15deg); } 100% { transform: translateX(220%) skewX(-15deg); } }
        .seal-btn::after { content: ""; position: absolute; top: 0; left: 0; width: 40%; height: 100%; background: linear-gradient(120deg, transparent, rgba(255,255,255,0.5), transparent); }
        .seal-btn:hover::after { animation: shimmer-sweep 0.9s ease forwards; }

        .seller-badge {
          background: linear-gradient(135deg, #6B4C82, #573C6B);
          color: white;
          padding: 3px 12px;
          border-radius: 16px;
          font-size: 10px;
          font-weight: 600;
        }
      `}</style>

      <img src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1600&auto=format&fit=crop" alt="Library" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#F6EFE3]/60 via-[#F6EFE3]/40 to-[#3A2A18]/50" />

      <div className={`glass-card p-6 md:p-8 transition-all duration-800 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="flex flex-col items-center text-center mb-5">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[#6B4C82]/20 blur-xl animate-pulse" />
            <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#6B4C82]/10 border border-[#6B4C82]/30">
              <Store size={20} className="text-[#6B4C82]" />
            </div>
          </div>
          <span className="font-display font-semibold text-lg text-[#1E2A42] tracking-wide mt-2">RetroRead</span>
          <span className="seller-badge mt-1">🔑 Seller Registration</span>
        </div>

        <h2 className="font-display text-xl font-bold text-[#1E2A42] text-center">Become a Seller</h2>
        <p className="text-[#5B6478] text-xs mt-1 mb-4 text-center">Set up your bookstore on RetroRead.</p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="input-field">
              <Store size={15} className="icon" />
              <input type="text" placeholder="Store Name" value={formData.storeName} onChange={(e) => setFormData({...formData, storeName: e.target.value})} required />
            </div>
            <div className="input-field">
              <Mail size={15} className="icon" />
              <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="input-field">
              <Lock size={15} className="icon" />
              <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required />
            </div>
            <div className="input-field">
              <Lock size={15} className="icon" />
              <input type="password" placeholder="Confirm" value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} required />
              {formData.confirmPassword && formData.confirmPassword === formData.password && <CheckCircle size={14} className="text-[#00B894] pr-3" />}
            </div>
          </div>

          <div className="input-field">
            <Building2 size={15} className="icon" />
            <input type="text" placeholder="Store Address" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} required />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="input-field"><MapPin size={15} className="icon" /><input type="text" placeholder="City" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} required /></div>
            <div className="input-field"><input type="text" placeholder="State" value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})} required /></div>
            <div className="input-field"><input type="text" placeholder="Pincode" value={formData.pincode} onChange={(e) => setFormData({...formData, pincode: e.target.value})} required /></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="input-field"><Phone size={15} className="icon" /><input type="tel" placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required /></div>
            <div className="input-field"><input type="text" placeholder="GST (Optional)" value={formData.gst} onChange={(e) => setFormData({...formData, gst: e.target.value})} /></div>
          </div>

          <div className="flex items-start gap-2 text-xs text-[#5B6478] cursor-pointer select-none group">
            <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} required className="h-3.5 w-3.5 mt-0.5 rounded border-[#D9C7A3] accent-[#6B4C82] cursor-pointer" />
            <span className="group-hover:text-[#1E2A42] transition">I agree to the <span className="text-[#6B4C82] font-medium hover:underline">Seller Terms</span></span>
          </div>

          <button type="submit" className="seal-btn w-full py-3 mt-1 bg-[#6B4C82] text-[#FFFBF3] rounded-full text-sm font-semibold shadow-[0_12px_28px_-10px_rgba(107,76,130,0.5)] hover:bg-[#573C6B] transition flex items-center justify-center gap-2 group">
            <span>Start Selling</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 transition" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SellerSignupPage;