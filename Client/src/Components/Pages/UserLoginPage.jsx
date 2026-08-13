// src/Components/Pages/UserLoginPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, BookOpen } from 'lucide-react';

const UserLoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => { setMounted(true); }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('token', 'user-token');
    localStorage.setItem('userRole', 'user');
    navigate('/exchange');
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
          max-width: 420px;
          width: 100%;
        }

        .input-field {
          display: flex;
          align-items: center;
          background: rgba(255,251,243,0.5);
          backdrop-filter: blur(6px);
          border: 1.5px solid rgba(255,255,255,0.4);
          border-radius: 14px;
          transition: all 0.4s ease;
          height: 52px;
        }
        .input-field:focus-within {
          background: rgba(255,251,243,0.9);
          border-color: #D8472F;
          box-shadow: 0 0 0 4px rgba(216,71,47,0.08);
          transform: translateY(-2px);
        }
        .input-field .icon {
          color: #8A7F6B;
          padding-left: 16px;
          flex-shrink: 0;
        }
        .input-field:focus-within .icon { color: #D8472F; }
        .input-field input {
          background: transparent;
          width: 100%;
          padding: 0 14px;
          height: 100%;
          font-size: 15px;
          color: #1E2A42;
          outline: none;
          border: none;
          font-family: 'Work Sans', sans-serif;
        }
        .input-field input::placeholder { color: #A89B8A; }
        .input-field .toggle-btn {
          padding-right: 16px;
          flex-shrink: 0;
          color: #8A7F6B;
          background: none;
          border: none;
          cursor: pointer;
        }
        .input-field .toggle-btn:hover { color: #D8472F; }

        .seal-btn { position: relative; overflow: hidden; cursor: pointer; }
        @keyframes shimmer-sweep { 0% { transform: translateX(-120%) skewX(-15deg); } 100% { transform: translateX(220%) skewX(-15deg); } }
        .seal-btn::after { content: ""; position: absolute; top: 0; left: 0; width: 40%; height: 100%; background: linear-gradient(120deg, transparent, rgba(255,255,255,0.5), transparent); }
        .seal-btn:hover::after { animation: shimmer-sweep 0.9s ease forwards; }

        .user-badge {
          background: linear-gradient(135deg, #D8472F, #B23522);
          color: white;
          padding: 4px 14px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
        }
      `}</style>

      <img src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1600&auto=format&fit=crop" alt="Library" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#F6EFE3]/60 via-[#F6EFE3]/40 to-[#3A2A18]/50" />

      <div className={`glass-card p-8 md:p-10 transition-all duration-800 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="flex flex-col items-center text-center mb-7">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[#D8472F]/20 blur-xl animate-pulse" />
            <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#D8472F]/10 border border-[#D8472F]/30">
              <User size={22} className="text-[#D8472F]" />
            </div>
          </div>
          <span className="font-display font-semibold text-xl text-[#1E2A42] tracking-wide mt-3">RetroRead</span>
          <span className="user-badge mt-2">📖 Reader Portal</span>
        </div>

        <h2 className="font-display text-2xl font-bold text-[#1E2A42] text-center">Reader Login</h2>
        <p className="text-[#5B6478] text-sm mt-1.5 mb-7 text-center">Continue your reading journey.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="input-field">
            <Mail size={18} className="icon" />
            <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
          </div>

          <div className="input-field">
            <Lock size={18} className="icon" />
            <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required />
            <button type="button" onClick={() => setShowPassword((v) => !v)} className="toggle-btn">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button type="submit" className="seal-btn w-full py-3.5 mt-2 bg-[#D8472F] text-[#FFFBF3] rounded-full text-sm font-semibold shadow-[0_12px_28px_-10px_rgba(216,71,47,0.5)] hover:bg-[#B23522] transition flex items-center justify-center gap-2 group">
            <span>Login as Reader</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
          </button>

          <p className="text-center text-sm text-[#5B6478] pt-2">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#D8472F] font-semibold hover:underline">Register Now</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default UserLoginPage;