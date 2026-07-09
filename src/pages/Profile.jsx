import { useState, useContext } from 'react';
import { 
  User, ShoppingBag, Edit2, LogOut, 
  Check, X, Sparkles, Shield, Mail, Phone, Compass
} from 'lucide-react';
import ToastContext from '../context/ToastContext';

export default function Profile() {
  const { triggerToast } = useContext(ToastContext);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Mock User State
  const [userInfo, setUserInfo] = useState({
    name: "Aditya Sharma",
    spiritualName: "Aditya Dev (Shandilya Gotra)",
    email: "aditya.sharma@puja.com",
    phone: "+91 98765 43210"
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ ...userInfo });

  // Passwords State
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Verification States
  const [verification, setVerification] = useState({
    emailVerified: false,
    mobileVerified: false
  });

  const [otpSent, setOtpSent] = useState({
    email: false,
    mobile: false
  });

  const [otpInput, setOtpInput] = useState({
    email: "",
    mobile: ""
  });

  // Mock Orders State
  const [orders, setOrders] = useState([
    {
      id: "APB-9082",
      date: "28 Jun 2026",
      total: "₹2,450",
      status: "Delivered",
      tracking: "Delivered on June 30, 2026 via Speed Post. AWB: APB9082998",
      items: [
        {
          name: "Maha Shivratri Shringar & Puja Kit",
          qty: 1,
          price: "₹1,850",
          image: "https://images.unsplash.com/photo-1609137144813-91b5c464b58e?auto=format&fit=crop&q=80&w=200"
        },
        {
          name: "Pure Sandalwood Incense Sticks",
          qty: 2,
          price: "₹300",
          image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=200"
        }
      ]
    },
    {
      id: "APB-8941",
      date: "12 May 2026",
      total: "₹1,200",
      status: "In Transit",
      tracking: "Dispatched from Vrindavan Hub. AWB: APB89419208",
      items: [
        {
          name: "Premium Vrindavan Tulsi Mala (108 Beads)",
          qty: 1,
          price: "₹1,200",
          image: "https://images.unsplash.com/photo-1590076214667-c0f37bdf8f23?auto=format&fit=crop&q=80&w=200"
        }
      ]
    }
  ]);

  const [expandedOrder, setExpandedOrder] = useState(null);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setUserInfo(editForm);
    setIsEditing(false);
    triggerToast("Devotee details updated successfully!");
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      triggerToast("Passwords do not match!");
      return;
    }
    if (passwords.newPassword.length < 6) {
      triggerToast("Password must be at least 6 characters.");
      return;
    }
    triggerToast("Password updated successfully!");
    setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const sendEmailOtp = () => {
    setOtpSent(prev => ({ ...prev, email: true }));
    triggerToast("Verification OTP sent to " + userInfo.email);
  };

  const verifyEmailOtp = (e) => {
    e.preventDefault();
    if (otpInput.email.trim().length === 6) {
      setVerification(prev => ({ ...prev, emailVerified: true }));
      setOtpSent(prev => ({ ...prev, email: false }));
      triggerToast("Email coordinate verified successfully!");
    } else {
      triggerToast("Please enter a valid 6-digit OTP.");
    }
  };

  const sendMobileOtp = () => {
    setOtpSent(prev => ({ ...prev, mobile: true }));
    triggerToast("Verification OTP sent to " + userInfo.phone);
  };

  const verifyMobileOtp = (e) => {
    e.preventDefault();
    if (otpInput.mobile.trim().length === 6) {
      setVerification(prev => ({ ...prev, mobileVerified: true }));
      setOtpSent(prev => ({ ...prev, mobile: false }));
      triggerToast("Mobile coordinate verified successfully!");
    } else {
      triggerToast("Please enter a valid 6-digit OTP.");
    }
  };

  const handleLogout = () => {
    triggerToast("Devotional logout triggered. May your day be blessed!");
  };

  return (
    <div className="page-container">
      <div className="max-w-7xl mx-auto space-y-10 relative">
        
        {/* Glow Effects */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[800px] h-[400px] rounded-full bg-saffron/5 blur-[150px]" />
        </div>

        {/* Page Title */}
        <div className="section-header-wrap relative z-10 text-center">
          <span className="section-header-tag">✦ DEVOTEE PROFILE ✦</span>
          <h1 className="section-header-title">My Spiritual Sanctuary</h1>
          <div className="w-24 h-[1px] bg-gold/30 mx-auto mt-4" />
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
          
          {/* SIDEBAR: Devotee Info & Navigation */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Devotee Info Box */}
            <div className="border border-gold/15 bg-mid-bg/40 backdrop-blur-md rounded-sm p-6 text-center space-y-4">
              <div className="relative w-24 h-24 mx-auto">
                <div className="absolute inset-0 rounded-full border border-dashed border-gold/40 animate-[spin_40s_linear_infinite]" />
                <div className="absolute inset-1.5 rounded-full border border-gold/25" />
                <div className="absolute inset-3 rounded-full bg-gradient-to-tr from-saffron to-gold-bright flex items-center justify-center shadow-lg shadow-saffron/20">
                  <span className="font-cinzel text-dark-bg text-3xl font-black tracking-wider leading-none">
                    {userInfo.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              </div>
              
              <div className="space-y-1">
                <h3 className="font-cinzel text-base font-bold text-cream tracking-wide">
                  {userInfo.name}
                </h3>
                <span className="font-sanskrit text-xs text-gold-bright/80 block italic">
                  {userInfo.spiritualName}
                </span>
              </div>
            </div>

            {/* Navigation Options */}
            <div className="border border-gold/15 bg-mid-bg/25 backdrop-blur-md rounded-sm p-2 flex flex-col gap-1">
              <button 
                onClick={() => { setActiveTab('dashboard'); setIsEditing(false); }}
                className={`flex items-center gap-3 px-4 py-3 rounded-sm font-cinzel text-xs uppercase tracking-wider text-left transition cursor-pointer ${
                  activeTab === 'dashboard' 
                    ? 'bg-gold/10 text-gold-bright border-l-2 border-gold-bright' 
                    : 'text-cream/70 hover:bg-white/[0.02] hover:text-cream'
                }`}
              >
                <User className="w-4 h-4 text-gold" />
                Spiritual Ledger
              </button>
              
              <button 
                onClick={() => setActiveTab('orders')}
                className={`flex items-center gap-3 px-4 py-3 rounded-sm font-cinzel text-xs uppercase tracking-wider text-left transition cursor-pointer ${
                  activeTab === 'orders' 
                    ? 'bg-gold/10 text-gold-bright border-l-2 border-gold-bright' 
                    : 'text-cream/70 hover:bg-white/[0.02] hover:text-cream'
                }`}
              >
                <ShoppingBag className="w-4 h-4 text-gold" />
                Altar Orders ({orders.length})
              </button>
              
              <div className="border-t border-gold/10 my-2 pt-2" />
              
              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-sm font-cinzel text-xs uppercase tracking-wider text-left text-saffron hover:bg-saffron/5 hover:text-saffron-deep transition cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Devotional Log Out
              </button>
            </div>

          </div>

          {/* MAIN CONTENT AREA */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* ACCOUNT LEDGER (DASHBOARD TAB) */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6 animate-fade-in">
                
                {/* View Registry Details */}
                {!isEditing ? (
                  <div className="border border-gold/15 bg-mid-bg/40 backdrop-blur-md rounded-sm p-6 space-y-6">
                    <div className="flex justify-between items-center border-b border-gold/10 pb-4">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-gold-bright" />
                        <h2 className="font-cinzel text-sm font-bold text-cream tracking-widest uppercase">Devotee Registry</h2>
                      </div>
                      <button 
                        onClick={() => { setEditForm({ ...userInfo }); setIsEditing(true); }}
                        className="btn-gold-outline py-1 px-4 text-[10px]"
                      >
                        <Edit2 className="w-3 h-3 mr-1.5" /> Modify Details
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-cormorant text-base">
                      <div className="space-y-1">
                        <span className="block font-cinzel text-[9px] tracking-widest text-gold uppercase">Full Name</span>
                        <p className="text-cream font-medium">{userInfo.name}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="block font-cinzel text-[9px] tracking-widest text-gold uppercase">Spiritual Identity / Gotra</span>
                        <p className="text-cream font-medium italic text-gold-bright/80">{userInfo.spiritualName}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="block font-cinzel text-[9px] tracking-widest text-gold uppercase">Email Coordinate</span>
                        <p className="text-cream font-medium flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-gold/60" /> {userInfo.email}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="block font-cinzel text-[9px] tracking-widest text-gold uppercase">Phone Coordinate</span>
                        <p className="text-cream font-medium flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-gold/60" /> {userInfo.phone}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleEditSubmit} className="border border-gold/15 bg-mid-bg/40 backdrop-blur-md rounded-sm p-6 space-y-6">
                    <div className="flex justify-between items-center border-b border-gold/10 pb-4">
                      <h2 className="font-cinzel text-sm font-bold text-cream tracking-widest uppercase">Modify Details</h2>
                      <button 
                        type="button" 
                        onClick={() => setIsEditing(false)} 
                        className="p-1 hover:bg-gold/10 rounded-full text-cream/70 cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="form-field-card">
                        <label className="form-field-title">Full Name</label>
                        <input 
                          type="text" 
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="form-field-input" 
                          required
                        />
                      </div>

                      <div className="form-field-card">
                        <label className="form-field-title">Spiritual Identity / Gotra</label>
                        <input 
                          type="text" 
                          value={editForm.spiritualName}
                          onChange={(e) => setEditForm({ ...editForm, spiritualName: e.target.value })}
                          className="form-field-input" 
                          required
                        />
                      </div>

                      <div className="form-field-card">
                        <label className="form-field-title">Email Coordinate</label>
                        <input 
                          type="email" 
                          value={editForm.email}
                          onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                          className="form-field-input" 
                          required
                        />
                      </div>

                      <div className="form-field-card">
                        <label className="form-field-title">Phone Coordinate</label>
                        <input 
                          type="text" 
                          value={editForm.phone}
                          onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                          className="form-field-input" 
                          required
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 pt-2">
                      <button type="submit" className="btn-store-primary py-2 px-6 w-auto">
                        Save Registry
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setIsEditing(false)} 
                        className="btn-store-secondary py-2 px-6 w-auto"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                {/* Email and Mobile Verification Card */}
                <div className="border border-gold/15 bg-mid-bg/40 backdrop-blur-md rounded-sm p-6 space-y-6">
                  <div className="flex items-center gap-2 border-b border-gold/10 pb-4">
                    <Shield className="w-4 h-4 text-gold-bright" />
                    <h2 className="font-cinzel text-sm font-bold text-cream tracking-widest uppercase">Security & Verification</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Email Verification */}
                    <div className="border border-gold/10 bg-black/20 p-5 rounded-sm space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="font-cinzel text-xs font-bold text-cream uppercase tracking-wider">Email Verification</span>
                        {verification.emailVerified ? (
                          <span className="badge-status-success">
                            <Check className="w-3 h-3" /> Verified
                          </span>
                        ) : (
                          <span className="badge-status-warning">
                            Unverified
                          </span>
                        )}
                      </div>

                      <p className="font-cormorant text-xs text-cream/70">
                        Verify your email address ({userInfo.email}) to receive safe invoice dispatches and transaction ledger details.
                      </p>

                      {verification.emailVerified ? (
                        <p className="font-cormorant text-xs text-emerald-400 italic">
                          Verified on {new Date().toLocaleDateString('en-IN', {day: 'numeric', month: 'short', year: 'numeric'})}
                        </p>
                      ) : otpSent.email ? (
                        <form onSubmit={verifyEmailOtp} className="space-y-3">
                          <div className="form-field-card p-3">
                            <label className="form-field-title">Enter 6-Digit OTP</label>
                            <input 
                              type="text" 
                              value={otpInput.email}
                              onChange={(e) => setOtpInput(prev => ({ ...prev, email: e.target.value }))}
                              placeholder="e.g. 123456" 
                              className="form-field-input" 
                              maxLength={6}
                              required 
                            />
                          </div>
                          <div className="flex gap-2">
                            <button type="submit" className="btn-store-primary py-1 px-3 text-[10px] w-auto">
                              Verify OTP
                            </button>
                            <button 
                              type="button" 
                              onClick={() => setOtpSent(prev => ({ ...prev, email: false }))} 
                              className="btn-store-secondary py-1 px-3 text-[10px] w-auto"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      ) : (
                        <button 
                          onClick={sendEmailOtp}
                          className="btn-store-primary py-1.5 px-4 w-auto text-[10px]"
                        >
                          Send Verification OTP
                        </button>
                      )}
                    </div>

                    {/* Mobile Verification */}
                    <div className="border border-gold/10 bg-black/20 p-5 rounded-sm space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="font-cinzel text-xs font-bold text-cream uppercase tracking-wider">Mobile Verification</span>
                        {verification.mobileVerified ? (
                          <span className="badge-status-success">
                            <Check className="w-3 h-3" /> Verified
                          </span>
                        ) : (
                          <span className="badge-status-warning">
                            Unverified
                          </span>
                        )}
                      </div>

                      <p className="font-cormorant text-xs text-cream/70">
                        Verify your mobile phone ({userInfo.phone}) to enable instant delivery status notification updates on WhatsApp.
                      </p>

                      {verification.mobileVerified ? (
                        <p className="font-cormorant text-xs text-emerald-400 italic">
                          Verified on {new Date().toLocaleDateString('en-IN', {day: 'numeric', month: 'short', year: 'numeric'})}
                        </p>
                      ) : otpSent.mobile ? (
                        <form onSubmit={verifyMobileOtp} className="space-y-3">
                          <div className="form-field-card p-3">
                            <label className="form-field-title">Enter 6-Digit OTP</label>
                            <input 
                              type="text" 
                              value={otpInput.mobile}
                              onChange={(e) => setOtpInput(prev => ({ ...prev, mobile: e.target.value }))}
                              placeholder="e.g. 123456" 
                              className="form-field-input" 
                              maxLength={6}
                              required 
                            />
                          </div>
                          <div className="flex gap-2">
                            <button type="submit" className="btn-store-primary py-1 px-3 text-[10px] w-auto">
                              Verify OTP
                            </button>
                            <button 
                              type="button" 
                              onClick={() => setOtpSent(prev => ({ ...prev, mobile: false }))} 
                              className="btn-store-secondary py-1 px-3 text-[10px] w-auto"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      ) : (
                        <button 
                          onClick={sendMobileOtp}
                          className="btn-store-primary py-1.5 px-4 w-auto text-[10px]"
                        >
                          Send Verification OTP
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Change Password Card */}
                <form onSubmit={handlePasswordSubmit} className="border border-gold/15 bg-mid-bg/40 backdrop-blur-md rounded-sm p-6 space-y-6">
                  <div className="flex items-center gap-2 border-b border-gold/10 pb-4">
                    <Shield className="w-4 h-4 text-gold-bright" />
                    <h2 className="font-cinzel text-sm font-bold text-cream tracking-widest uppercase">Change Password</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="form-field-card">
                      <label className="form-field-title">Current Password</label>
                      <input 
                        type="password" 
                        value={passwords.currentPassword}
                        onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                        className="form-field-input" 
                        placeholder="••••••••"
                        required
                      />
                    </div>

                    <div className="form-field-card">
                      <label className="form-field-title">New Password</label>
                      <input 
                        type="password" 
                        value={passwords.newPassword}
                        onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                        className="form-field-input" 
                        placeholder="••••••••"
                        required
                      />
                    </div>

                    <div className="form-field-card">
                      <label className="form-field-title">Confirm New Password</label>
                      <input 
                        type="password" 
                        value={passwords.confirmPassword}
                        onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                        className="form-field-input" 
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-2">
                    <button type="submit" className="btn-store-primary py-2 px-6 w-auto">
                      Update Password
                    </button>
                  </div>
                </form>

              </div>
            )}

            {/* ORDERS LEDGER (ORDERS TAB) */}
            {activeTab === 'orders' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center gap-2 border-b border-gold/10 pb-4">
                  <ShoppingBag className="w-4 h-4 text-gold" />
                  <h2 className="font-cinzel text-sm font-bold text-cream tracking-widest uppercase">Sacred Order Ledger</h2>
                </div>

                {orders.length === 0 ? (
                  <div className="text-center py-12 border border-gold/10 bg-mid-bg/10 rounded-sm">
                    <ShoppingBag className="w-12 h-12 text-gold/30 mx-auto mb-3" />
                    <p className="font-cormorant text-cream/60 italic">No sacred items have been ordered yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => {
                      const isExpanded = expandedOrder === order.id;
                      return (
                        <div 
                          key={order.id} 
                          className="border border-gold/15 bg-mid-bg/20 rounded-sm overflow-hidden transition hover:border-gold/30"
                        >
                          {/* Summary Row */}
                          <div 
                            onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                            className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer"
                          >
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 flex-1">
                              <div>
                                <span className="block font-cinzel text-[8px] tracking-wider text-gold uppercase">Order ID</span>
                                <span className="font-cormorant text-sm font-bold text-cream">{order.id}</span>
                              </div>
                              <div>
                                <span className="block font-cinzel text-[8px] tracking-wider text-gold uppercase">Ritual Date</span>
                                <span className="font-cormorant text-sm text-cream">{order.date}</span>
                              </div>
                              <div>
                                <span className="block font-cinzel text-[8px] tracking-wider text-gold uppercase">Total Value</span>
                                <span className="font-cinzel text-xs font-bold text-gold-bright">{order.total}</span>
                              </div>
                              <div>
                                <span className="block font-cinzel text-[8px] tracking-wider text-gold uppercase">Ledger Status</span>
                                <span className={
                                  order.status === 'Delivered' 
                                    ? 'badge-status-success' 
                                    : 'badge-status-warning'
                                }>
                                  {order.status}
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-end sm:justify-start">
                              <span className="font-cinzel text-[10px] text-gold hover:text-gold-bright transition">
                                {isExpanded ? "[ Hide Details ]" : "[ View Items ]"}
                              </span>
                            </div>
                          </div>

                          {/* Expanded Items */}
                          {isExpanded && (
                            <div className="border-t border-gold/10 bg-black/20 p-5 space-y-4 animate-fade-in">
                              
                              <div className="space-y-3">
                                {order.items.map((item, idx) => (
                                  <div key={idx} className="flex gap-4 items-center border-b border-white/5 pb-3 last:border-b-0 last:pb-0">
                                    <img 
                                      src={item.image} 
                                      alt={item.name} 
                                      className="w-12 h-12 rounded object-cover border border-gold/20"
                                    />
                                    <div className="flex-1">
                                      <h4 className="font-cormorant text-sm font-bold text-cream">{item.name}</h4>
                                      <span className="text-[11px] text-cream/50">Qty: {item.qty} × {item.price}</span>
                                    </div>
                                    <div className="text-right">
                                      <span className="font-cinzel text-xs text-cream">{item.price}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <div className="bg-white/[0.02] border border-gold/10 rounded-sm p-3 text-xs font-cormorant text-cream/70 italic flex items-start gap-2">
                                <Compass className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                                <div>
                                  <span className="block font-cinzel text-[8px] tracking-widest text-gold uppercase not-italic mb-0.5">Sacred Coordinates Tracking</span>
                                  {order.tracking}
                                </div>
                              </div>

                              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                <button 
                                  onClick={() => triggerToast(`Re-ordering products from ${order.id}...`)}
                                  className="btn-store-primary text-[9px] py-1.5 px-4 w-auto"
                                >
                                  Reorder Sanctuary Kit
                                </button>
                                <button 
                                  onClick={() => triggerToast("Invoice download generated.")}
                                  className="btn-store-secondary text-[9px] py-1.5 px-4 w-auto"
                                >
                                  Invoice PDF
                                </button>
                              </div>

                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
