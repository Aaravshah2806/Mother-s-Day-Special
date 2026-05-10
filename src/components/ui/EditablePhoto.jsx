import { useRef } from 'react';
import { useEditMode } from '../../context/EditContext';
import { useCustomPhoto, useCustomText } from '../../hooks/useCustomData';

/**
 * Wraps an image — in edit mode shows an upload overlay on hover.
 * Now includes sliders to adjust the focal point (object-position).
 *
 * Props:
 *   dataKey   — unique localStorage key (e.g. "bedroom_photo_0")
 *   defaultUrl — the stock Unsplash URL
 *   alt       — alt text
 *   style     — style for the <img>
 *   imgProps  — any extra props for <img>
 */
export default function EditablePhoto({ dataKey, defaultUrl, alt, style, imgProps = {} }) {
  const { isEditMode } = useEditMode();
  const [url, handleFile] = useCustomPhoto(dataKey, defaultUrl);
  // Store the object-position using the same text hook trick
  const [position, setPosition] = useCustomText(dataKey + '_pos', '50% 50%');
  const inputRef = useRef(null);

  const isCustom = url !== defaultUrl;
  const [posX, posY] = position.split(' ').map(p => parseInt(p) || 50);

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
      setPosition('50% 50%'); // Reset focus to center on new upload
    }
  };

  const updatePos = (x, y) => {
    setPosition(`${x}% ${y}%`);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <img
        src={url}
        alt={alt}
        style={{ ...style, objectPosition: position }}
        loading="lazy"
        {...imgProps}
      />

      {isEditMode && (
        <>
          <div
            className="editable-photo-overlay"
            style={{ flexDirection: 'column', gap: '16px' }}
          >
            {/* The Badge triggers the file upload */}
            <div 
              className="editable-photo-badge" 
              onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
              style={{ cursor: 'pointer' }}
            >
              <span>📷</span>
              <span>{isCustom ? 'Change Photo' : 'Upload Photo'}</span>
            </div>

            {/* The Sliders adjust the focus */}
            {isCustom && (
               <div 
                 style={{ 
                   background: 'rgba(0,0,0,0.85)', 
                   padding: '12px 16px', 
                   borderRadius: '12px', 
                   display: 'flex', 
                   flexDirection: 'column', 
                   gap: '10px',
                   width: '85%',
                   maxWidth: '220px',
                   boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                   border: '1px solid rgba(255,255,255,0.1)',
                   cursor: 'default'
                 }}
                 onClick={(e) => e.stopPropagation()} // Prevent any parent clicks
               >
                 <div style={{ color: 'white', fontSize: '0.75rem', textAlign: 'center', fontWeight: '600', letterSpacing: '0.05em' }}>
                   Adjust Focus 🎯
                 </div>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '12px', color: '#ccc' }} title="Horizontal">↔️</span>
                    <input 
                      type="range" min="0" max="100" value={posX} 
                      onChange={(e) => updatePos(e.target.value, posY)} 
                      style={{ flex: 1, cursor: 'pointer' }}
                    />
                 </div>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '12px', color: '#ccc' }} title="Vertical">↕️</span>
                    <input 
                      type="range" min="0" max="100" value={posY} 
                      onChange={(e) => updatePos(posX, e.target.value)} 
                      style={{ flex: 1, cursor: 'pointer' }}
                    />
                 </div>
               </div>
            )}
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={onFileChange}
            style={{ display: 'none' }}
          />
          {isCustom && (
            <div className="editable-photo-custom-badge" title="Custom photo uploaded">
              ✅
            </div>
          )}
        </>
      )}
    </div>
  );
}
