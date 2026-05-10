import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEditMode } from '../../context/EditContext';
import {
  exportCustomizations,
  importCustomizations,
  clearAllCustomizations,
  hasAnyCustomizations,
} from '../../hooks/useCustomData';

export default function EditToolbar({ onOpenShare }) {
  const { isEditMode } = useEditMode();
  const importRef = useRef(null);
  const [toast, setToast] = useState('');
  const [confirmReset, setConfirmReset] = useState(false);

  if (!isEditMode) return null;

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleImport = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const count = await importCustomizations(file);
      showToast(`✅ Imported ${count} customizations — reloading...`);
      setTimeout(() => window.location.reload(), 1200);
    } catch {
      showToast('❌ Invalid file — please use a .json export');
    }
    e.target.value = '';
  };

  const handleReset = () => {
    if (!confirmReset) {
      setConfirmReset(true);
      setTimeout(() => setConfirmReset(false), 4000);
      return;
    }
    clearAllCustomizations();
    showToast('🗑️ All customizations cleared — reloading...');
    setTimeout(() => window.location.reload(), 1200);
  };

  return (
    <>
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
        className="edit-toolbar"
      >
        {/* Edit mode badge */}
        <div className="edit-toolbar-badge">
          <span className="edit-toolbar-dot" />
          <span>Edit Mode</span>
        </div>

        <div className="edit-toolbar-actions">
          <button
            className="edit-toolbar-btn"
            onClick={exportCustomizations}
            title="Export customizations"
          >
            📤 Export
          </button>

          <button
            className="edit-toolbar-btn"
            onClick={() => importRef.current?.click()}
            title="Import customizations"
          >
            📥 Import
          </button>
          <input
            ref={importRef}
            type="file"
            accept=".json"
            onChange={handleImport}
            style={{ display: 'none' }}
          />

          <button
            className="edit-toolbar-btn edit-toolbar-btn-share"
            onClick={onOpenShare}
            title="Share with Mom"
          >
            🔗 Share
          </button>

          <button
            className={`edit-toolbar-btn ${confirmReset ? 'edit-toolbar-btn-danger' : ''}`}
            onClick={handleReset}
            title={confirmReset ? 'Click again to confirm' : 'Reset all customizations'}
          >
            {confirmReset ? '⚠️ Confirm?' : '🗑️'}
          </button>
        </div>
      </motion.div>

      {/* Toast notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="edit-toast"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
