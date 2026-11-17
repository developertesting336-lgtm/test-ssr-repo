import React from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

const container = document.getElementById('root')
const initialData = window.__INITIAL_DATA__ || null

if (container.hasChildNodes()) {
  hydrateRoot(
    container,
    <App url={window.location.pathname} initialData={initialData} />
  )
} else {
  createRoot(container).render(
    <App url={window.location.pathname} initialData={initialData} />
  )
}

