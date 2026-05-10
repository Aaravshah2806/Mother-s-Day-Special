import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SharePanel({ open, onClose }) {
  const [copied, setCopied] = useState(false);

  // Build the share URL — base URL without ?edit=true
  const shareUrl = (() => {
    const u = new URL(window.location.href);
    u.searchParams.delete('edit');
    return u.toString().replace(/\?$/, '');
  })();

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&color=4A2C2A&bgcolor=FFF8F0&data=${encodeURIComponent(shareUrl)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
      const ta = document.createElement('textarea');
      ta.value = shareUrl;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleDownloadQR = () => {
    const a = document.createElement('a');
    a.href = qrUrl;
    a.download = 'house-of-memories-qr.png';
    a.target = '_blank';
    a.click();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="share-panel-backdrop"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="share-panel-card"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{ fontSize: '2.2rem', marginBottom: 8 }}>💌</div>
              <h2 style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: '1.6rem',
                fontWeight: 700,
                color: '#4A2C2A',
                marginBottom: 6,
              }}>
                Share With Mom
              </h2>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.85rem',
                color: '#A07050',
              }}>
                Send this link — she'll see your beautiful gift 💛
              </p>
            </div>

            {/* QR Code */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: 20,
            }}>
              <div style={{
                background: '#FFF8F0',
                borderRadius: 16,
                padding: 16,
                boxShadow: '0 4px 24px rgba(74,44,42,0.1)',
                border: '1px solid rgba(212,165,116,0.2)',
              }}>
                <img
                  src={qrUrl}
                  alt="QR Code"
                  width={180}
                  height={180}
                  style={{ display: 'block', borderRadius: 8 }}
                />
              </div>
            </div>

            <button
              onClick={handleDownloadQR}
              className="share-panel-btn share-panel-btn-secondary"
              style={{ marginBottom: 20, width: '100%' }}
            >
              📥 Download QR Code
            </button>

            {/* URL */}
            <div style={{
              background: 'rgba(212,165,116,0.08)',
              border: '1px solid rgba(212,165,116,0.2)',
              borderRadius: 12,
              padding: '10px 14px',
              marginBottom: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}>
              <span style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.78rem',
                color: '#7A5040',
                flex: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
                {shareUrl}
              </span>
            </div>

            <button
              onClick={handleCopy}
              className="share-panel-btn share-panel-btn-primary"
              style={{ width: '100%', marginBottom: 12 }}
            >
              {copied ? '✅ Copied!' : '📋 Copy Link'}
            </button>

            {/* WhatsApp / native share */}
            <div style={{ display: 'flex', gap: 8 }}>
              <a
                href={`https://wa.me/?text=${encodeURIComponent('Happy Mother\'s Day! 💛 I made this for you:\n' + shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-panel-btn share-panel-btn-whatsapp"
                style={{ flex: 1, textDecoration: 'none', textAlign: 'center' }}
              >
                💬 WhatsApp
              </a>
              {navigator.share && (
                <button
                  onClick={() => navigator.share({ title: 'House of Memories', text: 'Happy Mother\'s Day! 💛', url: shareUrl })}
                  className="share-panel-btn share-panel-btn-secondary"
                  style={{ flex: 1 }}
                >
                  📤 Share
                </button>
              )}
            </div>

            {/* Close */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: 12,
                right: 14,
                background: 'none',
                border: 'none',
                fontSize: '1.3rem',
                cursor: 'pointer',
                color: '#A07050',
                padding: 4,
              }}
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
