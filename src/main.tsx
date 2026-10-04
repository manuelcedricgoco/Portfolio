import '@fontsource-variable/mona-sans/wdth.css';
import '@fontsource-variable/jetbrains-mono/index.css';
import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { preloadInitialRoute } from '@/lib/routes';
import { warnAboutPlaceholders } from '@/utils/configCheck';

if (import.meta.env.DEV) warnAboutPlaceholders();

preloadInitialRoute().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
