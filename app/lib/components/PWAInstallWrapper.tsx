import React, { useEffect, useRef } from 'react';
import { PWAInstallElement } from '@khmyznikov/pwa-install';

const PWAInstallWrapper: React.FC = () => {
  const pwaInstallRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pwaInstallRef.current) {
      const pwaInstallElement = document.createElement('pwa-install') as PWAInstallElement;
      pwaInstallElement.manifestUrl = '/manifest.json';
      pwaInstallElement.name = 'Eventos Unibagué';
      pwaInstallElement.description = 'This site has app functionality. Add it to your Home Screen for easy access.';
      // Set other properties as needed

      pwaInstallRef.current.appendChild(pwaInstallElement);
    }
  }, []);

  return <div ref={pwaInstallRef} />;
};

export default PWAInstallWrapper;
