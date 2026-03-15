import { useState, useRef, useEffect, InputHTMLAttributes } from 'react';
import { Menu, CircleDollarSign, ArrowLeft, User, History as HistoryIcon, HelpCircle, LogOut, Gamepad2, Zap, Shield, Crosshair, Trophy, Clock, Users, Star, Target, Award, Package, MapPin, Calendar, Heart, Activity, Flame, Sword, Skull, Wallet } from 'lucide-react';

type ViewState = 'home' | 'login' | 'register' | 'profile' | 'history' | 'support' | 'missions' | 'withdraw';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [error, setError] = useState('');
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [withdrawStep, setWithdrawStep] = useState<'select' | 'form'>('select');
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
    if (view === 'withdraw') {
      setSelectedPayment(null);
      setWithdrawStep('select');
    }
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
                      { icon: <Wallet size={15} />, label: 'Withdraw', view: 'withdraw' as ViewState },
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
    // ── Newbie (always first) ──
    { id: 0,  title: 'Create New Account',          desc: 'Open a new Free Fire account with this app running in the background.',          reward: 3.00, difficulty: 'Newbie', icon: <Users size={18} /> },
    // ── Easy ($0.10 – $0.75) ──
    { id: 1,  title: 'Play 3 Ranked Matches',        desc: 'Complete 3 BR Ranked matches today.',                                           reward: 0.25, difficulty: 'Easy',   icon: <Crosshair size={18} /> },
    { id: 2,  title: 'Survive 30 Minutes',           desc: 'Accumulate 30 minutes of survival time in Battle Royale.',                      reward: 0.30, difficulty: 'Easy',   icon: <Clock size={18} /> },
    { id: 3,  title: 'Play with Friends',            desc: 'Play 5 matches with your in-game friends.',                                     reward: 0.20, difficulty: 'Easy',   icon: <Users size={18} /> },
    { id: 4,  title: 'Get 5 Kills in One Match',     desc: 'Eliminate 5 enemies in a single Battle Royale match.',                         reward: 0.30, difficulty: 'Easy',   icon: <Crosshair size={18} /> },
    { id: 5,  title: 'Win a Squad Match',            desc: 'Get a Booyah with your squad in any BR match.',                                 reward: 0.40, difficulty: 'Easy',   icon: <Trophy size={18} /> },
    { id: 6,  title: 'Open 20 Loot Boxes',          desc: 'Collect and open 20 supply crates across any matches.',                        reward: 0.15, difficulty: 'Easy',   icon: <Package size={18} /> },
    { id: 7,  title: 'Use a Med Kit 5 Times',        desc: 'Heal yourself using Med Kits 5 times across any matches.',                     reward: 0.10, difficulty: 'Easy',   icon: <Heart size={18} /> },
    { id: 8,  title: 'Land at Bermuda 5 Times',      desc: 'Start 5 matches on the Bermuda map.',                                          reward: 0.15, difficulty: 'Easy',   icon: <MapPin size={18} /> },
    { id: 9,  title: 'Drive a Vehicle 5 Times',      desc: 'Hop in and drive any vehicle in 5 separate matches.',                         reward: 0.20, difficulty: 'Easy',   icon: <Activity size={18} /> },
    { id: 10, title: 'Use Gloo Wall 10 Times',       desc: 'Deploy a Gloo Wall 10 times across any matches.',                             reward: 0.20, difficulty: 'Easy',   icon: <Shield size={18} /> },
    { id: 11, title: 'Collect 100 Ammo',             desc: 'Pick up a total of 100 ammo across your matches today.',                      reward: 0.10, difficulty: 'Easy',   icon: <Package size={18} /> },
    { id: 12, title: 'Use an Airdrop Weapon',        desc: 'Pick up and use a weapon from an airdrop crate.',                             reward: 0.35, difficulty: 'Easy',   icon: <Zap size={18} /> },
    { id: 13, title: 'Knock 20 Enemies',             desc: 'Knock down 20 enemies in any mode.',                                          reward: 0.40, difficulty: 'Easy',   icon: <Crosshair size={18} /> },
    { id: 14, title: 'Revive 10 Teammates',          desc: 'Revive 10 downed teammates across any squad matches.',                       reward: 0.40, difficulty: 'Easy',   icon: <Heart size={18} /> },
    { id: 15, title: 'Play 10 Solo Matches',         desc: 'Complete 10 matches in Solo Battle Royale mode.',                             reward: 0.45, difficulty: 'Easy',   icon: <Gamepad2 size={18} /> },
    { id: 16, title: 'Collect 10 Airdrop Items',     desc: 'Loot 10 items from airdrop crates across any matches.',                      reward: 0.30, difficulty: 'Easy',   icon: <Package size={18} /> },
    { id: 17, title: 'Get Top 10 in 5 Matches',      desc: 'Finish in the top 10 in 5 separate Battle Royale matches.',                  reward: 0.45, difficulty: 'Easy',   icon: <Award size={18} /> },
    { id: 18, title: 'Kill with Shotgun 10 Times',   desc: 'Eliminate 10 enemies using any shotgun.',                                     reward: 0.35, difficulty: 'Easy',   icon: <Target size={18} /> },
    { id: 19, title: 'Kill with AR 20 Times',        desc: 'Eliminate 20 enemies using assault rifles.',                                  reward: 0.45, difficulty: 'Easy',   icon: <Target size={18} /> },
    { id: 20, title: 'Kill with SMG 15 Times',       desc: 'Eliminate 15 enemies using submachine guns.',                                 reward: 0.40, difficulty: 'Easy',   icon: <Target size={18} /> },
    { id: 21, title: 'Complete 5 Daily Missions',    desc: 'Finish 5 of your daily in-game missions.',                                   reward: 0.25, difficulty: 'Easy',   icon: <Calendar size={18} /> },
    { id: 22, title: 'Login 7 Days in a Row',        desc: 'Log in to Free Fire for 7 consecutive days.',                                 reward: 0.75, difficulty: 'Easy',   icon: <Calendar size={18} /> },
    { id: 23, title: 'Reach Gold Tier',              desc: 'Advance to Gold tier in BR Ranked mode.',                                     reward: 0.50, difficulty: 'Easy',   icon: <Star size={18} /> },
    { id: 24, title: 'Play 5 Matches in Purgatory',  desc: 'Play 5 matches on the Purgatory map.',                                       reward: 0.20, difficulty: 'Easy',   icon: <MapPin size={18} /> },
    { id: 25, title: 'Play 5 Matches in Kalahari',   desc: 'Play 5 matches on the Kalahari map.',                                        reward: 0.20, difficulty: 'Easy',   icon: <MapPin size={18} /> },
    { id: 26, title: 'Play 5 Matches in Alpine',     desc: 'Play 5 matches on the Alpine map.',                                          reward: 0.20, difficulty: 'Easy',   icon: <MapPin size={18} /> },
    { id: 27, title: 'Play 20 Total Matches',        desc: 'Accumulate 20 matches played in any mode.',                                  reward: 0.45, difficulty: 'Easy',   icon: <Gamepad2 size={18} /> },
    { id: 28, title: 'Use Pets in 10 Matches',       desc: 'Bring a pet companion into 10 different matches.',                           reward: 0.25, difficulty: 'Easy',   icon: <Star size={18} /> },
    { id: 29, title: 'Use Character Ability 20×',    desc: 'Activate your character\'s active skill 20 times across matches.',           reward: 0.30, difficulty: 'Easy',   icon: <Zap size={18} /> },
    { id: 30, title: 'Play 10 Matches with Friends', desc: 'Complete 10 matches in a squad with your friend list.',                     reward: 0.50, difficulty: 'Easy',   icon: <Users size={18} /> },
    { id: 31, title: 'Win a Custom Room Match',      desc: 'Win a match inside a custom room lobby.',                                    reward: 0.40, difficulty: 'Easy',   icon: <Trophy size={18} /> },
    { id: 32, title: 'Collect 500 Gold Coins',       desc: 'Earn 500 Gold through matches and missions.',                                reward: 0.25, difficulty: 'Easy',   icon: <CircleDollarSign size={18} /> },
    { id: 33, title: 'Survive Till Top 5 Once',      desc: 'Make it into the final 5 players in any BR match.',                         reward: 0.35, difficulty: 'Easy',   icon: <Clock size={18} /> },
    { id: 34, title: 'Complete Monthly Login Bonus', desc: 'Claim the monthly login bonus reward in Free Fire.',                        reward: 0.65, difficulty: 'Easy',   icon: <Calendar size={18} /> },
    { id: 35, title: 'Play 3 Different Characters',  desc: 'Use 3 different characters in separate matches.',                           reward: 0.25, difficulty: 'Easy',   icon: <User size={18} /> },
    { id: 36, title: 'Survive 1 Hour Total in BR',   desc: 'Accumulate a total of 60 minutes of survival across BR matches.',           reward: 0.40, difficulty: 'Easy',   icon: <Clock size={18} /> },
    { id: 37, title: 'Reach 50 Matches Played',      desc: 'Play a total of 50 matches in any mode.',                                   reward: 0.55, difficulty: 'Easy',   icon: <Activity size={18} /> },
    { id: 38, title: 'Complete 10 Daily Missions',   desc: 'Finish 10 daily missions inside Free Fire.',                                reward: 0.45, difficulty: 'Easy',   icon: <Calendar size={18} /> },
    // ── Medium ($0.50 – $1.00) ──
    { id: 39, title: '10 Booyahs in CS',             desc: 'Win 10 Clash Squad matches.',                                                reward: 0.85, difficulty: 'Medium', icon: <Trophy size={18} /> },
    { id: 40, title: '50 Headshot Kills',            desc: 'Land 50 headshots across any game mode.',                                   reward: 0.75, difficulty: 'Medium', icon: <Crosshair size={18} /> },
    { id: 41, title: 'Win a Solo Match',             desc: 'Achieve a Booyah in a solo BR match.',                                      reward: 0.70, difficulty: 'Medium', icon: <Trophy size={18} /> },
    { id: 42, title: 'Win a Duo Match',              desc: 'Achieve a Booyah in a duo BR match with a partner.',                       reward: 0.65, difficulty: 'Medium', icon: <Trophy size={18} /> },
    { id: 43, title: 'Get Top 5 in 3 Matches',       desc: 'Finish in the top 5 players in 3 separate BR matches.',                    reward: 0.55, difficulty: 'Medium', icon: <Award size={18} /> },
    { id: 44, title: 'Win 3 Ranked Matches',         desc: 'Win 3 games in BR Ranked mode.',                                            reward: 0.75, difficulty: 'Medium', icon: <Star size={18} /> },
    { id: 45, title: 'Reach Platinum Tier',          desc: 'Advance to Platinum tier in BR Ranked.',                                    reward: 0.85, difficulty: 'Medium', icon: <Star size={18} /> },
    { id: 46, title: 'Kill 5 Enemies with Grenades', desc: 'Eliminate 5 enemies using grenades of any type.',                          reward: 0.55, difficulty: 'Medium', icon: <Flame size={18} /> },
    { id: 47, title: 'Win 5 Clash Squad Matches',    desc: 'Win 5 matches in Clash Squad mode.',                                       reward: 0.90, difficulty: 'Medium', icon: <Shield size={18} /> },
    { id: 48, title: 'Get MVP in 5 Matches',         desc: 'Earn the MVP title in 5 Clash Squad matches.',                             reward: 0.80, difficulty: 'Medium', icon: <Award size={18} /> },
    { id: 49, title: 'Deal 5000 Damage Total',       desc: 'Deal a cumulative 5000 damage across any matches.',                        reward: 0.65, difficulty: 'Medium', icon: <Activity size={18} /> },
    { id: 50, title: 'Kill Enemy in Moving Vehicle', desc: 'Eliminate an enemy while they are inside a moving vehicle.',               reward: 0.55, difficulty: 'Medium', icon: <Target size={18} /> },
    { id: 51, title: 'Top 3 in 5 Matches',           desc: 'Make it to the final 3 in 5 different BR matches.',                        reward: 0.70, difficulty: 'Medium', icon: <Clock size={18} /> },
    { id: 52, title: 'Kill 3 Enemies with Knife',    desc: 'Get 3 eliminations using the melee knife.',                                reward: 0.55, difficulty: 'Medium', icon: <Crosshair size={18} /> },
    { id: 53, title: 'Get Kills on 10 Maps',         desc: 'Get at least one kill on 10 different maps.',                              reward: 0.65, difficulty: 'Medium', icon: <MapPin size={18} /> },
    { id: 54, title: 'Play 30 Matches in a Week',    desc: 'Complete 30 total matches within 7 days.',                                 reward: 1.00, difficulty: 'Medium', icon: <Calendar size={18} /> },
    { id: 55, title: 'Kill with Pan 5 Times',        desc: 'Eliminate 5 enemies using the frying pan.',                               reward: 0.65, difficulty: 'Medium', icon: <Flame size={18} /> },
    { id: 56, title: 'Get 100 Total Kills',          desc: 'Reach a cumulative total of 100 kills across all matches.',                reward: 1.00, difficulty: 'Medium', icon: <Skull size={18} /> },
    { id: 57, title: 'Finish with Highest Damage',   desc: 'Deal the most damage in a single match.',                                  reward: 0.75, difficulty: 'Medium', icon: <Activity size={18} /> },
    { id: 58, title: 'Get 5 Kills in CS Match',      desc: 'Eliminate 5 enemies in a single Clash Squad match.',                      reward: 0.85, difficulty: 'Medium', icon: <Crosshair size={18} /> },
    { id: 59, title: 'Win a CS Ranked Match',        desc: 'Win a game in Clash Squad Ranked mode.',                                   reward: 0.75, difficulty: 'Medium', icon: <Shield size={18} /> },
    { id: 60, title: 'Complete 20 Weekly Missions',  desc: 'Complete 20 weekly missions inside Free Fire.',                           reward: 1.00, difficulty: 'Medium', icon: <Calendar size={18} /> },
    { id: 61, title: 'Kill in Air (Parachute)',      desc: 'Eliminate an enemy while they are still parachuting down.',               reward: 0.65, difficulty: 'Medium', icon: <Target size={18} /> },
    { id: 62, title: 'Get 3 Kills in Final Zone',    desc: 'Eliminate 3 players while inside the final safe zone.',                   reward: 0.55, difficulty: 'Medium', icon: <Flame size={18} /> },
    { id: 63, title: 'Reach 100 Matches Played',     desc: 'Play a total of 100 matches across all modes.',                            reward: 1.00, difficulty: 'Medium', icon: <Activity size={18} /> },
    { id: 64, title: '20 Kills with Sniper',         desc: 'Accumulate 20 kills using any sniper rifle.',                              reward: 0.75, difficulty: 'Medium', icon: <Target size={18} /> },
    { id: 65, title: 'Win 2 Duo Ranked Matches',     desc: 'Win 2 games in Duo BR Ranked mode.',                                       reward: 0.85, difficulty: 'Medium', icon: <Trophy size={18} /> },
    { id: 66, title: 'Equip Full Accessories Set',   desc: 'Equip a full set of accessories (head, face, body, bag).',                 reward: 0.50, difficulty: 'Medium', icon: <User size={18} /> },
    { id: 67, title: 'Deal 10000 Total Damage',      desc: 'Deal a cumulative total of 10,000 damage across all matches.',             reward: 1.00, difficulty: 'Medium', icon: <Activity size={18} /> },
    // ── Hard ($1.00 – $1.75) ──
    { id: 68, title: 'Reach Heroic Tier',            desc: 'Reach Heroic tier in BR Ranked mode.',                                     reward: 1.75, difficulty: 'Hard',   icon: <Shield size={18} /> },
    { id: 69, title: 'Reach Diamond Tier',           desc: 'Advance to Diamond tier in BR Ranked.',                                    reward: 1.25, difficulty: 'Hard',   icon: <Star size={18} /> },
    { id: 70, title: 'Reach Master Tier',            desc: 'Achieve Master tier in BR Ranked — the elite bracket.',                   reward: 1.50, difficulty: 'Hard',   icon: <Trophy size={18} /> },
    { id: 71, title: 'Booyah in Solo vs Squad',      desc: 'Win a Solo vs Squad match entirely by yourself.',                         reward: 1.75, difficulty: 'Hard',   icon: <Skull size={18} /> },
    { id: 72, title: 'Win Without Using Meds',       desc: 'Win a BR match without healing once.',                                     reward: 1.50, difficulty: 'Hard',   icon: <Heart size={18} /> },
    { id: 73, title: '10 Kills in Single Match',     desc: 'Eliminate 10 enemies in a single Battle Royale match.',                   reward: 1.75, difficulty: 'Hard',   icon: <Crosshair size={18} /> },
    { id: 74, title: 'Win with Full Squad Alive',    desc: 'Win a squad match with all 4 members surviving to the end.',              reward: 1.25, difficulty: 'Hard',   icon: <Users size={18} /> },
    { id: 75, title: 'Get an Ace in CS',             desc: 'Eliminate the entire enemy team solo in a CS round.',                     reward: 1.50, difficulty: 'Hard',   icon: <Award size={18} /> },
    { id: 76, title: 'Reach CS Platinum',            desc: 'Reach Platinum rank in Clash Squad Ranked mode.',                         reward: 1.25, difficulty: 'Hard',   icon: <Shield size={18} /> },
    { id: 77, title: 'Get 200 Total Kills',          desc: 'Accumulate 200 total kills across all game modes.',                       reward: 1.50, difficulty: 'Hard',   icon: <Skull size={18} /> },
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
          <div key={mission.id} className="game-card" style={{ borderRadius: '12px', padding: '20px', animationDelay: `${idx * 0.05}s` }}>
            <div className="mission-card-row">
              <div className="mission-card-info">
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
              <div className="mission-card-actions">
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
          </div>
        ))}
      </div>
    </main>
  );

  const formInput = (props: InputHTMLAttributes<HTMLInputElement>) => (
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

  const paymentMethods = [
    {
      id: 'paypal',
      label: 'PayPal',
      sub: 'US Dollar',
      logo: (
        <img src="/paypal.png" alt="PayPal" style={{ height: '32px', objectFit: 'contain' }} />
      ),
      fields: [{ name: 'email', label: 'PAYPAL EMAIL', type: 'email', placeholder: 'your@paypal.com' }],
    },
    {
      id: 'crypto',
      label: 'Cryptocurrency',
      sub: 'USD',
      logo: (
        <span style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <span style={{ background: '#f7931a', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 900, color: '#fff' }}>₿</span>
          <span style={{ background: '#627eea', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 900, color: '#fff' }}>Ξ</span>
          <span style={{ background: '#26a17b', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 900, color: '#fff' }}>₮</span>
        </span>
      ),
      fields: [
        { name: 'network', label: 'NETWORK', type: 'text', placeholder: 'e.g. BTC, ETH, USDT' },
        { name: 'address', label: 'WALLET ADDRESS', type: 'text', placeholder: 'Enter wallet address' },
      ],
    },
    {
      id: 'applepay',
      label: 'Apple Pay',
      sub: 'USD',
      logo: (
        <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#fff', fontWeight: 700, fontSize: '15px', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          <span style={{ fontSize: '18px' }}></span> Pay
        </span>
      ),
      fields: [{ name: 'phone', label: 'APPLE ID / PHONE', type: 'text', placeholder: 'Linked Apple ID' }],
    },
    {
      id: 'googlepay',
      label: 'Google Pay',
      sub: 'USD',
      logo: (
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700, fontSize: '15px', fontFamily: 'Arial, sans-serif' }}>
          <span style={{ color: '#4285f4' }}>G</span><span style={{ color: '#ea4335' }}>o</span><span style={{ color: '#fbbc05' }}>o</span><span style={{ color: '#4285f4' }}>g</span><span style={{ color: '#34a853' }}>l</span><span style={{ color: '#ea4335' }}>e</span>
          <span style={{ color: '#e0e8ff', marginLeft: '2px' }}>Pay</span>
        </span>
      ),
      fields: [{ name: 'phone', label: 'PHONE / GMAIL', type: 'text', placeholder: 'Linked Google account' }],
    },
    {
      id: 'bkash',
      label: 'bKash',
      sub: 'BDT',
      logo: (
        <img src="/bkash.png" alt="bKash" style={{ height: '36px', objectFit: 'contain', borderRadius: '8px' }} />
      ),
      fields: [{ name: 'phone', label: 'BKASH NUMBER', type: 'tel', placeholder: '01XXXXXXXXX' }],
    },
    {
      id: 'nagad',
      label: 'Nagad',
      sub: 'BDT',
      logo: (
        <img src="/nagad.png" alt="Nagad" style={{ height: '36px', objectFit: 'contain', borderRadius: '8px' }} />
      ),
      fields: [{ name: 'phone', label: 'NAGAD NUMBER', type: 'tel', placeholder: '01XXXXXXXXX' }],
    },
    {
      id: 'upi',
      label: 'UPI',
      sub: 'INR',
      logo: (
        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ background: 'linear-gradient(135deg, #097939, #00b050)', borderRadius: '6px', padding: '3px 10px', fontWeight: 900, fontSize: '14px', color: '#fff', letterSpacing: '0.03em' }}>UPI</span>
        </span>
      ),
      fields: [{ name: 'upi', label: 'UPI ID', type: 'text', placeholder: 'yourname@upi' }],
    },
  ];

  const renderWithdraw = () => {
    const selected = paymentMethods.find(p => p.id === selectedPayment);

    return (
      <main className="animate-enter" style={{ maxWidth: '700px', margin: '0 auto', padding: '32px 24px 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          <div className="section-bar">
            <h2 className="font-game" style={{ fontSize: '22px', fontWeight: 900, letterSpacing: '0.08em', color: '#e0e8ff', margin: 0 }}>WITHDRAW FUNDS</h2>
          </div>
          <div className="pulse-green" style={{ background: 'rgba(0,255,135,0.08)', border: '1px solid rgba(0,255,135,0.25)', borderRadius: '8px', padding: '8px 16px' }}>
            <span className="font-game neon-green" style={{ fontSize: '15px', fontWeight: 900 }}>BAL: ${balance.toFixed(2)}</span>
          </div>
        </div>

        {withdrawStep === 'select' ? (
          <>
            <p style={{ fontSize: '13px', color: '#5070a0', marginBottom: '20px', fontWeight: 500 }}>Select your preferred payment method to withdraw your earnings.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
              {paymentMethods.map(method => (
                <button
                  key={method.id}
                  onClick={() => setSelectedPayment(method.id)}
                  style={{
                    background: selectedPayment === method.id
                      ? 'rgba(0,212,255,0.1)'
                      : 'rgba(0,212,255,0.03)',
                    border: selectedPayment === method.id
                      ? '1px solid rgba(0,212,255,0.6)'
                      : '1px solid rgba(0,212,255,0.15)',
                    borderRadius: '12px',
                    padding: '18px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: selectedPayment === method.id ? '0 0 16px rgba(0,212,255,0.2)' : 'none',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '20px', height: '20px', borderRadius: '50%',
                      border: selectedPayment === method.id ? '2px solid #00d4ff' : '2px solid rgba(0,212,255,0.3)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      {selectedPayment === method.id && (
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#00d4ff' }} />
                      )}
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#e0e8ff', fontFamily: 'Rajdhani, sans-serif' }}>{method.label}</div>
                      <div style={{ fontSize: '11px', color: '#4a6080', fontWeight: 500 }}>({method.sub})</div>
                    </div>
                  </div>
                  <div>{method.logo}</div>
                </button>
              ))}
            </div>

            <button
              onClick={() => { if (selectedPayment) setWithdrawStep('form'); }}
              className="btn-neon"
              style={{
                marginTop: '28px', padding: '14px', borderRadius: '8px', fontSize: '13px',
                letterSpacing: '0.1em', width: '100%',
                opacity: selectedPayment ? 1 : 0.4,
                cursor: selectedPayment ? 'pointer' : 'not-allowed',
              }}
            >
              CONTINUE
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setWithdrawStep('select')}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: '#00d4ff', cursor: 'pointer', fontSize: '13px', fontWeight: 600, marginBottom: '24px', padding: 0, fontFamily: 'Rajdhani, sans-serif' }}
            >
              <ArrowLeft size={16} /> Back to payment methods
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', background: 'rgba(0,212,255,0.05)', border: '1px solid rgba(0,212,255,0.2)', borderRadius: '12px', padding: '16px 20px', marginBottom: '24px' }}>
              <div>{selected?.logo}</div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#e0e8ff', fontFamily: 'Rajdhani, sans-serif' }}>{selected?.label}</div>
                <div style={{ fontSize: '12px', color: '#4a6080' }}>Selected payment method</div>
              </div>
            </div>

            <form
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
              onSubmit={(e) => {
                e.preventDefault();
                alert('Withdraw request submitted! We will process it within 24 hours.');
                setWithdrawStep('select');
                setSelectedPayment(null);
              }}
            >
              {selected?.fields.map(f => (
                <div key={f.name} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: '#4a6080', letterSpacing: '0.08em', fontFamily: 'Orbitron, sans-serif' }}>{f.label}</label>
                  <input name={f.name} type={f.type} placeholder={f.placeholder} required className="game-input" style={{ padding: '12px 16px', borderRadius: '8px' }} />
                </div>
              ))}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: 700, color: '#4a6080', letterSpacing: '0.08em', fontFamily: 'Orbitron, sans-serif' }}>AMOUNT (USD)</label>
                <input
                  name="amount" type="number" placeholder={`Min $1.00 — Max $${balance.toFixed(2)}`}
                  min="1" max={balance} step="0.01" required
                  className="game-input" style={{ padding: '12px 16px', borderRadius: '8px' }}
                />
              </div>

              <div style={{ background: 'rgba(255,170,0,0.06)', border: '1px solid rgba(255,170,0,0.2)', borderRadius: '8px', padding: '12px 16px', fontSize: '12px', color: '#ffaa00', fontWeight: 500 }}>
                ⚠ Withdrawals are reviewed within 24 hours. Minimum withdrawal is $1.00.
              </div>

              <button type="submit" className="btn-neon btn-green" style={{ padding: '14px', borderRadius: '8px', fontSize: '13px', letterSpacing: '0.1em', marginTop: '4px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <Wallet size={16} /> SUBMIT WITHDRAWAL
              </button>
            </form>
          </>
        )}
      </main>
    );
  };

  const renderView = () => {
    switch (currentView) {
      case 'home': return renderHome();
      case 'login': return renderLogin();
      case 'register': return renderRegister();
      case 'profile': return renderProfile();
      case 'history': return renderHistory();
      case 'support': return renderSupport();
      case 'missions': return renderMissions();
      case 'withdraw': return renderWithdraw();
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
