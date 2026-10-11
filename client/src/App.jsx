import {Routes,Route} from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Events from './pages/Events.jsx'
import ContentPage from './pages/ContentPage.jsx'
import './styles.css'
import './reference.css'
export default function App(){return <><Header/><Routes><Route path="/" element={<Home/>}/><Route path="/events" element={<Events/>}/><Route path="/events/:slug" element={<ContentPage type="event"/>}/><Route path="/membership" element={<ContentPage type="membership"/>}/><Route path="/host" element={<ContentPage type="host"/>}/><Route path="/tickets" element={<ContentPage type="tickets"/>}/><Route path="/wall" element={<ContentPage type="wall"/>}/><Route path="/press" element={<ContentPage type="press"/>}/><Route path="/about" element={<ContentPage type="about"/>}/><Route path="/artists" element={<ContentPage type="artists"/>}/><Route path="/contact" element={<ContentPage type="contact"/>}/><Route path="/faq" element={<ContentPage type="faq"/>}/><Route path="/apps" element={<ContentPage type="apps"/>}/><Route path="/signin" element={<ContentPage type="signin"/>}/><Route path="/register" element={<ContentPage type="register"/>}/><Route path="/me/*" element={<ContentPage type="me"/>}/><Route path="/admin/*" element={<ContentPage type="admin"/>}/><Route path="*" element={<ContentPage type="not-found"/>}/></Routes><Footer/></>}
