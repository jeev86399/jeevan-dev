import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
/* Variables must load first so every stylesheet can use the tokens */
import './styles/variables.css'
import './styles/animations.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)