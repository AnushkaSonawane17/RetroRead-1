import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, BookOpen, Sparkles, ArrowRight } from 'lucide-react';

const quote = { text: "Books are a uniquely portable magic.", author: "Stephen King" };

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [focused, setFocused] = useState(null);
  const [error, setError] = useState('');

  React.useEffect(() => { setMounted(true); }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); // ✅ THIS PREVENTS PAGE REFRESH
    
    // ✅ Validate fields
    if (!formData.email.trim()) {
      setError('Please enter your email or username');
      return;
    }
    if (!formData.password.trim()) {
      setError('Please enter your password');
      return;
    }
    
    setError('');
    
    // ✅ Save to localStorage
    localStorage.setItem('token', 'dummy-token-' + Date.now());
    localStorage.setItem('userRole', 'user');
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', formData.email);
    
    console.log('✅ Login Successful!');
    console.log('📧 Email:', formData.email);
    console.log('🔑 Token:', localStorage.getItem('token'));
    
    // ✅ Navigate to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center px-4 py-10 overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Newsreader:ital,wght@1,400;1,500;1,600&family=Work+Sans:wght@400;500;600&display=swap');
        .font-display { font-family: 'Fraunces', serif; }
        .font-quote { font-family: 'Newsreader', serif; }
        .font-body { font-family: 'Work Sans', sans-serif; }

        @keyframes float-in { 0% { opacity: 0; transform: translateY(24px) scale(0.98); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
        .float-in { animation: float-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards; }

        @keyframes shimmer-sweep { 0% { transform: translateX(-120%) skewX(-15deg); } 100% { transform: translateX(220%) skewX(-15deg); } }
        .seal-btn { position: relative; overflow: hidden; cursor: pointer; }
        .seal-btn::after { content: ""; position: absolute; top: 0; left: 0; width: 40%; height: 100%; background: linear-gradient(120deg, transparent, rgba(255,255,255,0.5), transparent); transform: translateX(-120%) skewX(-15deg); transition: transform 0.6s ease; }
        .seal-btn:hover::after { animation: shimmer-sweep 0.9s ease forwards; }

        @keyframes slide-up { 0% { opacity: 0; transform: translateY(12px); } 100% { opacity: 1; transform: translateY(0); } }
        .slide-up { animation: slide-up 0.5s ease forwards; opacity: 0; }

        .input-group { margin-bottom: 20px; }
        .input-group:last-of-type { margin-bottom: 24px; }

        .input-field {
          display: flex;
          align-items: center;
          background: rgba(255,251,243,0.5);
          backdrop-filter: blur(6px);
          border: 1.5px solid rgba(255,255,255,0.4);
          border-radius: 14px;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          height: 52px;
        }
        .input-field:focus-within {
          background: rgba(255,251,243,0.9);
          border-color: #D8472F;
          box-shadow: 0 0 0 4px rgba(216,71,47,0.08), 0 8px 24px rgba(216,71,47,0.06);
          transform: translateY(-2px);
        }
        .input-field .icon {
          transition: all 0.3s ease;
          color: #8A7F6B;
          padding-left: 16px;
          flex-shrink: 0;
        }
        .input-field:focus-within .icon { color: #D8472F; transform: scale(1.1); }
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
          transition: all 0.3s ease;
          background: none;
          border: none;
          cursor: pointer;
        }
        .input-field .toggle-btn:hover { color: #D8472F; }

        .social-btn {
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          background: rgba(255,255,255,0.4);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255,255,255,0.5);
          height: 46px;
          border-radius: 14px;
        }
        .social-btn:hover {
          transform: translateY(-3px) scale(1.02);
          background: rgba(255,255,255,0.7);
          box-shadow: 0 8px 24px rgba(0,0,0,0.06);
        }
        .social-btn:active { transform: scale(0.96); }

        .glass-card {
          background: rgba(255,251,243,0.78);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.5);
          box-shadow: 0 40px 80px -30px rgba(30,42,66,0.4), inset 0 1px 0 rgba(255,255,255,0.6);
          border-radius: 32px;
          max-width: 420px;
          width: 100%;
        }

        .divider-line { flex: 1; height: 1px; background: linear-gradient(to right, transparent, rgba(217,199,163,0.4), transparent); }
        .btn-submit { height: 52px; border-radius: 14px; font-size: 15px; font-weight: 600; margin-top: 8px; }
        
        .error-message {
          background: rgba(225,112,85,0.1);
          border: 1px solid #E17055;
          color: #E17055;
          padding: 10px 14px;
          border-radius: 10px;
          font-size: 13px;
          margin-bottom: 12px;
        }
      `}</style>

      <img
        src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1600&auto=format&fit=crop"
        alt="Library shelves"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#F6EFE3]/60 via-[#F6EFE3]/40 to-[#3A2A18]/50" />

      <div className={`glass-card p-8 md:p-10 transition-all duration-800 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Logo */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[#D8472F]/20 blur-xl animate-pulse" />
            <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#D8472F]/10 border border-[#D8472F]/30">
              <BookOpen size={22} className="text-[#D8472F]" />
            </div>
          </div>
          <span className="font-display font-semibold text-xl text-[#1E2A42] tracking-wide mt-3">RetroRead</span>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#D8472F]/20 bg-white/40 px-3 py-1 text-[10px] tracking-wide text-[#5B6478] mt-2">
            <Sparkles size={11} className="text-[#D8472F]" /> A new line, every visit
          </div>
        </div>

        <h2 className="font-display text-2xl font-bold text-[#1E2A42] text-center">Welcome Back</h2>
        <p className="text-[#5B6478] text-sm mt-1.5 mb-7 text-center">Login to continue your reading journey.</p>

        <form onSubmit={handleSubmit}>
          {/* ✅ Error Message */}
          {error && (
            <div className="error-message">
              ⚠️ {error}
            </div>
          )}

          {/* Email Input */}
          <div className="form-group">
            <div className={`input-field ${focused === 'email' ? 'ring-2 ring-[#D8472F]/10' : ''}`}>
              <Mail size={18} className="icon" />
              <input
                type="text"
                placeholder="Email or username"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="form-group">
            <div className={`input-field ${focused === 'password' ? 'ring-2 ring-[#D8472F]/10' : ''}`}>
              <Lock size={18} className="icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                onFocus={() => setFocused('password')}
                onBlur={() => setFocused(null)}
                required
              />
              <button type="button" onClick={() => setShowPassword((v) => !v)} className="toggle-btn">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between text-sm px-1 mt-2 mb-6">
            <label className="flex items-center gap-2 text-[#5B6478] cursor-pointer select-none group">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 rounded border-[#D9C7A3] accent-[#D8472F] cursor-pointer transition-all duration-200"
              />
              <span className="group-hover:text-[#1E2A42] transition">Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-[#D8472F] font-medium hover:underline hover:text-[#B23522] transition">
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="seal-btn w-full btn-submit bg-[#D8472F] text-[#FFFBF3] font-semibold shadow-[0_12px_28px_-10px_rgba(216,71,47,0.5)] hover:bg-[#B23522] hover:shadow-[0_16px_32px_-12px_rgba(216,71,47,0.6)] transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <span>Login to RetroRead</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="divider-line" />
            <span className="text-xs text-[#5B6478] font-medium whitespace-nowrap">or continue with</span>
            <div className="divider-line" />
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { label: 'G', name: 'Google', color: 'text-[#EA4335]' },
              { label: 'f', name: 'Facebook', color: 'text-[#1877F2]' },
              { label: '', name: 'Apple', color: 'text-[#1E2A42]' },
            ].map((s) => (
              <button
                key={s.name}
                type="button"
                className={`social-btn flex items-center justify-center text-[#1E2A42] font-display font-semibold text-lg ${s.color}`}
                aria-label={`Continue with ${s.name}`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Register Link */}
          <p className="text-center text-sm text-[#5B6478]">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#D8472F] font-semibold hover:underline hover:text-[#B23522] transition">
              Register Now
            </Link>
          </p>
        </form>

        <p className="font-quote italic text-center text-sm text-[#5B6478]/60 mt-6 leading-relaxed">
          "{quote.text}" <span className="not-italic text-xs text-[#8A7F6B]">— {quote.author}</span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;