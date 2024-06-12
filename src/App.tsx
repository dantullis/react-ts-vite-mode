import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import NavigationBar from './components/Navbar';

export const App = () => {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<About />} path="/about" />
        <Route element={<NotFound />} path="*" />
      </Routes>
    </>
  );
};

export const WrappedApp = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

export default WrappedApp;
