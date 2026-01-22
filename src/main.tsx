import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from './store/store';
import './index.css'
import App from './App.tsx'
import { AppProvider } from './Context/AppContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AppProvider steps={[]} appPrefix="global">
          <App />
      </AppProvider>
    </Provider>
  </StrictMode>,
)
