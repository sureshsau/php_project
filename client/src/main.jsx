import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { ToastContainer } from 'react-toastify'
import {Toaster} from'react-hot-toast'
import { MantineProvider } from '@mantine/core';
import '@mantine/tiptap/styles.css';

import { GoogleOAuthProvider } from '@react-oauth/google'
createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENTID}>
    <BrowserRouter>
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover draggable />
      
<MantineProvider withGlobalStyles withNormalizeCSS>
  <App />
</MantineProvider>

      <Toaster/>
    </BrowserRouter>
    </GoogleOAuthProvider>
    
  </Provider>
)
