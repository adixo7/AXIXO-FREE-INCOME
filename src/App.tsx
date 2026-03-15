import { useState, useRef, useEffect } from 'react';
import { Menu, CircleDollarSign, ArrowLeft, User, History as HistoryIcon, HelpCircle, LogOut, Gamepad2, Zap, Shield, Crosshair, Trophy, Clock, Users } from 'lucide-react';

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
    <>
      <header style={{ position: 'relative', zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {currentView !== 'home' ? (
              <button
                onClick={() => setCurrentView('home')}
                style={{ padding: '6px', background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#00d4ff', transition: 'all 0.2s' }}
              >
                <ArrowLeft size={18} />
              </button>
            ) : currentUser ? (
              <div style={{ position: 'relative' }} ref={menuRef}>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  style={{ padding: '6px', background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#00d4ff' }}
                >
                  <Menu size={18} />
                </button>
                {isMenuOpen && (
                  <div className="game-menu" style={{ position: 'absolute', top: 'calc(100% + 8px)', left: 0, width: '220px', borderRadius: '10px', overflow: 'hidden', padding: '6px 0' }}>
                    {[
                      { icon: <User size={15} />, label: 'Profile & Security', view: 'profile' as ViewState },
                      { icon: <Gamepad2 size={15} />, label: 'Free Fire Missions', view: 'missions' as ViewState },
                      { icon: <HistoryIcon size={15} />, label: 'Earning History', view: 'history' as ViewState },
                      { icon: <HelpCircle size={15} />, label: 'Support', view: 'support' as ViewState },
                    ].map(item => (
                      <button key={item.view} onClick={() => handleMenuClick(item.view)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 16px', background: 'transparent', border: 'none', color: '#c0d0f0', cursor: 'pointer', fontSize: '14px', fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, letterSpacing: '0.03em', transition: 'all 0.2s', textAlign: 'left' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,212,255,0.08)'; (e.currentTarget as HTMLElement).style.color = '#00d4ff'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#c0d0f0'; }}
                      >
                        <span style={{ color: '#00d4ff' }}>{item.icon}</span>
                        {item.label}
                      </button>
                    ))}
                    <div style={{ height: '1px', background: 'rgba(0,212,255,0.1)', margin: '4px 0' }} />
                    <button onClick={() => { setIsMenuOpen(false); localStorage.removeItem('currentUser'); setCurrentUser(null); setCurrentView('login'); }}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 16px', background: 'transparent', border: 'none', color: '#ff4444', cursor: 'pointer', fontSize: '14px', fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, letterSpacing: '0.03em' }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,50,50,0.08)'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                    >
                      <LogOut size={15} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : null}

            <div onClick={() => setCurrentView('home')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #00d4ff, #00ff87)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 15px rgba(0,212,255,0.5)' }}>
                <Zap size={18} color="#07090f" strokeWidth={2.5} />
              </div>
              <span className="font-game" style={{ fontSize: '18px', fontWeight: 900, letterSpacing: '0.1em', background: 'linear-gradient(90deg, #00d4ff, #00ff87)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                ADIXO INCOME
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {currentUser && (
              <div onClick={() => setCurrentView('history')} className="balance-chip" style={{ background: 'rgba(0,255,135,0.08)', border: '1px solid rgba(0,255,135,0.3)', borderRadius: '8px', padding: '6px 14px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <CircleDollarSign size={16} color="#00ff87" />
                <span className="font-game neon-green" style={{ fontSize: '14px', fontWeight: 700 }}>${balance.toFixed(2)}</span>
              </div>
            )}
            {currentUser && (
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#7090b0', letterSpacing: '0.05em', display: 'none' }}>{currentUser.username}</span>
            )}
            {!currentUser && currentView === 'home' && (
              <>
                <button onClick={() => { setError(''); setCurrentView('login'); }}
                  style={{ background: 'transparent', border: '1px solid rgba(0,212,255,0.3)', color: '#00d4ff', padding: '8px 20px', borderRadius: '6px', cursor: 'pointer', fontFamily: 'Orbitron, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', transition: 'all 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,212,255,0.1)'; (e.currentTarget as HTMLElement).style.borderColor = '#00d4ff'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,212,255,0.3)'; }}
                >
                  LOGIN
                </button>
                <button onClick={() => { setError(''); setCurrentView('register'); }} className="btn-neon" style={{ padding: '8px 20px', borderRadius: '6px', fontSize: '11px', letterSpacing: '0.08em' }}>
                  SIGN UP
                </button>
              </>
            )}
          </div>
        </div>
        <div className="header-line" />
      </header>
    </>
  );

  const renderHome = () => (
    <main className="animate-enter" style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px 80px' }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', borderRadius: '20px', padding: '6px 16px', marginBottom: '28px' }}>
          <span style={{ width: '7px', height: '7px', background: '#00ff87', borderRadius: '50%', boxShadow: '0 0 8px #00ff87', display: 'inline-block' }} />
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#00d4ff', letterSpacing: '0.1em', fontFamily: 'Orbitron, sans-serif' }}>SEASON ACTIVE</span>
        </div>

        <h1 className="font-game" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '0.05em', marginBottom: '24px' }}>
          <span className="neon-green">EARN MONEY</span><br />
          <span style={{ color: '#e0e8ff' }}>BY COMPLETING</span><br />
          <span style={{ background: 'linear-gradient(90deg, #ff6b35, #ffaa00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>FREE FIRE MISSIONS</span>
        </h1>

        <p style={{ fontSize: '16px', color: '#7090b0', maxWidth: '480px', margin: '0 auto 40px', fontWeight: 500, lineHeight: 1.6 }}>
          Complete in-game missions and earn real money. Join thousands of players already earning daily.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', maxWidth: '560px', margin: '0 auto 40px' }}>
          {[
            { icon: <Zap size={20} color="#00d4ff" />, label: 'WELCOME BONUS', value: '$2.00' },
            { icon: <Trophy size={20} color="#ffaa00" />, label: 'MAX DAILY', value: '5000 BDT' },
            { icon: <Shield size={20} color="#00ff87" />, label: 'MISSIONS', value: '7+' },
          ].map((stat, i) => (
            <div key={i} className="stat-box hud-corners" style={{ borderRadius: '10px', padding: '16px 12px', textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>{stat.icon}</div>
              <div className="font-game" style={{ fontSize: '18px', fontWeight: 900, color: '#e0e8ff', marginBottom: '4px' }}>{stat.value}</div>
              <div style={{ fontSize: '10px', fontWeight: 700, color: '#4a6080', letterSpacing: '0.08em' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <button onClick={() => { setError(''); setCurrentView('missions'); }} className="btn-neon" style={{ padding: '16px 48px', borderRadius: '8px', fontSize: '14px', letterSpacing: '0.12em', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
          <Gamepad2 size={20} />
          PLAY & EARN NOW
        </button>
      </div>
    </main>
  );

  const missions = [
    { id: 0, title: 'Create New Account', desc: 'Open a new account in Free Fire keeping this app opened in the background.', reward: 3.00, difficulty: 'Newbie', icon: <Users size={18} /> },
    { id: 1, title: 'Play 3 Ranked Matches', desc: 'Complete 3 BR Ranked matches today.', reward: 0.50, difficulty: 'Easy', icon: <Crosshair size={18} /> },
    { id: 2, title: '10 Booyahs in CS', desc: 'Win 10 Clash Squad matches.', reward: 2.00, difficulty: 'Medium', icon: <Trophy size={18} /> },
    { id: 3, title: 'Reach Heroic Tier', desc: 'Reach Heroic tier in BR Ranked.', reward: 5.00, difficulty: 'Hard', icon: <Shield size={18} /> },
    { id: 4, title: '50 Headshot Kills', desc: 'Get 50 headshots in any mode.', reward: 1.50, difficulty: 'Medium', icon: <Crosshair size={18} /> },
    { id: 5, title: 'Survive 30 Minutes', desc: 'Total survival time in Battle Royale.', reward: 1.00, difficulty: 'Easy', icon: <Clock size={18} /> },
    { id: 6, title: 'Play with Friends', desc: 'Play 5 matches with your in-game friends.', reward: 0.75, difficulty: 'Easy', icon: <Users size={18} /> },
  ];

  const difficultyStyle: Record<string, string> = {
    Newbie: 'badge-newbie',
    Easy: 'badge-easy',
    Medium: 'badge-medium',
    Hard: 'badge-hard',
  };

  const renderMissions = () => (
    <main className="animate-enter" style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 24px 80px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div className="section-bar">
          <h2 className="font-game" style={{ fontSize: '22px', fontWeight: 900, letterSpacing: '0.08em', color: '#e0e8ff', margin: 0 }}>FREE FIRE MISSIONS</h2>
        </div>
        <div style={{ background: 'rgba(0,255,135,0.08)', border: '1px solid rgba(0,255,135,0.25)', borderRadius: '6px', padding: '6px 14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '6px', height: '6px', background: '#00ff87', borderRadius: '50%', boxShadow: '0 0 6px #00ff87', display: 'inline-block' }} />
          <span className="font-game" style={{ fontSize: '11px', fontWeight: 700, color: '#00ff87', letterSpacing: '0.1em' }}>LIVE</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {missions.map((mission, idx) => (
          <div key={mission.id} className="game-card" style={{ borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', animationDelay: `${idx * 0.05}s` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1, minWidth: 0 }}>
              <div style={{ width: '42px', height: '42px', background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00d4ff', flexShrink: 0 }}>
                {mission.icon}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '15px', fontWeight: 700, color: '#e0e8ff', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.03em' }}>{mission.title}</span>
                  <span className={difficultyStyle[mission.difficulty]} style={{ fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', letterSpacing: '0.06em', fontFamily: 'Orbitron, sans-serif' }}>{mission.difficulty.toUpperCase()}</span>
                </div>
                <p style={{ fontSize: '13px', color: '#5070a0', margin: 0, fontWeight: 500 }}>{mission.desc}</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
              <div className="font-game neon-green" style={{ fontSize: '20px', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CircleDollarSign size={18} color="#00ff87" />
                {mission.reward.toFixed(2)}
              </div>
              <button
                onClick={() => { if (!currentUser) setCurrentView('login'); else alert('Mission started! Complete it in-game and return here to claim.'); }}
                className="btn-neon"
                style={{ padding: '8px 18px', borderRadius: '6px', fontSize: '11px', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}
              >
                START
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );

  const formInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input {...props} className="game-input" style={{ padding: '12px 16px', borderRadius: '8px', ...props.style }} />
  );

  const renderLogin = () => (
    <main className="animate-enter" style={{ maxWidth: '420px', margin: '0 auto', padding: '32px 24px 80px' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ width: '56px', height: '56px', background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.25)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <User size={26} color="#00d4ff" />
        </div>
        <h2 className="font-game" style={{ fontSize: '22px', fontWeight: 900, letterSpacing: '0.1em', color: '#e0e8ff', margin: 0 }}>LOGIN</h2>
        <p style={{ color: '#4a6080', fontSize: '13px', marginTop: '6px', fontWeight: 500 }}>Enter the arena</p>
      </div>

      {error && <div className="error-box" style={{ borderRadius: '8px', padding: '12px 16px', marginBottom: '20px', fontSize: '13px', fontWeight: 600 }}>{error}</div>}

      <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} onSubmit={(e) => {
        e.preventDefault(); setError('');
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const users = JSON.parse(localStorage.getItem('adixo_users') || '{}');
        const user = users[email];
        if (!user || user.password !== password) { setError('Invalid email or password'); return; }
        const loggedInUser = { username: user.username, email: user.email };
        localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
        setCurrentUser(loggedInUser);
        setCurrentView('home');
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '11px', fontWeight: 700, color: '#4a6080', letterSpacing: '0.08em', fontFamily: 'Orbitron, sans-serif' }}>EMAIL</label>
          {formInput({ name: 'email', type: 'email', placeholder: 'Enter your email', required: true })}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '11px', fontWeight: 700, color: '#4a6080', letterSpacing: '0.08em', fontFamily: 'Orbitron, sans-serif' }}>PASSWORD</label>
          {formInput({ name: 'password', type: 'password', placeholder: 'Enter your password', required: true })}
        </div>
        <button type="submit" className="btn-neon" style={{ padding: '14px', borderRadius: '8px', fontSize: '13px', letterSpacing: '0.1em', marginTop: '8px', width: '100%' }}>
          ENTER
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#4a6080', fontWeight: 500 }}>
        New player?{' '}
        <button onClick={() => { setError(''); setCurrentView('register'); }} style={{ background: 'none', border: 'none', color: '#00d4ff', cursor: 'pointer', fontSize: '14px', fontWeight: 700, fontFamily: 'Rajdhani, sans-serif' }}>
          Create Account
        </button>
      </p>
    </main>
  );

  const renderRegister = () => (
    <main className="animate-enter" style={{ maxWidth: '420px', margin: '0 auto', padding: '32px 24px 80px' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ width: '56px', height: '56px', background: 'rgba(0,255,135,0.08)', border: '1px solid rgba(0,255,135,0.25)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <Zap size={26} color="#00ff87" />
        </div>
        <h2 className="font-game" style={{ fontSize: '22px', fontWeight: 900, letterSpacing: '0.1em', color: '#e0e8ff', margin: 0 }}>CREATE ACCOUNT</h2>
        <p style={{ color: '#4a6080', fontSize: '13px', marginTop: '6px', fontWeight: 500 }}>Join the mission</p>
      </div>

      {error && <div className="error-box" style={{ borderRadius: '8px', padding: '12px 16px', marginBottom: '20px', fontSize: '13px', fontWeight: 600 }}>{error}</div>}

      <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} onSubmit={(e) => {
        e.preventDefault(); setError('');
        const formData = new FormData(e.currentTarget);
        const username = formData.get('username') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const confirmPassword = formData.get('confirmPassword') as string;
        if (password !== confirmPassword) { setError('Passwords do not match'); return; }
        const users = JSON.parse(localStorage.getItem('adixo_users') || '{}');
        if (users[email]) { setError('Email is already registered'); return; }
        users[email] = { username, email, password, balance: 2.00, history: [{ title: 'Welcome Bonus', date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }), amount: '+$2.00' }] };
        localStorage.setItem('adixo_users', JSON.stringify(users));
        const loggedInUser = { username, email };
        localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
        setCurrentUser(loggedInUser);
        setCurrentView('home');
      }}>
        {[
          { name: 'username', label: 'USERNAME', type: 'text', placeholder: 'Choose a username' },
          { name: 'email', label: 'EMAIL', type: 'email', placeholder: 'Enter your email' },
          { name: 'password', label: 'PASSWORD', type: 'password', placeholder: 'Create a password' },
          { name: 'confirmPassword', label: 'CONFIRM PASSWORD', type: 'password', placeholder: 'Confirm your password' },
        ].map(f => (
          <div key={f.name} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '11px', fontWeight: 700, color: '#4a6080', letterSpacing: '0.08em', fontFamily: 'Orbitron, sans-serif' }}>{f.label}</label>
            {formInput({ name: f.name, type: f.type, placeholder: f.placeholder, required: true })}
          </div>
        ))}
        <button type="submit" className="btn-neon btn-green" style={{ padding: '14px', borderRadius: '8px', fontSize: '13px', letterSpacing: '0.1em', marginTop: '8px', width: '100%' }}>
          JOIN NOW
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#4a6080', fontWeight: 500 }}>
        Already a player?{' '}
        <button onClick={() => { setError(''); setCurrentView('login'); }} style={{ background: 'none', border: 'none', color: '#00d4ff', cursor: 'pointer', fontSize: '14px', fontWeight: 700, fontFamily: 'Rajdhani, sans-serif' }}>
          Login
        </button>
      </p>
    </main>
  );

  const renderProfile = () => (
    <main className="animate-enter" style={{ maxWidth: '420px', margin: '0 auto', padding: '32px 24px 80px' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ width: '72px', height: '72px', background: 'rgba(0,212,255,0.08)', border: '2px solid rgba(0,212,255,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 0 20px rgba(0,212,255,0.2)' }}>
          <User size={32} color="#00d4ff" />
        </div>
        <h2 className="font-game" style={{ fontSize: '20px', fontWeight: 900, letterSpacing: '0.08em', color: '#e0e8ff', margin: 0 }}>PLAYER PROFILE</h2>
        <p style={{ color: '#00d4ff', fontSize: '13px', marginTop: '4px', fontWeight: 600 }}>{currentUser?.username}</p>
      </div>

      <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} onSubmit={(e) => { e.preventDefault(); alert('Profile updated!'); }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '11px', fontWeight: 700, color: '#4a6080', letterSpacing: '0.08em', fontFamily: 'Orbitron, sans-serif' }}>USERNAME</label>
          {formInput({ type: 'text', defaultValue: currentUser?.username || '' })}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '11px', fontWeight: 700, color: '#4a6080', letterSpacing: '0.08em', fontFamily: 'Orbitron, sans-serif' }}>EMAIL</label>
          <input className="game-input" disabled defaultValue={currentUser?.email || ''} style={{ padding: '12px 16px', borderRadius: '8px', opacity: 0.5, cursor: 'not-allowed' }} />
        </div>
        <div style={{ height: '1px', background: 'rgba(0,212,255,0.1)', margin: '4px 0' }} />
        <h3 className="font-game" style={{ fontSize: '13px', fontWeight: 700, color: '#4a6080', letterSpacing: '0.08em', margin: 0 }}>CHANGE PASSWORD</h3>
        {formInput({ type: 'password', placeholder: 'Current password' })}
        {formInput({ type: 'password', placeholder: 'New password' })}
        <button type="submit" className="btn-neon" style={{ padding: '14px', borderRadius: '8px', fontSize: '12px', letterSpacing: '0.1em', marginTop: '8px', width: '100%' }}>
          SAVE CHANGES
        </button>
      </form>
    </main>
  );

  const renderHistory = () => (
    <main className="animate-enter" style={{ maxWidth: '640px', margin: '0 auto', padding: '32px 24px 80px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div className="section-bar">
          <h2 className="font-game" style={{ fontSize: '20px', fontWeight: 900, letterSpacing: '0.08em', color: '#e0e8ff', margin: 0 }}>EARNING HISTORY</h2>
        </div>
        <div className="pulse-green" style={{ background: 'rgba(0,255,135,0.08)', border: '1px solid rgba(0,255,135,0.25)', borderRadius: '8px', padding: '8px 16px' }}>
          <span className="font-game neon-green" style={{ fontSize: '15px', fontWeight: 900 }}>TOTAL: ${balance.toFixed(2)}</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {history.length > 0 ? history.map((item: any, i: number) => (
          <div key={i} className="game-card" style={{ borderRadius: '10px', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#c0d0f0', marginBottom: '3px' }}>{item.title}</div>
              <div style={{ fontSize: '12px', color: '#4a6080', fontWeight: 500 }}>{item.date}</div>
            </div>
            <span className="font-game neon-green" style={{ fontSize: '16px', fontWeight: 900 }}>{item.amount}</span>
          </div>
        )) : (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#4a6080' }}>
            <Trophy size={40} color="#2a3a50" style={{ margin: '0 auto 12px', display: 'block' }} />
            <p style={{ fontWeight: 600, fontSize: '15px' }}>No earning history yet</p>
            <p style={{ fontSize: '13px', marginTop: '4px' }}>Complete missions to start earning!</p>
          </div>
        )}
      </div>
    </main>
  );

  const renderSupport = () => (
    <main className="animate-enter" style={{ maxWidth: '420px', margin: '0 auto', padding: '32px 24px 80px' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ width: '56px', height: '56px', background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.25)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <HelpCircle size={26} color="#00d4ff" />
        </div>
        <h2 className="font-game" style={{ fontSize: '22px', fontWeight: 900, letterSpacing: '0.1em', color: '#e0e8ff', margin: 0 }}>SUPPORT</h2>
        <p style={{ color: '#4a6080', fontSize: '13px', marginTop: '6px', fontWeight: 500 }}>We're here to help</p>
      </div>

      <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const subject = formData.get('subject');
        const message = formData.get('message');
        const text = `🆘 *New Support Request* 🆘\n\n📌 *Subject:*\n${subject}\n\n📝 *Message:*\n${message}\n\n------------------------\n🤖 _Sent from ADIXO INCOME App_`;
        window.open(`https://t.me/AdiXO_TV?text=${encodeURIComponent(text)}`, '_blank');
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '11px', fontWeight: 700, color: '#4a6080', letterSpacing: '0.08em', fontFamily: 'Orbitron, sans-serif' }}>SUBJECT</label>
          {formInput({ name: 'subject', type: 'text', placeholder: 'What is this regarding?', required: true })}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '11px', fontWeight: 700, color: '#4a6080', letterSpacing: '0.08em', fontFamily: 'Orbitron, sans-serif' }}>MESSAGE</label>
          <textarea
            name="message"
            placeholder="Describe your issue..."
            rows={5}
            required
            className="game-input"
            style={{ padding: '12px 16px', borderRadius: '8px', resize: 'none', fontFamily: 'Rajdhani, sans-serif', fontSize: '15px' }}
          />
        </div>
        <button type="submit" className="btn-neon" style={{ padding: '14px', borderRadius: '8px', fontSize: '12px', letterSpacing: '0.1em', marginTop: '8px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <Zap size={16} /> SEND VIA TELEGRAM
        </button>
      </form>
    </main>
  );

  const renderView = () => {
    switch (currentView) {
      case 'home': return renderHome();
      case 'login': return renderLogin();
      case 'register': return renderRegister();
      case 'profile': return renderProfile();
      case 'history': return renderHistory();
      case 'support': return renderSupport();
      case 'missions': return renderMissions();
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <div className="game-bg" />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {renderHeader()}
        {renderView()}
      </div>
    </div>
  );
}
