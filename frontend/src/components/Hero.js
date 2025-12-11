import React from 'react';

export default function Hero() {
  return (
    <section className="hero" style={{ backgroundImage: "url('/hero.jpg')" }}>
      <div className="hero-inner">
        <h1>Burger Queen</h1>
      </div>
    </section>
  );
}