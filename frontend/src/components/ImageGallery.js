import React from "react";

export default function ImageGallery() {
  const images = [
    "/gallery1.jpg",
    "/gallery2.jpg",
    "/gallery3.jpg",
    "/gallery4.jpg",
    "/gallery5.jpg",
    "/gallery6.jpg"
  ];

  return (
    <section className="image-gallery container">
      <h2>Image Gallery</h2>

      <div className="gallery-column">
        {images.map((src, i) => (
          <div className="gallery-item" key={i}>
            <img src={src} alt={`Gallery ${i + 1}`} />
          </div>
        ))}
      </div>
    </section>
  );
}