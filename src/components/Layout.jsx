import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { TriangleIcon as PrismIcon, LayoutDashboard, Plus, Settings, LogOut } from 'lucide-react';

export default function Layout({ children }) {
  const { isDemo, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => { await signOut(); navigate('/'); };

  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Decisions' },
    { to: '/new', icon: Plus, label: 'New Decision' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="glass sticky top-0 z-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2 no-underline">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-prism-500 to-violet-500 flex items-center justify-center">
              <PrismIcon className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-slate-800 text-lg">Prism</span>
            {isDemo && (
              <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-warm-100 text-warm-600 rounded-full">
                Demo
              </span>
            )}
          </Link>

          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors no-underline ${
                  location.pathname === item.to
                    ? 'bg-prism-50 text-prism-700'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                }`}>
                <item.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            ))}
            <button onClick={handleSignOut}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors ml-2">
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Exit</span>
            </button>
          </div>
        </div>
      </nav>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">{children}</main>
    </div>
  );
}
