import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'


import * as Sentry from "@sentry/react";

if (import.meta.env.PROD) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN, // On la charge depuis les variables d'env
    sendDefaultPii: true,
    // integrations: [
    // // Cette intégration active le monitoring de performance.
    // // Elle permet de voir, par exemple, combien de temps prennent les appels API.
    // Sentry.browserTracing(), 

    // // Cette intégration enregistre les sessions utilisateur où une erreur se produit.
    // // C'est comme avoir une "vidéo" de ce que l'utilisateur a fait avant le bug.
    // Sentry.replay()
    // ],



    // traces_sample_rate: 1.0,

    // replays_session_sample_rate: 0.1,
    // replays_on_error_sample_rate: 1.0,
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
