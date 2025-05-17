import RoutesConfig from './routes';
import Header from './components/header';
import Footer from './components/footer';
import { useLocation } from "react-router-dom";
import { useEffect } from 'react';
import { checkAuth } from './services/auth-service'
import AppStore from './store/store';
import { HeadProvider } from 'react-head';
import { Toaster } from 'react-hot-toast'

function App() {     
  const {setIsAuthenticated, isAuthenticated, setToken} = AppStore();

  const manageToken = ()=>{
    const token = Cookies.get('token');
    if(!token){
      navigate('/login');
    }
    else{
      setToken(token);
    }
  };

  // const req = async ()=>{
  //   return await checkAuth();
  // };
  // useEffect( ()=>{
  //   if(!isAuthenticated){
  //     const response = req();
  //     if(response.success){
  //       setIsAuthenticated(true);
  //     }  
  //   }
  // },[]);
  
  const location = useLocation();
  return (
    <div className='font-gelasio'> 
      {location.pathname === '/' && <Header />}
      <HeadProvider>  
        <RoutesConfig />
        <Toaster />
      </HeadProvider>
      {location.pathname === '/' && <Footer />}
    </div> 
  );
}  

export default App;
