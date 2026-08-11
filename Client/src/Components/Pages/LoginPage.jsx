// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Mail, Lock, Eye, EyeOff, BookOpen } from 'lucide-react';

// const quote = { text: "A reader lives a thousand lives before he dies.", author: "George R. R. Martin" };

// function ReadingBook() {
//   return (
//     <div className="relative w-36 h-24 mx-auto" style={{ perspective: '1000px' }}>
//       <div className="absolute inset-0 flex rounded-md overflow-hidden shadow-[0_10px_24px_-8px_rgba(0,0,0,0.4)]">
//         <div className="w-1/2 bg-[#FFFBF3] border-r border-[#1E2A42]/10 p-2.5 space-y-1.5">
//           {[0, 1, 2, 3].map((i) => (
//             <div key={i} className="h-1 rounded bg-[#1E2A42]/10" style={{ width: `${74 - i * 12}%` }} />
//           ))}
//         </div>
//         <div className="w-1/2 bg-[#FFFBF3] p-2.5 space-y-1.5">
//           {[0, 1, 2, 3].map((i) => (
//             <div key={i} className="h-1 rounded bg-[#1E2A42]/10" style={{ width: `${62 - i * 9}%` }} />
//           ))}
//         </div>
//       </div>
//       <div className="absolute left-1/2 top-0 bottom-0 w-3 -translate-x-1/2 bg-gradient-to-r from-transparent via-black/15 to-transparent" />
//       {[0, 1, 2].map((i) => (
//         <div
//           key={i}
//           className="book-page"
//           style={{ animation: `page-flip 3.6s ease-in-out ${i * 1.2}s infinite`, zIndex: 3 - i }}
//         />
//       ))}
//     </div>
//   );
// }

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [showPassword, setShowPassword] = useState(false);
//   const [mounted, setMounted] = useState(false);

//   React.useEffect(() => { setMounted(true); }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     navigate('/dashboard');
//   };

//   const [sparkles] = useState(() =>
//     Array.from({ length: 12 }, (_, i) => ({
//       id: i, left: Math.random() * 100, top: Math.random() * 100,
//       size: 2 + Math.random() * 3, duration: 6 + Math.random() * 8, delay: Math.random() * 6,
//     }))
//   );

//   return (
//     <div className="min-h-screen w-full bg-[#F6EFE3] flex items-center justify-center px-4 py-12">
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Newsreader:ital,wght@1,500;1,600&family=Work+Sans:wght@400;500;600&display=swap');
//         .font-display { font-family: 'Fraunces', serif; }
//         .font-quote { font-family: 'Newsreader', serif; }
//         .font-body { font-family: 'Work Sans', sans-serif; }

//         @keyframes twinkle {
//           0%, 100% { opacity: 0; transform: translateY(0) scale(0.6); }
//           50% { opacity: 1; transform: translateY(-12px) scale(1); }
//         }
//         .sparkle {
//           position: absolute; border-radius: 9999px;
//           background: radial-gradient(circle, #C9A567 0%, rgba(201,165,103,0) 70%);
//           animation: twinkle ease-in-out infinite;
//         }

//         @keyframes glow-pulse {
//           0%, 100% { opacity: 0.3; transform: scale(1); }
//           50% { opacity: 0.55; transform: scale(1.1); }
//         }
//         .glow-pulse { animation: glow-pulse 3.2s ease-in-out infinite; }

//         .book-page {
//           position: absolute; top: 0; right: 0; width: 50%; height: 100%;
//           background: #FFFBF3; border-left: 1px solid rgba(30,42,66,0.12);
//           transform-origin: left center; backface-visibility: hidden;
//           border-radius: 0 6px 6px 0;
//         }
//         @keyframes page-flip {
//           0% { transform: rotateY(0deg); }
//           50% { transform: rotateY(-172deg); }
//           100% { transform: rotateY(0deg); }
//         }

//         .field-underline {
//           position: absolute; bottom: -1px; left: 50%; height: 2px; width: 0%;
//           background: #D8472F; transition: all 0.3s ease; transform: translateX(-50%);
//         }
//         .field-wrap:focus-within .field-underline { width: 100%; }

//         .seal-btn { position: relative; overflow: hidden; }
//         @keyframes shimmer-sweep {
//           0% { transform: translateX(-120%) skewX(-15deg); }
//           100% { transform: translateX(220%) skewX(-15deg); }
//         }
//         .seal-btn::after {
//           content: ""; position: absolute; top: 0; left: 0; width: 40%; height: 100%;
//           background: linear-gradient(120deg, transparent, rgba(255,255,255,0.5), transparent);
//           transform: translateX(-120%) skewX(-15deg);
//         }
//         .seal-btn:hover::after { animation: shimmer-sweep 0.9s ease forwards; }
//       `}</style>

//       <div
//         className={`w-full max-w-4xl grid md:grid-cols-2 rounded-[1.75rem] overflow-hidden border border-[#E2D5BC] shadow-[0_20px_50px_-25px_rgba(30,42,66,0.4)] transition-all duration-700 ${
//           mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
//         }`}
//       >
//         {/* LEFT — storybook panel */}
//         <div className="hidden md:flex relative flex-col justify-between bg-[#1E2A42] text-[#F6EFE3] p-10 overflow-hidden">
//           <div className="pointer-events-none absolute inset-0">
//             {sparkles.map((s) => (
//               <span
//                 key={s.id}
//                 className="sparkle"
//                 style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, animationDuration: `${s.duration}s`, animationDelay: `${s.delay}s` }}
//               />
//             ))}
//           </div>

//           <div className="relative flex items-center gap-2">
//             <BookOpen size={20} className="text-[#C9A567]" />
//             <span className="font-display font-semibold tracking-wide">PageTurner</span>
//           </div>

//           <div className="relative flex flex-col items-center text-center py-6">
//             <div className="relative mb-7">
//               <div className="absolute inset-0 rounded-full bg-[#C9A567]/25 blur-2xl glow-pulse" />
//               <div className="relative"><ReadingBook /></div>
//             </div>
//             <p className="font-quote italic text-2xl leading-snug text-[#F6EFE3]/90">"{quote.text}"</p>
//             <p className="font-body text-xs tracking-[0.15em] uppercase text-[#C9A567]/80 mt-3">— {quote.author}</p>
//           </div>

//           <p className="relative font-body text-xs text-[#B9C9AE]">Your shelf missed you.</p>
//         </div>

//         {/* RIGHT — form */}
//         <div className="bg-[#FFFBF3] p-8 md:p-10 flex flex-col justify-center">
//           <div className="mb-7">
//             <div className="flex items-center gap-2 mb-2 md:hidden">
//               <BookOpen size={16} className="text-[#D8472F]" />
//               <span className="font-display font-semibold text-[#1E2A42]">PageTurner</span>
//             </div>
//             <h2 className="font-display text-2xl font-bold text-[#1E2A42]">Welcome back</h2>
//             <p className="text-[#8A7F6B] text-sm mt-1">Login to continue reading</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div className="field-wrap relative">
//               <label className="block text-xs font-medium text-[#5B6478] mb-1.5">Email Address</label>
//               <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-[#F6EFE3] rounded-lg border border-[#E2D5BC]">
//                 <Mail size={15} className="text-[#8A7F6B] shrink-0" />
//                 <input
//                   type="email"
//                   placeholder="you@example.com"
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                   required
//                   className="flex-1 min-w-0 bg-transparent text-sm text-[#1E2A42] placeholder:text-[#8A7F6B] focus:outline-none"
//                 />
//               </div>
//               <span className="field-underline" />
//             </div>

//             <div className="field-wrap relative">
//               <label className="block text-xs font-medium text-[#5B6478] mb-1.5">Password</label>
//               <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-[#F6EFE3] rounded-lg border border-[#E2D5BC]">
//                 <Lock size={15} className="text-[#8A7F6B] shrink-0" />
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   placeholder="Enter your password"
//                   value={formData.password}
//                   onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                   required
//                   className="flex-1 min-w-0 bg-transparent text-sm text-[#1E2A42] placeholder:text-[#8A7F6B] focus:outline-none"
//                 />
//                 <button type="button" onClick={() => setShowPassword((v) => !v)} className="text-[#8A7F6B] hover:text-[#1E2A42] transition shrink-0">
//                   {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
//                 </button>
//               </div>
//               <span className="field-underline" />
//             </div>

//             <button
//               type="submit"
//               className="seal-btn w-full py-3 bg-[#D8472F] text-[#FFFBF3] rounded-full text-sm font-semibold shadow-[0_10px_20px_-10px_rgba(216,71,47,0.55)] hover:bg-[#B23522] transition"
//             >
//               Login
//             </button>

//             <p className="text-center text-sm text-[#8A7F6B]">
//               Don't have an account?{' '}
//               <Link to="/register" className="text-[#D8472F] font-semibold hover:underline">
//                 Sign Up
//               </Link>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Mail, Lock, Eye, EyeOff, BookOpen, AlertCircle, Loader2 } from 'lucide-react';

// const quote = { text: "A reader lives a thousand lives before he dies.", author: "George R. R. Martin" };

// function ReadingBook() {
//   return (
//     <div className="relative w-36 h-24 mx-auto" style={{ perspective: '1000px' }}>
//       <div className="absolute inset-0 flex rounded-md overflow-hidden shadow-[0_10px_24px_-8px_rgba(0,0,0,0.4)]">
//         <div className="w-1/2 bg-[#FFFBF3] border-r border-[#1E2A42]/10 p-2.5 space-y-1.5">
//           {[0, 1, 2, 3].map((i) => (
//             <div key={i} className="h-1 rounded bg-[#1E2A42]/10" style={{ width: `${74 - i * 12}%` }} />
//           ))}
//         </div>
//         <div className="w-1/2 bg-[#FFFBF3] p-2.5 space-y-1.5">
//           {[0, 1, 2, 3].map((i) => (
//             <div key={i} className="h-1 rounded bg-[#1E2A42]/10" style={{ width: `${62 - i * 9}%` }} />
//           ))}
//         </div>
//       </div>
//       <div className="absolute left-1/2 top-0 bottom-0 w-3 -translate-x-1/2 bg-gradient-to-r from-transparent via-black/15 to-transparent" />
//       {[0, 1, 2].map((i) => (
//         <div key={i} className="book-page" style={{ animation: `page-flip 3.6s ease-in-out ${i * 1.2}s infinite`, zIndex: 3 - i }} />
//       ))}
//     </div>
//   );
// }

// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});
//   const [showPassword, setShowPassword] = useState(false);
//   const [mounted, setMounted] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const [shake, setShake] = useState(false);

//   React.useEffect(() => { setMounted(true); }, []);

//   function validate(data) {
//     const e = {};
//     if (!data.email) e.email = 'Email is required';
//     else if (!emailRegex.test(data.email)) e.email = 'Enter a valid email address';
//     if (!data.password) e.password = 'Password is required';
//     else if (data.password.length < 6) e.password = 'Must be at least 6 characters';
//     return e;
//   }

//   function handleChange(key, value) {
//     const next = { ...formData, [key]: value };
//     setFormData(next);
//     if (touched[key]) setErrors(validate(next));
//   }

//   function handleBlur(key) {
//     setTouched((t) => ({ ...t, [key]: true }));
//     setErrors(validate(formData));
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const validationErrors = validate(formData);
//     setErrors(validationErrors);
//     setTouched({ email: true, password: true });

//     if (Object.keys(validationErrors).length > 0) {
//       setShake(true);
//       setTimeout(() => setShake(false), 500);
//       return;
//     }

//     setSubmitting(true);
//     setTimeout(() => navigate('/dashboard'), 900);
//   };

//   const [sparkles] = useState(() =>
//     Array.from({ length: 12 }, (_, i) => ({
//       id: i, left: Math.random() * 100, top: Math.random() * 100,
//       size: 2 + Math.random() * 3, duration: 6 + Math.random() * 8, delay: Math.random() * 6,
//     }))
//   );

//   return (
//     <div className="min-h-screen w-full bg-[#F6EFE3] flex items-center justify-center px-4 py-12">
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Newsreader:ital,wght@1,500;1,600&family=Work+Sans:wght@400;500;600&display=swap');
//         .font-display { font-family: 'Fraunces', serif; }
//         .font-quote { font-family: 'Newsreader', serif; }
//         .font-body { font-family: 'Work Sans', sans-serif; }

//         @keyframes twinkle {
//           0%, 100% { opacity: 0; transform: translateY(0) scale(0.6); }
//           50% { opacity: 1; transform: translateY(-12px) scale(1); }
//         }
//         .sparkle { position: absolute; border-radius: 9999px; background: radial-gradient(circle, #C9A567 0%, rgba(201,165,103,0) 70%); animation: twinkle ease-in-out infinite; }

//         @keyframes glow-pulse { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 0.55; transform: scale(1.1); } }
//         .glow-pulse { animation: glow-pulse 3.2s ease-in-out infinite; }

//         .book-page { position: absolute; top: 0; right: 0; width: 50%; height: 100%; background: #FFFBF3; border-left: 1px solid rgba(30,42,66,0.12); transform-origin: left center; backface-visibility: hidden; border-radius: 0 6px 6px 0; }
//         @keyframes page-flip { 0% { transform: rotateY(0deg); } 50% { transform: rotateY(-172deg); } 100% { transform: rotateY(0deg); } }

//         .field-underline { position: absolute; bottom: -1px; left: 50%; height: 2px; width: 0%; background: #D8472F; transition: all 0.3s ease; transform: translateX(-50%); }
//         .field-wrap:focus-within .field-underline { width: 100%; }

//         .field-fade { opacity: 0; transform: translateY(10px); animation: field-fade-in 0.5s ease forwards; }
//         @keyframes field-fade-in { to { opacity: 1; transform: translateY(0); } }

//         @keyframes shake-x { 0%, 100% { transform: translateX(0); } 20% { transform: translateX(-6px); } 40% { transform: translateX(6px); } 60% { transform: translateX(-4px); } 80% { transform: translateX(4px); } }
//         .shake { animation: shake-x 0.4s ease; }

//         .seal-btn { position: relative; overflow: hidden; }
//         @keyframes shimmer-sweep { 0% { transform: translateX(-120%) skewX(-15deg); } 100% { transform: translateX(220%) skewX(-15deg); } }
//         .seal-btn::after { content: ""; position: absolute; top: 0; left: 0; width: 40%; height: 100%; background: linear-gradient(120deg, transparent, rgba(255,255,255,0.5), transparent); transform: translateX(-120%) skewX(-15deg); }
//         .seal-btn:hover::after { animation: shimmer-sweep 0.9s ease forwards; }

//         @keyframes error-in { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
//         .error-in { animation: error-in 0.25s ease forwards; }
//       `}</style>

//       <div className={`w-full max-w-4xl grid md:grid-cols-2 rounded-[1.75rem] overflow-hidden border border-[#E2D5BC] shadow-[0_20px_50px_-25px_rgba(30,42,66,0.4)] transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${shake ? 'shake' : ''}`}>
//         {/* LEFT — storybook panel */}
//         <div className="hidden md:flex relative flex-col justify-between bg-[#1E2A42] text-[#F6EFE3] p-10 overflow-hidden">
//           <div className="pointer-events-none absolute inset-0">
//             {sparkles.map((s) => (
//               <span key={s.id} className="sparkle" style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, animationDuration: `${s.duration}s`, animationDelay: `${s.delay}s` }} />
//             ))}
//           </div>
//           <div className="relative flex items-center gap-2">
//             <BookOpen size={20} className="text-[#C9A567]" />
//             <span className="font-display font-semibold tracking-wide">PageTurner</span>
//           </div>
//           <div className="relative flex flex-col items-center text-center py-6">
//             <div className="relative mb-7">
//               <div className="absolute inset-0 rounded-full bg-[#C9A567]/25 blur-2xl glow-pulse" />
//               <div className="relative"><ReadingBook /></div>
//             </div>
//             <p className="font-quote italic text-2xl leading-snug text-[#F6EFE3]/90">"{quote.text}"</p>
//             <p className="font-body text-xs tracking-[0.15em] uppercase text-[#C9A567]/80 mt-3">— {quote.author}</p>
//           </div>
//           <p className="relative font-body text-xs text-[#B9C9AE]">Your shelf missed you.</p>
//         </div>

//         {/* RIGHT — form */}
//         <div className="bg-[#FFFBF3] p-8 md:p-10 flex flex-col justify-center">
//           <div className="mb-7">
//             <div className="flex items-center gap-2 mb-2 md:hidden">
//               <BookOpen size={16} className="text-[#D8472F]" />
//               <span className="font-display font-semibold text-[#1E2A42]">PageTurner</span>
//             </div>
//             <h2 className="font-display text-2xl font-bold text-[#1E2A42]">Welcome back</h2>
//             <p className="text-[#8A7F6B] text-sm mt-1">Login to continue reading</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-5" noValidate>
//             <div className="field-wrap relative field-fade" style={{ animationDelay: '80ms' }}>
//               <label className="block text-xs font-medium text-[#5B6478] mb-1.5">Email Address</label>
//               <div className={`flex items-center gap-2.5 px-3.5 py-2.5 bg-[#F6EFE3] rounded-lg border transition-colors ${errors.email && touched.email ? 'border-[#D8472F]' : 'border-[#E2D5BC]'}`}>
//                 <Mail size={15} className="text-[#8A7F6B] shrink-0" />
//                 <input
//                   type="email"
//                   placeholder="you@example.com"
//                   value={formData.email}
//                   onChange={(e) => handleChange('email', e.target.value)}
//                   onBlur={() => handleBlur('email')}
//                   className="flex-1 min-w-0 bg-transparent text-sm text-[#1E2A42] placeholder:text-[#8A7F6B] focus:outline-none"
//                 />
//               </div>
//               <span className="field-underline" />
//               {errors.email && touched.email && (
//                 <p className="error-in flex items-center gap-1 text-xs text-[#D8472F] mt-1.5">
//                   <AlertCircle size={12} /> {errors.email}
//                 </p>
//               )}
//             </div>

//             <div className="field-wrap relative field-fade" style={{ animationDelay: '150ms' }}>
//               <label className="block text-xs font-medium text-[#5B6478] mb-1.5">Password</label>
//               <div className={`flex items-center gap-2.5 px-3.5 py-2.5 bg-[#F6EFE3] rounded-lg border transition-colors ${errors.password && touched.password ? 'border-[#D8472F]' : 'border-[#E2D5BC]'}`}>
//                 <Lock size={15} className="text-[#8A7F6B] shrink-0" />
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   placeholder="Enter your password"
//                   value={formData.password}
//                   onChange={(e) => handleChange('password', e.target.value)}
//                   onBlur={() => handleBlur('password')}
//                   className="flex-1 min-w-0 bg-transparent text-sm text-[#1E2A42] placeholder:text-[#8A7F6B] focus:outline-none"
//                 />
//                 <button type="button" onClick={() => setShowPassword((v) => !v)} className="text-[#8A7F6B] hover:text-[#1E2A42] transition shrink-0">
//                   {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
//                 </button>
//               </div>
//               <span className="field-underline" />
//               {errors.password && touched.password && (
//                 <p className="error-in flex items-center gap-1 text-xs text-[#D8472F] mt-1.5">
//                   <AlertCircle size={12} /> {errors.password}
//                 </p>
//               )}
//             </div>

//             <button
//               type="submit"
//               disabled={submitting}
//               className="seal-btn w-full py-3 bg-[#D8472F] text-[#FFFBF3] rounded-full text-sm font-semibold shadow-[0_10px_20px_-10px_rgba(216,71,47,0.55)] hover:bg-[#B23522] transition flex items-center justify-center gap-2 disabled:opacity-70"
//             >
//               {submitting ? <><Loader2 size={16} className="animate-spin" /> Signing in...</> : 'Login'}
//             </button>

//             <p className="text-center text-sm text-[#8A7F6B]">
//               Don't have an account?{' '}
//               <Link to="/register" className="text-[#D8472F] font-semibold hover:underline">Sign Up</Link>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;






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

  React.useEffect(() => { setMounted(true); }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
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

        .input-group {
          margin-bottom: 20px;
        }
        .input-group:last-of-type {
          margin-bottom: 24px;
        }

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
        .input-field:focus-within .icon {
          color: #D8472F;
          transform: scale(1.1);
        }
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
          font-weight: 400;
          letter-spacing: 0.2px;
        }
        .input-field input::placeholder {
          color: #A89B8A;
          font-weight: 400;
          letter-spacing: 0.3px;
        }
        .input-field .toggle-btn {
          padding-right: 16px;
          flex-shrink: 0;
          color: #8A7F6B;
          transition: all 0.3s ease;
          background: none;
          border: none;
          cursor: pointer;
        }
        .input-field .toggle-btn:hover {
          color: #D8472F;
        }

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

        .divider-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(217,199,163,0.4), transparent);
        }

        .form-group {
          margin-bottom: 8px;
        }

        .btn-submit {
          height: 52px;
          border-radius: 14px;
          font-size: 15px;
          font-weight: 600;
          margin-top: 8px;
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