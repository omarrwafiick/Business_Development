import RoutesConfig from './routes';
import Header from './components/header';
import Footer from './components/footer';
import { useLocation } from "react-router-dom";

function App() {    
  const location = useLocation();
  
  return (
    <div className='font-gelasio'> 
      {location.pathname === '/' && <Header />}
      <RoutesConfig />
      {location.pathname === '/' && <Footer />}
    </div>
  );
}

export default App;
