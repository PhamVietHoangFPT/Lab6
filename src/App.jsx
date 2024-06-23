
// import './App.css'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import NavBar from './components/navBar/NavBar'
import Home from './components/pages/Home'
import News from './components/pages/News'
import Contact from './components/pages/Contact'
import About from './components/pages/About'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Display from './components/pages/Display'
export default function App() {

  return (
    <BrowserRouter>
      <Header></Header>
      <NavBar></NavBar>
      <Routes>
        <Route path='/home' element={<Home />}>        </Route>
        <Route path='/home/details/:id' element={<Display />}></Route>
        <Route path='/news' element={<News />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/about' element={<About />}></Route>
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  )
}
