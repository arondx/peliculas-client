import { Route, Routes } from 'react-router-dom'

import PageLayout from './components/page-layout'
import AuthenticationGuard from './components/authentication-guard'

import LoginView from './features/auth/views/login-view'
import SignupView from './features/auth/views/signup-view'
import LogoutView from './features/auth/views/logout-view'

import WelcomePage from './pages/welcome-page'
import MissingPage from './pages/missing-page'
import PersistentLoginGuard from './components/persistent-login-guard'
import NewPostView from './features/peliculas/views/crear-pelicula-view'
import UnauthorizedPage from './pages/unauthorized-page'
import CrearPeliculaView from './features/peliculas/views/crear-pelicula-view'
import CrearGeneroView from './features/generos/views/crear-genero-view'
import ListarPeliculasView from './features/peliculas/views/listar-peliculas-view'

const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5051
}

function App() {

  return (
    <Routes>
      <Route path="/" element={<PageLayout />}>
        {/* public routes */}
        <Route path="login" element={<LoginView />} />
        <Route path="signup" element={<SignupView />} />
        <Route path="/logout" element={<LogoutView />} />

        {/* we want to protect these routes */}
        <Route element={<PersistentLoginGuard />}>
          <Route element={<AuthenticationGuard allowedRoles={[ROLES.Admin]} />}>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/crearpelicula" element={<CrearPeliculaView />} />
            <Route path="/listarpeliculas" element={<ListarPeliculasView />} />
            <Route path="/creargenero" element={<CrearGeneroView />} />
          </Route>
        </Route>
        <Route path='/newpost' element={<NewPostView />} />
        <Route path='/unauthorized' element={<UnauthorizedPage />} />
        {/* catch all */}
        <Route path="*" element={<MissingPage />} />
      </Route>
    </Routes>
  )
}

export default App
