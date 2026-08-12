import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, AtSign, Eye, EyeOff, BookOpen, Sparkles, ArrowRight, CheckCircle, Store } from 'lucide-react';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', username: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [focused, setFocused] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [userType, setUserType] = useState('reader');

  React.useEffect(() => { setMounted(true); }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save user data
    localStorage.setItem('userType', userType);
    localStorage.setItem('userEmail', formData.email);
    localStorage.setItem('userName', formData.name);
    localStorage.setItem('isAuthenticated', 'true');
    
    // Navigate to login page
    navigate('/login');
  };

  const checkPasswordStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 8) strength++;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) strength++;
    if (/\d/.test(pass)) strength++;
    if (/[^a-zA-Z0-9]/.test(pass)) strength++;
    setPasswordStrength(strength);
  };

  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['#E17055', '#FDCB6E', '#00B894', '#0984E3'];
  const strengthWidths = ['25%', '50%', '75%', '100%'];

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

        .input-group { margin-bottom: 18px; }

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
        .input-field .check-icon { padding-right: 16px; flex-shrink: 0; color: #00B894; }

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

        .glass-card {
          background: rgba(255,251,243,0.78);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.5);
          box-shadow: 0 40px 80px -30px rgba(30,42,66,0.4), inset 0 1px 0 rgba(255,255,255,0.6);
          border-radius: 32px;
          max-width: 420px;
          width: 100%;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(217,199,163,0.4), transparent);
        }

        .btn-submit {
          height: 52px;
          border-radius: 14px;
          font-size: 15px;
          font-weight: 600;
          margin-top: 4px;
        }

        .strength-bar {
          height: 3px;
          border-radius: 4px;
          background: #EDE2CE;
          overflow: hidden;
          transition: all 0.3s ease;
          margin-top: 6px;
        }
        .strength-bar .fill {
          height: 100%;
          border-radius: 4px;
          transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .role-selector {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 20px;
        }
        .role-option {
          padding: 14px 10px;
          border-radius: 14px;
          border: 2px solid rgba(255,255,255,0.3);
          background: rgba(255,255,255,0.15);
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .role-option:hover { transform: translateY(-2px); }
        .role-option.active {
          border-color: #D8472F;
          background: rgba(216,71,47,0.08);
          box-shadow: 0 4px 16px rgba(216,71,47,0.1);
        }
        .role-option.seller.active {
          border-color: #6B4C82;
          background: rgba(107,76,130,0.08);
          box-shadow: 0 4px 16px rgba(107,76,130,0.1);
        }
        .role-option .role-icon { font-size: 28px; display: block; margin-bottom: 4px; }
        .role-option .role-label { font-size: 14px; font-weight: 600; color: #1E2A42; }
        .role-option .role-desc { font-size: 10px; color: #8A7F6B; }
      `}</style>

      <img
        src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1600&auto=format&fit=crop"
        alt="Library shelves"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#F6EFE3]/60 via-[#F6EFE3]/40 to-[#3A2A18]/50" />

      <div className={`glass-card p-8 md:p-10 transition-all duration-800 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Logo */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[#D8472F]/20 blur-xl animate-pulse" />
            <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#D8472F]/10 border border-[#D8472F]/30">
              <BookOpen size={22} className="text-[#D8472F]" />
            </div>
          </div>
          <span className="font-display font-semibold text-xl text-[#1E2A42] tracking-wide mt-3">RetroRead</span>
        </div>

        <h2 className="font-display text-2xl font-bold text-[#1E2A42] text-center">Create Account</h2>
        <p className="text-[#5B6478] text-sm mt-1.5 mb-6 text-center">Choose your role and start your journey.</p>

        {/* Role Selector */}
        <div className="role-selector">
          <div
            className={`role-option ${userType === 'reader' ? 'active' : ''}`}
            onClick={() => setUserType('reader')}
          >
            <span className="role-icon">📖</span>
            <span className="role-label">Reader</span>
            <span className="role-desc">Read &amp; Exchange Books</span>
          </div>
          <div
            className={`role-option seller ${userType === 'seller' ? 'active' : ''}`}
            onClick={() => setUserType('seller')}
          >
            <span className="role-icon">🏪</span>
            <span className="role-label">Seller</span>
            <span className="role-desc">Sell Your Books</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="input-group">
            <div className={`input-field ${focused === 'name' ? 'ring-2 ring-[#D8472F]/10' : ''}`}>
              <User size={18} className="icon" />
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                onFocus={() => setFocused('name')}
                onBlur={() => setFocused(null)}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="input-group">
            <div className={`input-field ${focused === 'email' ? 'ring-2 ring-[#D8472F]/10' : ''}`}>
              <Mail size={18} className="icon" />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
                required
              />
            </div>
          </div>

          {/* Username */}
          <div className="input-group">
            <div className={`input-field ${focused === 'username' ? 'ring-2 ring-[#D8472F]/10' : ''}`}>
              <AtSign size={18} className="icon" />
              <input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                onFocus={() => setFocused('username')}
                onBlur={() => setFocused(null)}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="input-group">
            <div className={`input-field ${focused === 'password' ? 'ring-2 ring-[#D8472F]/10' : ''}`}>
              <Lock size={18} className="icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  checkPasswordStrength(e.target.value);
                }}
                onFocus={() => setFocused('password')}
                onBlur={() => setFocused(null)}
                required
              />
              <button type="button" onClick={() => setShowPassword((v) => !v)} className="toggle-btn">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {formData.password.length > 0 && (
              <div className="slide-up">
                <div className="strength-bar">
                  <div className="fill" style={{ width: strengthWidths[passwordStrength] || '0%', backgroundColor: strengthColors[passwordStrength] || '#EDE2CE' }} />
                </div>
                <div className="flex justify-between text-[10px] mt-1">
                  <span className="text-[#8A7F6B]">Strength:</span>
                  <span style={{ color: strengthColors[passwordStrength] || '#8A7F6B' }} className="font-medium">
                    {strengthLabels[passwordStrength] || 'Weak'}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="input-group">
            <div className={`input-field ${focused === 'confirmPassword' ? 'ring-2 ring-[#D8472F]/10' : ''}`}>
              <Lock size={18} className="icon" />
              <input
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                onFocus={() => setFocused('confirmPassword')}
                onBlur={() => setFocused(null)}
                required
              />
              {formData.confirmPassword && formData.confirmPassword === formData.password && (
                <CheckCircle size={18} className="check-icon" />
              )}
            </div>
          </div>

          {/* Terms */}
          <div className="mb-6 mt-2">
            <label className="flex items-start gap-2.5 text-sm text-[#5B6478] cursor-pointer select-none group">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                required
                className="h-4 w-4 mt-0.5 rounded border-[#D9C7A3] accent-[#D8472F] cursor-pointer transition-all duration-200"
              />
              <span className="group-hover:text-[#1E2A42] transition leading-relaxed">
                I agree to the <span className="text-[#D8472F] font-medium hover:underline">Terms of Service</span> and <span className="text-[#D8472F] font-medium hover:underline">Privacy Policy</span>
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="seal-btn w-full btn-submit bg-[#D8472F] text-[#FFFBF3] font-semibold shadow-[0_12px_28px_-10px_rgba(216,71,47,0.5)] hover:bg-[#B23522] hover:shadow-[0_16px_32px_-12px_rgba(216,71,47,0.6)] transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <span>{userType === 'seller' ? 'Continue as Seller' : 'Create Account'}</span>
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

          {/* Login Link */}
          <p className="text-center text-sm text-[#5B6478]">
            Already have an account?{' '}
            <Link to="/login" className="text-[#D8472F] font-semibold hover:underline hover:text-[#B23522] transition">
              Login Now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;