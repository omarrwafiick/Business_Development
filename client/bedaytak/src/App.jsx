import RoutesConfig from './routes';
import Header from './components/header';
import Footer from './components/footer';
import { useLocation } from "react-router-dom";
import { useEffect } from 'react';
import { checkAuth } from './services/auth-service'
import AppStore from './store/store';
import { HeadProvider } from 'react-head';

function App() {    
  const setAuth = AppStore.getState().setApplicationId;
  const {isAuthenticated} = AppStore();
  // const req = async ()=>{
  //   return await checkAuth();
  // };
  // useEffect( ()=>{
  //   if(!isAuthenticated){
  //     const response = req();
  //     if(response.success){
  //       setAuth(true);
  //     }  
  //   }
  // },[]);
  const location = useLocation();
  return (
    <div className='font-gelasio'> 
      {location.pathname === '/' && <Header />}
      <HeadProvider> 
        <RoutesConfig />
      </HeadProvider>
      {location.pathname === '/' && <Footer />}
    </div> 
  );
}  

export default App;
