import React from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'

export function render(url, initialData) {
  const html = renderToString(
    <App url={url} initialData={initialData} />
  )
  return { html }
}

