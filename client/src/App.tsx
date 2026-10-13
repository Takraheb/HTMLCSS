import { Route, Routes } from 'react-router-dom'
import { FavoritesProvider } from './lib/FavoritesContext'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { ScrollToTop } from './components/ScrollToTop'
import { ViewCursor } from './components/ViewCursor'
import HomePage from './pages/HomePage'
import PropertiesPage from './pages/PropertiesPage'
import PropertyDetailPage from './pages/PropertyDetailPage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import TeamPage from './pages/TeamPage'
import ContactPage from './pages/ContactPage'
import SavedPage from './pages/SavedPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <FavoritesProvider>
      <ScrollToTop />
      <ViewCursor />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/properties/:slug" element={<PropertyDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/saved" element={<SavedPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </FavoritesProvider>
  )
}
