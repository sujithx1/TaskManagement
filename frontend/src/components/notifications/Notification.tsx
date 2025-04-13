import React, { useEffect } from 'react';

type NotificationProps = {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning' | 'idel';
  onClose: () => void;
  duration?: number; // in milliseconds
};

const typeToBootstrapClass = {
  success: 'alert-success',
  error: 'alert-danger',
  info: 'alert-info',
  warning: 'alert-warning',
  idel: 'd-none',
};

const Notification: React.FC<NotificationProps> = ({
  message,
  type,
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
    className={`alert ${typeToBootstrapClass[type]} position-fixed top-0 start-50 translate-middle-x m-3 shadow`}
    role="alert"
    style={{ zIndex: 1050, minWidth: '250px' }}
  >
    {message}
  </div>
  );
};

export default Notification;
