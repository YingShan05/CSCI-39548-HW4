import React from "react";

export default function Menu({ items = [], onAdd }) {
  return (
    <section className="container">
      <h2>Our Menu</h2>
      
      <div className="menu-grid">
        {items.map((item) => (
          <div className="card" key={item._id}>
            
            {/* IMAGE SECTION */}
            <div className="card-image">
              <img
                src={item.image ? item.image : "/placeholder-food.jpg"}
                alt={item.name}
              />
            </div>

            {/* TEXT SECTION */}
            <div className="card-body">
              <h3>{item.name}</h3>
              <div className="card-footer">
                <strong>${item.price.toFixed(2)}</strong>
                <button onClick={() => onAdd(item)}>Add to Cart</button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}