import { useRef } from 'react';
import { useEditMode } from '../../context/EditContext';
import { useCustomPhoto } from '../../hooks/useCustomData';

/**
 * Wraps an image — in edit mode shows an upload overlay on hover.
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
  const inputRef = useRef(null);

  const isCustom = url !== defaultUrl;

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <img
        src={url}
        alt={alt}
        style={style}
        loading="lazy"
        {...imgProps}
      />

      {isEditMode && (
        <>
          <div
            className="editable-photo-overlay"
            onClick={() => inputRef.current?.click()}
          >
            <div className="editable-photo-badge">
              <span>📷</span>
              <span>{isCustom ? 'Change Photo' : 'Upload Photo'}</span>
            </div>
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
