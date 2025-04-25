import { BrowserRouter } from 'react-router-dom'
import RoutesConfig from './routes';
import Header from './components/header';
import Footer from './components/footer';

function App() {   
  return (
    <BrowserRouter>
      <Header />
      <RoutesConfig />
      <Footer />
    </BrowserRouter>
  )
}

export default App
   