import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from 'react-bootstrap'
import HomeScreen from "./screens/HomeScreen";
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import ProductScreen from "./screens/ProductScreen";
import {Provider} from 'react-redux'
import appStore from "./utils/appStore";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
function App() {
  return (
    <Provider store={appStore}>
      <Router>
                <Header/>
              <main className="py-3">
                <Container>
                  <Routes>
                  <Route path='/' Component={HomeScreen} exact/>
                  <Route path='/product/:id' Component={ProductScreen}/>
                  <Route path='/cart/:id?' Component={CartScreen}/>
                  <Route path='/login' Component={LoginScreen}/>
                  <Route path="/register" Component={RegisterScreen}/>
                  <Route path="/profile" Component={ProfileScreen}/>

                  </Routes>
                </Container>
              </main>
              
              <Footer/>
              
      </Router>
    </Provider>
     
     
     
  );
}

export default App;
