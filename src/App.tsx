import { useState, useRef, useEffect } from 'react';
import { Menu, CircleDollarSign, ArrowLeft, User, History as HistoryIcon, HelpCircle, LogOut, Gamepad2 } from 'lucide-react';

type ViewState = 'home' | 'login' | 'register' | 'profile' | 'history' | 'support' | 'missions';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState<{username: string, email: string} | null>(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });
  const menuRef = useRef<HTMLDivElement>(null);

  const users = JSON.parse(localStorage.getItem('adixo_users') || '{}');
  const user = currentUser ? users[currentUser.email] : null;
  const balance = user?.balance || 0;
  const history = user?.history || [];

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuClick = (view: ViewState) => {
    setCurrentView(view);
    setIsMenuOpen(false);
  };

  const renderHeader = () => (
    <header className="flex items-center justify-between px-4 py-4 md:px-8 max-w-7xl mx-auto relative z-50">
      <div className="flex items-center gap-4">
        {currentView !== 'home' ? (
          <button 
            onClick={() => setCurrentView('home')} 
            className="p-1 hover:bg-white/10 rounded-md transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6 text-gray-300" />
          </button>
        ) : currentUser ? (
          <div className="relative" ref={menuRef}>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1 hover:bg-white/10 rounded-md transition-colors"
            >
              <Menu className="w-6 h-6 text-gray-300" />
            </button>
            
            {isMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-[#1a1d2d] border border-white/10 rounded-xl shadow-2xl overflow-hidden py-1 animate-in fade-in slide-in-from-top-2 duration-200">
                <button 
                  onClick={() => handleMenuClick('profile')}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-200 hover:bg-white/5 transition-colors text-left"
                >
                  <User className="w-4 h-4" /> Profile & Security
                </button>
                <button 
                  onClick={() => handleMenuClick('missions')}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-200 hover:bg-white/5 transition-colors text-left"
                >
                  <Gamepad2 className="w-4 h-4" /> Free Fire Missions
                </button>
                <button 
                  onClick={() => handleMenuClick('history')}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-200 hover:bg-white/5 transition-colors text-left"
                >
                  <HistoryIcon className="w-4 h-4" /> Earning History
                </button>
                <button 
                  onClick={() => handleMenuClick('support')}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-200 hover:bg-white/5 transition-colors text-left"
                >
                  <HelpCircle className="w-4 h-4" /> Support
                </button>
                <div className="h-px bg-white/10 w-full my-1" />
                <button 
                  onClick={() => {
                    setIsMenuOpen(false);
                    localStorage.removeItem('currentUser');
                    setCurrentUser(null);
                    setCurrentView('login');
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-white/5 transition-colors text-left"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            )}
          </div>
        ) : null}
        <div 
          className="text-lg md:text-xl font-bold tracking-tight flex items-center gap-1 cursor-pointer"
          onClick={() => setCurrentView('home')}
        >
          ADIXO FREE INCOME
        </div>
      </div>
      {!currentUser && currentView === 'home' && (
        <div className="flex items-center gap-4 md:gap-6">
          <button 
            onClick={() => { setError(''); setCurrentView('login'); }} 
            className="text-blue-400 hover:text-blue-300 font-medium text-sm md:text-base transition-colors"
          >
            Login
          </button>
          <button 
            onClick={() => { setError(''); setCurrentView('register'); }} 
            className="bg-[#4372f6] hover:bg-[#3b66e0] text-white px-5 py-2 rounded-full font-medium text-sm md:text-base transition-colors"
          >
            Sign up
          </button>
        </div>
      )}
      {currentUser && (
        <div className="flex items-center gap-4 md:gap-6">
          <div 
            onClick={() => setCurrentView('history')}
            className="bg-[#51e87f]/10 text-[#51e87f] px-3 py-1.5 rounded-lg font-bold text-sm flex items-center gap-1.5 cursor-pointer hover:bg-[#51e87f]/20 transition-colors"
          >
            <CircleDollarSign className="w-4 h-4" />
            ${balance.toFixed(2)}
          </div>
          <span className="text-sm font-medium text-gray-300 hidden sm:inline-block">Welcome, {currentUser.username}</span>
        </div>
      )}
    </header>
  );

  const renderHome = () => (
    <main className="flex flex-col items-center justify-center px-4 pt-16 pb-24 md:pt-24 max-w-4xl mx-auto text-center animate-in fade-in duration-500">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-10 uppercase">
        <span className="text-[#51e87f]">Earn money</span> by completing<br />
        simple <span className="text-orange-500">Free Fire</span> missions
      </h1>

      <div className="inline-flex flex-col gap-5 mb-12 text-lg md:text-xl font-medium text-gray-200 text-left">
        <div className="flex items-center gap-3">
          <CircleDollarSign className="w-6 h-6 text-[#51e87f]" />
          <p>GET <span className="text-[#51e87f]">2$</span> WELCOME BONUS</p>
        </div>
        <div className="flex items-center gap-3">
          <CircleDollarSign className="w-6 h-6 text-[#51e87f]" />
          <p>EARN UPTO <span className="text-[#51e87f]">5000 BDT</span> PER DAY</p>
        </div>
      </div>

      <button 
        onClick={() => { setError(''); setCurrentView('missions'); }}
        className="w-full max-w-md bg-[#4372f6] hover:bg-[#3b66e0] text-white text-lg md:text-xl font-bold py-4 px-8 rounded-full transition-transform active:scale-[0.98] shadow-lg shadow-blue-500/20"
      >
        COMPLETE MISSIONS
      </button>
    </main>
  );

  const renderMissions = () => {
    const missions = [
      { id: 0, title: 'Create New Account', desc: 'Open a new account in Free Fire keeping this app opened in the background.', reward: 3.00, difficulty: 'Newbie' },
      { id: 1, title: 'Play 3 Ranked Matches', desc: 'Complete 3 BR Ranked matches today.', reward: 0.50, difficulty: 'Easy' },
      { id: 2, title: '10 Booyahs in CS', desc: 'Win 10 Clash Squad matches.', reward: 2.00, difficulty: 'Medium' },
      { id: 3, title: 'Reach Heroic Tier', desc: 'Reach Heroic tier in BR Ranked.', reward: 5.00, difficulty: 'Hard' },
      { id: 4, title: '50 Headshot Kills', desc: 'Get 50 headshots in any mode.', reward: 1.50, difficulty: 'Medium' },
      { id: 5, title: 'Survive 30 Minutes', desc: 'Total survival time in Battle Royale.', reward: 1.00, difficulty: 'Easy' },
      { id: 6, title: 'Play with Friends', desc: 'Play 5 matches with your in-game friends.', reward: 0.75, difficulty: 'Easy' },
    ];

    return (
      <main className="flex flex-col items-center px-4 pt-12 pb-24 max-w-3xl mx-auto w-full animate-in slide-in-from-bottom-4 fade-in duration-300">
        <div className="w-full flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Free Fire Missions</h2>
          <div className="bg-[#4372f6]/10 text-[#4372f6] px-4 py-2 rounded-lg font-bold flex items-center gap-2">
            <Gamepad2 className="w-5 h-5" />
            Available
          </div>
        </div>
        
        <div className="w-full flex flex-col gap-4">
          {missions.map(mission => (
            <div key={mission.id} className="w-full bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-white/10 transition-colors">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-lg text-gray-100">{mission.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    mission.difficulty === 'Newbie' ? 'bg-blue-500/20 text-blue-400' :
                    mission.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' : 
                    mission.difficulty === 'Medium' ? 'bg-orange-500/20 text-orange-400' : 
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {mission.difficulty}
                  </span>
                </div>
                <p className="text-sm text-gray-400">{mission.desc}</p>
              </div>
              <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                <div className="flex items-center gap-1 text-[#51e87f] font-bold text-xl">
                  <CircleDollarSign className="w-5 h-5" />
                  {mission.reward.toFixed(2)}
                </div>
                <button 
                  onClick={() => {
                    if (!currentUser) setCurrentView('login');
                    else alert('Mission started! Complete it in-game and return here to claim.');
                  }}
                  className="bg-[#4372f6] hover:bg-[#3b66e0] text-white px-5 py-2 rounded-lg font-medium transition-transform active:scale-[0.98]"
                >
                  Start
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    );
  };

  const renderLogin = () => (
    <main className="flex flex-col items-center justify-center px-4 pt-12 pb-24 max-w-md mx-auto w-full animate-in slide-in-from-bottom-4 fade-in duration-300">
      <h2 className="text-3xl font-bold mb-8">Login to ADIXO</h2>
      {error && <div className="w-full bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-xl mb-6 text-sm">{error}</div>}
      <form className="w-full flex flex-col gap-4" onSubmit={(e) => { 
        e.preventDefault(); 
        setError('');
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        const users = JSON.parse(localStorage.getItem('adixo_users') || '{}');
        const user = users[email];

        if (!user || user.password !== password) {
          setError('Invalid email or password');
          return;
        }

        const loggedInUser = { username: user.username, email: user.email };
        localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
        setCurrentUser(loggedInUser);
        setCurrentView('home');
      }}>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-gray-400 font-medium">Gmail / Email</label>
          <input 
            name="email"
            type="email" 
            placeholder="Enter your email" 
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#4372f6] focus:ring-1 focus:ring-[#4372f6] transition-all"
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-gray-400 font-medium">Password</label>
          <input 
            name="password"
            type="password" 
            placeholder="Enter your password" 
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#4372f6] focus:ring-1 focus:ring-[#4372f6] transition-all"
            required
          />
        </div>
        <button 
          type="submit"
          className="w-full bg-[#4372f6] hover:bg-[#3b66e0] text-white font-bold py-3.5 px-8 rounded-xl mt-4 transition-transform active:scale-[0.98]"
        >
          Login
        </button>
      </form>
      <p className="mt-6 text-gray-400">
        Don't have an account?{' '}
        <button onClick={() => { setError(''); setCurrentView('register'); }} className="text-[#4372f6] hover:underline font-medium">
          Sign up
        </button>
      </p>
    </main>
  );

  const renderRegister = () => (
    <main className="flex flex-col items-center justify-center px-4 pt-12 pb-24 max-w-md mx-auto w-full animate-in slide-in-from-bottom-4 fade-in duration-300">
      <h2 className="text-3xl font-bold mb-8">Create an Account</h2>
      {error && <div className="w-full bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-xl mb-6 text-sm">{error}</div>}
      <form className="w-full flex flex-col gap-4" onSubmit={(e) => { 
        e.preventDefault(); 
        setError('');
        const formData = new FormData(e.currentTarget);
        const username = formData.get('username') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const confirmPassword = formData.get('confirmPassword') as string;

        if (password !== confirmPassword) {
          setError('Passwords do not match');
          return;
        }

        const users = JSON.parse(localStorage.getItem('adixo_users') || '{}');
        if (users[email]) {
          setError('Email is already registered');
          return;
        }

        users[email] = { 
          username, 
          email, 
          password,
          balance: 2.00,
          history: [{ title: 'Welcome Bonus', date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }), amount: '+$2.00' }]
        };
        localStorage.setItem('adixo_users', JSON.stringify(users));
        
        const loggedInUser = { username, email };
        localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
        setCurrentUser(loggedInUser);
        setCurrentView('home');
      }}>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-gray-400 font-medium">Username</label>
          <input 
            name="username"
            type="text" 
            placeholder="Choose a username" 
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#4372f6] focus:ring-1 focus:ring-[#4372f6] transition-all"
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-gray-400 font-medium">Gmail / Email</label>
          <input 
            name="email"
            type="email" 
            placeholder="Enter your email" 
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#4372f6] focus:ring-1 focus:ring-[#4372f6] transition-all"
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-gray-400 font-medium">Password</label>
          <input 
            name="password"
            type="password" 
            placeholder="Create a password" 
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#4372f6] focus:ring-1 focus:ring-[#4372f6] transition-all"
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-gray-400 font-medium">Confirm Password</label>
          <input 
            name="confirmPassword"
            type="password" 
            placeholder="Confirm your password" 
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#4372f6] focus:ring-1 focus:ring-[#4372f6] transition-all"
            required
          />
        </div>
        <button 
          type="submit"
          className="w-full bg-[#4372f6] hover:bg-[#3b66e0] text-white font-bold py-3.5 px-8 rounded-xl mt-4 transition-transform active:scale-[0.98]"
        >
          Register
        </button>
      </form>
      <p className="mt-6 text-gray-400">
        Already have an account?{' '}
        <button onClick={() => { setError(''); setCurrentView('login'); }} className="text-[#4372f6] hover:underline font-medium">
          Login
        </button>
      </p>
    </main>
  );

  const renderProfile = () => (
    <main className="flex flex-col items-center justify-center px-4 pt-12 pb-24 max-w-md mx-auto w-full animate-in slide-in-from-bottom-4 fade-in duration-300">
      <div className="w-20 h-20 bg-[#4372f6]/20 rounded-full flex items-center justify-center mb-6 border border-[#4372f6]/50">
        <User className="w-10 h-10 text-[#4372f6]" />
      </div>
      <h2 className="text-3xl font-bold mb-8">Edit Profile</h2>
      <form className="w-full flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); alert('Profile updated!'); }}>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-gray-400 font-medium">Username</label>
          <input 
            type="text" 
            defaultValue={currentUser?.username || ''}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#4372f6] focus:ring-1 focus:ring-[#4372f6] transition-all"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-gray-400 font-medium">Email</label>
          <input 
            type="email" 
            defaultValue={currentUser?.email || ''}
            disabled
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-gray-400 placeholder:text-gray-500 focus:outline-none opacity-70 cursor-not-allowed"
          />
        </div>
        <div className="h-px bg-white/10 w-full my-2" />
        <h3 className="text-lg font-semibold text-gray-200">Change Password</h3>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-gray-400 font-medium">Current Password</label>
          <input 
            type="password" 
            placeholder="Enter current password" 
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#4372f6] focus:ring-1 focus:ring-[#4372f6] transition-all"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-gray-400 font-medium">New Password</label>
          <input 
            type="password" 
            placeholder="Enter new password" 
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#4372f6] focus:ring-1 focus:ring-[#4372f6] transition-all"
          />
        </div>
        <button 
          type="submit"
          className="w-full bg-[#4372f6] hover:bg-[#3b66e0] text-white font-bold py-3.5 px-8 rounded-xl mt-4 transition-transform active:scale-[0.98]"
        >
          Save Changes
        </button>
      </form>
    </main>
  );

  const renderHistory = () => (
    <main className="flex flex-col items-center px-4 pt-12 pb-24 max-w-2xl mx-auto w-full animate-in slide-in-from-bottom-4 fade-in duration-300">
      <div className="w-full flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">Earning History</h2>
        <div className="bg-[#51e87f]/10 text-[#51e87f] px-4 py-2 rounded-lg font-bold">
          Total: ${balance.toFixed(2)}
        </div>
      </div>
      
      <div className="w-full flex flex-col gap-3">
        {history.length > 0 ? history.map((item: any, i: number) => (
          <div key={i} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between hover:bg-white/10 transition-colors">
            <div className="flex flex-col gap-1">
              <span className="font-medium text-gray-200">{item.title}</span>
              <span className="text-sm text-gray-400">{item.date}</span>
            </div>
            <span className="font-bold text-[#51e87f]">{item.amount}</span>
          </div>
        )) : (
          <div className="text-center text-gray-400 py-8">No earning history yet.</div>
        )}
      </div>
    </main>
  );

  const renderSupport = () => (
    <main className="flex flex-col items-center px-4 pt-12 pb-24 max-w-md mx-auto w-full animate-in slide-in-from-bottom-4 fade-in duration-300">
      <div className="w-20 h-20 bg-[#4372f6]/20 rounded-full flex items-center justify-center mb-6 border border-[#4372f6]/50">
        <HelpCircle className="w-10 h-10 text-[#4372f6]" />
      </div>
      <h2 className="text-3xl font-bold mb-2">Support</h2>
      <p className="text-gray-400 text-center mb-8">How can we help you today?</p>
      
      <form className="w-full flex flex-col gap-4" onSubmit={(e) => { 
        e.preventDefault(); 
        const formData = new FormData(e.currentTarget);
        const subject = formData.get('subject');
        const message = formData.get('message');
        const text = `🆘 *New Support Request* 🆘\n\n📌 *Subject:*\n${subject}\n\n📝 *Message:*\n${message}\n\n------------------------\n🤖 _Sent from ADIXO FREE INCOME App_`;
        window.open(`https://t.me/AdiXO_TV?text=${encodeURIComponent(text)}`, '_blank');
      }}>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-gray-400 font-medium">Subject</label>
          <input 
            name="subject"
            type="text" 
            placeholder="What is this regarding?" 
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#4372f6] focus:ring-1 focus:ring-[#4372f6] transition-all"
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-gray-400 font-medium">Message</label>
          <textarea 
            name="message"
            placeholder="Describe your issue in detail..." 
            rows={5}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#4372f6] focus:ring-1 focus:ring-[#4372f6] transition-all resize-none"
            required
          />
        </div>
        <button 
          type="submit"
          className="w-full bg-[#4372f6] hover:bg-[#3b66e0] text-white font-bold py-3.5 px-8 rounded-xl mt-4 transition-transform active:scale-[0.98]"
        >
          Send Message
        </button>
      </form>
      
      <div className="mt-12 w-full pt-8 border-t border-white/10 text-center">
        <h3 className="font-semibold mb-4">Frequently Asked Questions</h3>
        <div className="flex flex-col gap-3 text-left">
          <div className="bg-white/5 p-4 rounded-xl">
            <p className="font-medium text-sm mb-1">When do I get paid?</p>
            <p className="text-xs text-gray-400">Payments are processed within 24 hours of requesting a withdrawal.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-xl">
            <p className="font-medium text-sm mb-1">What is the minimum withdrawal?</p>
            <p className="text-xs text-gray-400">The minimum withdrawal amount is $5.00.</p>
          </div>
        </div>
      </div>
    </main>
  );

  return (
    <div className="min-h-screen bg-[#11131f] text-white font-sans selection:bg-blue-500/30">
      {renderHeader()}
      {currentView === 'home' && renderHome()}
      {currentView === 'missions' && renderMissions()}
      {currentView === 'login' && renderLogin()}
      {currentView === 'register' && renderRegister()}
      {currentView === 'profile' && renderProfile()}
      {currentView === 'history' && renderHistory()}
      {currentView === 'support' && renderSupport()}
    </div>
  );
}
