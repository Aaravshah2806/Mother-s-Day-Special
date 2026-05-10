import { createContext, useContext, useMemo } from 'react';

const EditContext = createContext({ isEditMode: false });

export function EditProvider({ children }) {
  const isEditMode = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('edit') === 'true';
  }, []);

  return (
    <EditContext.Provider value={{ isEditMode }}>
      {children}
    </EditContext.Provider>
  );
}

export function useEditMode() {
  return useContext(EditContext);
}
