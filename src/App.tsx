import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,  
} from "react-router-dom";

import { Navbar, Image } from 'react-bootstrap'

import Home from './pages/Home'
import Footer from './pages/Footer';
import WorkShopDetail from './pages/WorkShopDetail'
import CartPage from './pages/CartPage'

const uri = 'http://localhost:3000/'

const styles = {
  header_sec: {
    background: '#FFCE25',
    width: '100%',
    position: 'fixed',
    zIndex: 1000
  } as React.CSSProperties,
  notification: {
    position: "relative",
    top: '-8px',
    right: '10px',
    padding: '5px',
    borderRadius: '50%',
    backgroundColor: '#00AAE4'    
  } as React.CSSProperties
} 

const NoMatchPage = () => {
  return (
    <h3 style={{padding: '100px 100px'}}>404 - Not found</h3>
  );
};

function App() {
    
  const [ orders, setOrders ] = useState([])  

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = () => {
    fetch(uri + 'orders').then(res => res.json()).then(res => setOrders(res))
  }

  return (    
        <Router>        

          <Navbar style={styles.header_sec} expand="lg">
            <Navbar.Brand href="/">
              <Image src={process.env.PUBLIC_URL + "/images/logo.png"} alt=""/>
            </Navbar.Brand>
            <CartPage 
                isOpen={false}          
                right
                width={320}
                orders={orders}
                noOverlay                         
                customBurgerIcon={ <div><Image src={process.env.PUBLIC_URL + "/images/eva_shopping-cart-outline.png"} alt="" />{ orders.length > 0 && <span style={styles.notification}></span> }<h6 className="mobile_cart_ico_txt">{orders.length > 0 ? orders.length + ' WorkShops' : 'Cart is Empty'}</h6></div> }      
            />             
          </Navbar>

          <Switch>
            <Route path="/" component={Home} exact/>            
            <Route path="/workshops/:id" render={(props) => (
              <WorkShopDetail fetchOrders={fetchOrders} {...props}/>
            )} exact/>
            <Route component={NoMatchPage} />
          </Switch>
          
          <Footer />

        </Router>      
  );
}

export default App;
