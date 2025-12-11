import React, { useState } from 'react';

export default function Cart({
  items = [],
  incrementQty,
  decrementQty,
  updateQty,
  removeItem,
  clearCart,
  placeOrder
}) {
  const [customer, setCustomer] = useState({ name: '', email: '', note: '' });

  const total = items.reduce((s,i)=> s + i.price * i.qty, 0);

  function submit(e) {
    e.preventDefault();
    if (!customer.name || !customer.email) {
      alert('Please enter name and email');
      return;
    }
    placeOrder(customer);
  }

  return (
    <section className="container">
      <h2>Your Cart</h2>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>


          <table className="cart-table" style={{width:'100%'}}>
            <thead>
              <tr>
                <th style={{width:'80px'}}>Image</th>
                <th>Item</th>
                <th>Price</th>
                <th style={{width:'140px'}}>Quantity</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map(it => (
                <tr key={it.item}>
                  <td>
                    <img src={it.image} alt={it.name} style={{width:70,height:50,objectFit:'cover',borderRadius:6}} />
                  </td>
                  <td>{it.name}</td>
                  <td>${(it.price||0).toFixed(2)}</td>
                  <td>
                    <div style={{display:'flex',alignItems:'center',gap:'0.5rem'}}>
                      <button onClick={()=>decrementQty(it.item)} aria-label="decrement" className="qty-btn">−</button>
                      <input
                        value={it.qty}
                        style={{width:60, textAlign:'center', padding:'6px', borderRadius:6, border:'1px solid #f3da6c'}}
                      />
                      <button onClick={()=>incrementQty(it.item)} aria-label="increment" className="qty-btn">+</button>
                    </div>
                  </td>
                  <td>${(it.price * it.qty).toFixed(2)}</td>
                  <td>
                    <button onClick={()=>removeItem(it.item)} className="btn-remove">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-summary" style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'1rem'}}>
            <p style={{fontSize:'1.1rem'}}>Total: <strong>${total.toFixed(2)}</strong></p>
            <div>
              <button className="btn-remove" onClick={clearCart}>Remove all</button>
              <button className="btn-checkout" style={{marginLeft:'0.75rem'}}>Checkout</button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}