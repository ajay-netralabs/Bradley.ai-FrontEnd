import React, { useEffect } from 'react';

const API_ROOT_URL = 'https://bradley-emission.onrender.com';

const ApiPrePinger: React.FC = () => {
  useEffect(() => {
    const prePing = async () => {
      try {
        await fetch(API_ROOT_URL, { mode: 'no-cors' });
        console.log('API pre-ping sent successfully.');
      } catch (error) {
        console.warn('API pre-ping failed. The server might be waking up.', error);
      }
    };

    prePing();
  }, []);

  return null;
};

export default ApiPrePinger;