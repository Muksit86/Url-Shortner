import { Navigate, Route, Routes } from 'react-router';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import PageNotFound from './Pages/PageNotFound';
import RegistrationPage from './Pages/RegistrationPage';

function App() {

  function RootRedirect() {
    const token = localStorage.getItem('token');
    return token ? <Navigate to="/home" /> : <Navigate to="/registration" />;
  }

  return (
    <>
      <Routes>
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<RootRedirect />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
