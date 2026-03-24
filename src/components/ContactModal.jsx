import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Mail, MessageSquare, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import GlassContainerValorant from './GlassContainerValorant';
import { useTranslation } from 'react-i18next';

export default function ContactModal({ isOpen, onClose }) {
  const { t } = useTranslation();
  const [formState, setFormState] = useState('idle'); // idle, sending, success, error
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState('sending');

    // Simulate API call
    setTimeout(() => {
      setFormState('success');
      // Reset after success
      setTimeout(() => {
        setFormState('idle');
        setFormData({ name: '', email: '', message: '' });
        onClose();
      }, 3000);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-void/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg z-10"
          >
            <GlassContainerValorant className="p-0 overflow-hidden">
              {/* Header */}
              <div className="p-6 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white font-jura uppercase tracking-tight">
                    {t('contact.title', 'ESTABLISH CONNECTION')}
                  </h2>
                  <p className="mono text-[10px] text-text-dim uppercase tracking-widest mt-1">
                    {t('contact.subtitle', 'Send a secure message to the station.')}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/5 rounded-full text-text-dim hover:text-white transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form Content */}
              <div className="p-8">
                {formState === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="py-12 flex flex-col items-center text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-cyan/10 border border-cyan/30 flex items-center justify-center mb-6 text-cyan shadow-[0_0_20px_rgba(0,229,255,0.2)]">
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 uppercase font-jura">
                      {t('contact.success', 'TRANSMISSION RECEIVED')}
                    </h3>
                    <p className="mono text-xs text-text-dim uppercase tracking-wider">
                      Target recognized. Awaiting further response...
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Field */}
                    <div className="space-y-2 group">
                      <label className="mono text-[10px] text-text-dim group-focus-within:text-cyan transition-colors uppercase tracking-widest font-bold">
                        {t('contact.name', 'OPERATOR NAME')}
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-cyan transition-colors" size={16} />
                        <input
                          required
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-white/[0.03] border border-white/10 rounded-sm py-3.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-cyan/50 focus:bg-white/[0.05] transition-all placeholder:text-white/10 uppercase font-mono tracking-tighter"
                          placeholder={t('contact.name', 'OPERATOR NAME')}
                        />
                      </div>
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2 group">
                      <label className="mono text-[10px] text-text-dim group-focus-within:text-cyan transition-colors uppercase tracking-widest font-bold">
                        {t('contact.email', 'COMMUNICATION FREQUENCY')}
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-cyan transition-colors" size={16} />
                        <input
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-white/[0.03] border border-white/10 rounded-sm py-3.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-cyan/50 focus:bg-white/[0.05] transition-all placeholder:text-white/10"
                          placeholder="FREQ@SYSTEM.NODE"
                        />
                      </div>
                    </div>

                    {/* Message Field */}
                    <div className="space-y-2 group">
                      <label className="mono text-[10px] text-text-dim group-focus-within:text-cyan transition-colors uppercase tracking-widest font-bold">
                        {t('contact.message', 'MESSAGE CONTENT')}
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-4 top-4 text-white/20 group-focus-within:text-cyan transition-colors" size={16} />
                        <textarea
                          required
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full bg-white/[0.03] border border-white/10 rounded-sm py-3.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-cyan/50 focus:bg-white/[0.05] transition-all placeholder:text-white/10 resize-none font-mono tracking-tighter"
                          placeholder="..."
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      disabled={formState === 'sending'}
                      type="submit"
                      className="w-full group/btn relative py-4 bg-cyan/10 border border-cyan/30 overflow-hidden transition-all hover:bg-cyan/20 cursor-pointer disabled:opacity-50"
                    >
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out" />
                      <div className="flex items-center justify-center gap-2 relative z-10">
                        {formState === 'sending' ? (
                          <>
                            <div className="w-4 h-4 border-2 border-cyan/30 border-t-cyan rounded-full animate-spin" />
                            <span className="mono text-[11px] font-bold text-cyan tracking-[0.3em] uppercase">
                              {t('contact.sending', 'SENDING...')}
                            </span>
                          </>
                        ) : (
                          <>
                            <Send size={16} className="text-cyan" />
                            <span className="mono text-[11px] font-bold text-cyan tracking-[0.3em] uppercase">
                              {t('contact.send', 'SEND TRANSMISSION')}
                            </span>
                          </>
                        )}
                      </div>
                    </button>

                    {/* Footer Info */}
                    <div className="flex items-center justify-center gap-2 pt-2 opacity-30">
                      <ShieldCheck size={12} className="text-cyan" />
                      <span className="mono text-[8px] uppercase tracking-[0.4em] font-bold">
                        SECURE_CHANNEL // END_TO_END_ENCRYPTED
                      </span>
                    </div>
                  </form>
                )}
              </div>
            </GlassContainerValorant>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
