
// import './App.css'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import NavBar from './components/navBar/NavBar'
import Home from './components/pages/Home'
import News from './components/pages/News'
import Contact from './components/pages/Contact'
import About from './components/pages/About'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Display from './components/pages/Display'
import { useEffect } from 'react'
import { gapi } from 'gapi-script'
import { GoogleOAuthProvider } from '@react-oauth/google'
export default function App() {

  const clientId = "629470625241-il5it1rn5pejaltppdm23jog45iat57b.apps.googleusercontent.com";
  useEffect(() => {
    function start() {
      gapi.auth2.init({
        client_id: clientId,
        scope: ''
      });
    }
    gapi.load('client:auth2', start);
  })

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <BrowserRouter>
        <Header></Header>
        <NavBar></NavBar>
        <Routes>
          <Route path='/home' element={<Home />}>        </Route>
          <Route path='/home/details/:id' element={<Display />}></Route>
          <Route path='/news' element={<News />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path="/" element={<Navigate replace to="/home" />} />
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </GoogleOAuthProvider>

  )
}
