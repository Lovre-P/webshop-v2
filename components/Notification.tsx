
import React, { useEffect, useState } from 'react';
import { XMarkIcon } from '../constants';

interface NotificationProps {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number; // in milliseconds
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  type = 'info',
  duration = 3000,
  onClose,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration, onClose]);

  const baseStyles = "fixed top-20 right-5 p-4 rounded-lg shadow-xl text-white max-w-sm z-[100] transition-opacity duration-300";
  
  const typeStyles = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500 text-neutral-800',
  };

  if (!visible || !message) return null;

  return (
    <div className={`${baseStyles} ${typeStyles[type]} ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button 
          onClick={() => { setVisible(false); onClose(); }} 
          className="ml-4 -mr-1 p-1 rounded-full hover:bg-black/10 transition-colors"
          aria-label="Close notification"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Notification;
