import RoutesConfig from './routes';
import Header from './components/header';
import Footer from './components/footer';
import { useLocation } from "react-router-dom";
import { useEffect } from 'react';
import { checkAuth } from './services/auth-service'
import AppStore from './store/store';

function App() {    
  const setAuth = AppStore.getState().setApplicationId;
  const {isAuthenticated} = AppStore();
  useEffect( async ()=>{
    if(!isAuthenticated){
      const response = await checkAuth();
      if(response.success){
        setAuth(true);
      }  
    }
  },[]);
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
