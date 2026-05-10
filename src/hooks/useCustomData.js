import { useState, useCallback } from 'react';

const PREFIX = 'hom_';

/* ─── Low-level helpers ─── */

function read(key) {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw ? JSON.parse(raw) : undefined;
  } catch {
    return undefined;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch (e) {
    console.warn('localStorage write failed (quota?):', e);
  }
}

function remove(key) {
  localStorage.removeItem(PREFIX + key);
}

/* ─── React hooks ─── */

/**
 * Hook for a single customizable text value.
 * Returns [value, setValue] — the value is the custom one if it exists,
 * otherwise falls back to defaultValue.
 */
export function useCustomText(key, defaultValue) {
  const stored = read(key);
  const [value, _setValue] = useState(stored !== undefined ? stored : defaultValue);

  const setValue = useCallback((newVal) => {
    _setValue(newVal);
    if (newVal === defaultValue) {
      remove(key);
    } else {
      write(key, newVal);
    }
  }, [key, defaultValue]);

  return [value, setValue];
}

/**
 * Hook for a customizable photo URL.
 * Returns [url, handleFile] where handleFile accepts a File object,
 * compresses it, and stores as base64.
 */
export function useCustomPhoto(key, defaultUrl) {
  const stored = read(key);
  const [url, _setUrl] = useState(stored || defaultUrl);

  const handleFile = useCallback((file) => {
    if (!file) return;
    compressImage(file, 800, 0.7).then((base64) => {
      _setUrl(base64);
      write(key, base64);
    });
  }, [key]);

  return [url, handleFile];
}

/* ─── Image compression ─── */

function compressImage(file, maxWidth, quality) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let w = img.width;
        let h = img.height;
        if (w > maxWidth) {
          h = (h * maxWidth) / w;
          w = maxWidth;
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

/* ─── Bulk export / import ─── */

export function exportCustomizations() {
  const data = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith(PREFIX)) {
      try {
        data[key.slice(PREFIX.length)] = JSON.parse(localStorage.getItem(key));
      } catch {
        data[key.slice(PREFIX.length)] = localStorage.getItem(key);
      }
    }
  }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'house-customizations.json';
  a.click();
  URL.revokeObjectURL(url);
}

export function importCustomizations(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        Object.entries(data).forEach(([key, value]) => {
          write(key, value);
        });
        resolve(Object.keys(data).length);
      } catch (err) {
        reject(err);
      }
    };
    reader.readAsText(file);
  });
}

export function clearAllCustomizations() {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith(PREFIX)) keys.push(key);
  }
  keys.forEach((k) => localStorage.removeItem(k));
}

export function hasAnyCustomizations() {
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i).startsWith(PREFIX)) return true;
  }
  return false;
}
