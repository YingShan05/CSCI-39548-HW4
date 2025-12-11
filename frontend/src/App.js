import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Cart from './components/Cart';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ImageGallery from "./components/ImageGallery";
import { fetchMenu, getCart, saveCart, placeOrder } from './api';

function App() {
  const [route, setRoute] = useState(window.location.hash.replace('#','') || 'home');
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState({ sessionId: null, items: [] });

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash.replace('#','') || 'home');
    window.addEventListener('hashchange', onHash);
    fetchMenu().then(setMenu).catch(err => {
      console.error('fetchMenu error', err);
      setMenu([]);
    });

    let sessionId = localStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = 's_' + Math.random().toString(36).slice(2,10);
      localStorage.setItem('sessionId', sessionId);
    }

    getCart(sessionId)
      .then(c => {
        if (!c || !c.items) {
          setCart({ sessionId, items: [] });
          return;
        }
        const normalized = (c.items || []).map(i => {
          const iid = (i.item && i.item._id) ? String(i.item._id) : String(i.item);
          const image = i.image || (i.item && i.item.image) || '/hero.jpg';
          const name = i.name || (i.item && i.item.name) || 'Item';
          const price = (typeof i.price === 'number') ? i.price : (i.item && i.item.price) || 0;
          return { item: iid, name, price, qty: i.qty || 1, image };
        });
        setCart({ sessionId, items: normalized });
      })
      .catch(err => {
        console.error('getCart error', err);
        setCart({ sessionId, items: [] });
      });

    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  async function persistCart(newItems) {
    const newCart = { sessionId: cart.sessionId, items: newItems.map(i => ({
      item: i.item,
      name: i.name,
      price: i.price,
      qty: i.qty,
      image: i.image
    })) };
    setCart(newCart);
    try {
      await saveCart(newCart);
    } catch (err) {
      console.error('saveCart failed', err);
    }
  }

  async function addToCart(menuItem) {
    const id = String(menuItem._id);
    const existing = cart.items.find(i => String(i.item) === id);
    let newItems;
    if (existing) {
      newItems = cart.items.map(i => i.item === id ? { ...i, qty: i.qty + 1 } : i);
    } else {
      newItems = [
        ...cart.items,
        {
          item: id,
          name: menuItem.name,
          price: menuItem.price,
          qty: 1,
          image: menuItem.image || '/hero.jpg'
        }
      ];
    }
    await persistCart(newItems);
  }

  async function updateQty(itemId, qty) {
    if (qty <= 0) {
      return removeItem(itemId);
    }
    const id = String(itemId);
    const newItems = cart.items.map(i => i.item === id ? { ...i, qty } : i);
    await persistCart(newItems);
  }

  async function incrementQty(itemId) {
    const id = String(itemId);
    const found = cart.items.find(i => i.item === id);
    if (!found) return;
    await updateQty(id, found.qty + 1);
  }

  async function decrementQty(itemId) {
    const id = String(itemId);
    const found = cart.items.find(i => i.item === id);
    if (!found) return;
    const newQty = found.qty - 1;
    if (newQty <= 0) return removeItem(id);
    await updateQty(id, newQty);
  }

  async function removeItem(itemId) {
    const id = String(itemId);
    const newItems = cart.items.filter(i => i.item !== id);
    await persistCart(newItems);
  }

  async function clearCart() {
    await persistCart([]);
  }

  async function handlePlaceOrder(customer) {
    if (!cart.items || cart.items.length === 0) {
      alert('Cart is empty');
      return;
    }
    const total = cart.items.reduce((s,i) => s + (i.price * i.qty), 0);
    const order = {
      items: cart.items,
      total,
      customer
    };
    try {
      const savedOrder = await placeOrder(order);
      await persistCart([]);
      alert(`Order placed! Order id: ${savedOrder._id || '(no id returned)'}`);
      window.location.hash = '#home';
    } catch (err) {
      console.error('placeOrder error', err);
      alert('Could not place order. See console.');
    }
  }

  return (
    <div className="app">
      <Header onNavigate={(r)=>{window.location.hash = '#'+r}} />
        {route === 'home' && <>
        {route === 'home' && <>
        <Hero />
        <ImageGallery />
        </>}
      </>}
      {route === 'menu' && <Menu items={menu} onAdd={addToCart} />}
      {route === 'cart' && (
        <Cart
          items={cart.items}
          incrementQty={incrementQty}
          decrementQty={decrementQty}
          updateQty={updateQty}
          removeItem={removeItem}
          clearCart={clearCart}
          placeOrder={handlePlaceOrder}
        />
      )}
      {route === 'about' && <About />}
      {route === 'contact' && <Contact />}
      <Footer />
    </div>
  );
}

export default App;