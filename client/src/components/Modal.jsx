import React from 'react';


const Modal = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg min-w-[300px] relative shadow-lg">
        <button onClick={onClose} className="absolute top-2 right-2 text-xl text-gray-500 hover:text-gray-800">×</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
