import { useState, useRef, useEffect } from 'react';
import { useEditMode } from '../../context/EditContext';
import { useCustomText } from '../../hooks/useCustomData';

/**
 * Wraps text — in edit mode, clicking enables inline editing.
 *
 * Props:
 *   dataKey      — unique localStorage key
 *   defaultValue — the original text
 *   as           — wrapper element type (default: 'span')
 *   multiline    — if true, renders a <textarea> instead of <input>
 *   style        — applied to both display and editing states
 *   className    — className for the wrapper
 *   children     — if provided, used as render prop: children(value, isEditing)
 */
export default function EditableText({
  dataKey,
  defaultValue,
  as: Tag = 'span',
  multiline = false,
  style = {},
  className = '',
}) {
  const { isEditMode } = useEditMode();
  const [value, setValue] = useCustomText(dataKey, defaultValue);
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      // For textarea, move cursor to end
      if (multiline) {
        const len = inputRef.current.value.length;
        inputRef.current.setSelectionRange(len, len);
      }
    }
  }, [isEditing, multiline]);

  const commit = () => {
    setIsEditing(false);
    if (draft.trim()) {
      setValue(draft);
    } else {
      setDraft(value); // revert empty
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setDraft(value);
      setIsEditing(false);
    }
    if (!multiline && e.key === 'Enter') {
      commit();
    }
  };

  if (!isEditMode) {
    return <Tag style={style} className={className}>{value}</Tag>;
  }

  if (isEditing) {
    const InputTag = multiline ? 'textarea' : 'input';
    return (
      <InputTag
        ref={inputRef}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={handleKeyDown}
        className="editable-text-input"
        style={{
          ...style,
          background: 'rgba(255,255,255,0.12)',
          border: '1.5px dashed #D4A574',
          borderRadius: 8,
          padding: multiline ? '12px 14px' : '4px 8px',
          outline: 'none',
          width: '100%',
          resize: multiline ? 'vertical' : 'none',
          minHeight: multiline ? 120 : undefined,
          fontFamily: 'inherit',
          fontSize: 'inherit',
          fontWeight: 'inherit',
          fontStyle: 'inherit',
          color: 'inherit',
          lineHeight: 'inherit',
          letterSpacing: 'inherit',
        }}
        rows={multiline ? 6 : undefined}
      />
    );
  }

  return (
    <Tag
      style={{ ...style, position: 'relative', cursor: 'text' }}
      className={`editable-text-display ${className}`}
      onClick={() => { setDraft(value); setIsEditing(true); }}
    >
      {value}
      <span className="editable-text-icon" title="Click to edit">✏️</span>
    </Tag>
  );
}
