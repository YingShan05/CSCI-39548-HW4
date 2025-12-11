import React, { useState } from 'react';
import { submitContact } from '../api';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  async function submit(e) {
    e.preventDefault();
    await submitContact(form);
    alert('Thanks! We received your message.');
    setForm({ name:'', email:'', message: '' });
  }

  return (
    <section className="container contact-page">
      <h2>Contact</h2>
      <div className="contact-grid">
        <div>
          <h3>Find us</h3>
          <div className="map-wrapper">
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12086.942379354236!2d-73.98358351284178!3d40.7678398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258eb899f0889%3A0xb5e90aa7d877ee1f!2sHunter%20College!5e0!3m2!1sen!2sus!4v1765477566357!5m2!1sen!2sus"
              width="100%" height="250" style={{border:'1.5px solid #f3da6c'}}>
            </iframe>
          </div>
        </div>
        <div>
          <h3>Contact Us</h3>
          <form onSubmit={submit} className="contact-form">
            <input placeholder="Name" required value={form.name} onChange={e=>setForm({...form, name:e.target.value})} style={{border:'1px solid #f3da6c'}}/>
            <input placeholder="Email" type="email" required value={form.email} onChange={e=>setForm({...form, email:e.target.value})} style={{border:'1px solid #f3da6c'}}/>
            <textarea placeholder="Message" required value={form.message} onChange={e=>setForm({...form, message:e.target.value})} style={{border:'1px solid #f3da6c'}}/>
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </section>
  );
}