import React from 'react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <p>Open Daily: 8am - 7pm</p>
        </div>
        <div>
          <p><strong>Follow us</strong></p>
          <p>
            <a href="#" aria-label="facebook">Facebook</a> | <a href="#" aria-label="instagram">Instagram</a>
          </p>
        </div>
      </div>
    </footer>
  );
}