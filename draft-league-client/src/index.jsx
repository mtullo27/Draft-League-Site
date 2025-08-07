import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

// import App from './App.jsx'
import Test from './test.jsx'
import SetsPage from './pages/setsPage.jsx'
import TiersPage from './pages/tiersPage.jsx'

import store from './store.jsx'
import { Provider } from 'react-redux'

export default function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Test />} />
        <Route path="/sets" element={<SetsPage />} />
        <Route path="/tiers" element={<TiersPage />} />
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Main />
  </Provider>,
)
