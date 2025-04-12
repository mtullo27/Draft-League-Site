import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Test from './test.jsx'
import store from './store.jsx'
import { Provider } from 'react-redux'

export default function Main(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Test />} />
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Main />
  </Provider>,
)
