import React from 'react';
import './HomePage.css';

/**
 * HomePage - Landing page for Little Lemon restaurant.
 * Contains hero section, specials, and testimonials.
 */
function HomePage({ onReserve }) {
  const specials = [
    {
      id: 1,
      name: 'Greek Salad',
      price: '$12.99',
      description: 'The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.',
      category: 'Lunch',
      emoji: '🥗',
    },
    {
      id: 2,
      name: 'Bruschetta',
      price: '$5.99',
      description: 'Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.',
      category: 'Starter',
      emoji: '🍞',
    },
    {
      id: 3,
      name: 'Lemon Dessert',
      price: '$5.00',
      description: 'This comes straight from grandma\'s recipe book. Every bite tells a story. Made with the best locally sourced ingredients.',
      category: 'Dessert',
      emoji: '🍋',
    },
  ];

  const testimonials = [
    { id: 1, name: 'Sarah M.', rating: 5, text: 'Absolutely divine food and atmosphere. The Greek salad was the freshest I\'ve ever had!', avatar: 'SM' },
    { id: 2, name: 'James T.', rating: 5, text: 'Little Lemon has the best Mediterranean cuisine in Chicago. We come every anniversary!', avatar: 'JT' },
    { id: 3, name: 'Priya K.', rating: 5, text: 'The lemon dessert is worth every calorie. A true gem hidden in the city.', avatar: 'PK' },
    { id: 4, name: 'Marco D.', rating: 4, text: 'Authentic flavors, friendly staff, cozy atmosphere. Will definitely be back!', avatar: 'MD' },
  ];

  return (
    <main id="main-content">
      {/* Hero Section */}
      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero__inner container">
          <div className="hero__content">
            <h1 id="hero-heading" className="hero__title">Little Lemon</h1>
            <h2 className="hero__subtitle">Chicago</h2>
            <p className="hero__description">
              We are a family owned Mediterranean restaurant, focused on
              traditional recipes served with a modern twist.
            </p>
            <button
              className="hero__cta"
              onClick={onReserve}
              aria-label="Reserve a table at Little Lemon"
            >
              Reserve a Table
            </button>
          </div>
          <div className="hero__image-wrap" aria-hidden="true">
            <div className="hero__image">
              <span className="hero__image-emoji">🍋</span>
            </div>
          </div>
        </div>
      </section>

      {/* Specials */}
      <section className="specials" aria-labelledby="specials-heading">
        <div className="container">
          <div className="specials__header">
            <h2 id="specials-heading" className="specials__title">This Week's Specials!</h2>
            <button
              className="specials__menu-btn"
              onClick={() => {}}
              aria-label="View full online menu"
            >
              Online Menu
            </button>
          </div>
          <ul className="specials__grid" role="list" aria-label="Weekly specials">
            {specials.map((item) => (
              <li key={item.id} className="special-card">
                <div className="special-card__image" aria-hidden="true">
                  <span>{item.emoji}</span>
                </div>
                <div className="special-card__body">
                  <div className="special-card__header">
                    <h3 className="special-card__name">{item.name}</h3>
                    <span className="special-card__price" aria-label={`Price: ${item.price}`}>
                      {item.price}
                    </span>
                  </div>
                  <p className="special-card__desc">{item.description}</p>
                  <button
                    className="special-card__order"
                    aria-label={`Order ${item.name} for delivery`}
                  >
                    Order a delivery 🛵
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials" aria-labelledby="testimonials-heading">
        <div className="container">
          <h2 id="testimonials-heading" className="testimonials__title">
            What Our Customers Say
          </h2>
          <ul className="testimonials__grid" role="list" aria-label="Customer reviews">
            {testimonials.map((t) => (
              <li key={t.id} className="testimonial-card">
                <div
                  className="testimonial-card__rating"
                  aria-label={`Rating: ${t.rating} out of 5 stars`}
                >
                  {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
                </div>
                <div className="testimonial-card__header">
                  <div className="testimonial-card__avatar" aria-hidden="true">
                    {t.avatar}
                  </div>
                  <strong className="testimonial-card__name">{t.name}</strong>
                </div>
                <blockquote className="testimonial-card__text">
                  "{t.text}"
                </blockquote>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* About section */}
      <section className="about" aria-labelledby="about-heading">
        <div className="container">
          <div className="about__inner">
            <div className="about__content">
              <h2 id="about-heading" className="about__title">Little Lemon</h2>
              <h3 className="about__subtitle">Chicago</h3>
              <p className="about__text">
                Little Lemon is owned by two Italian brothers, Mario and Adrian,
                who moved to the United States to pursue their shared dream of
                owning a restaurant. To craft the menu, Mario relies on family
                recipes and his experience as a chef in Italy. Adrian does a lot
                of the marketing work and also helps to manage the business
                operations.
              </p>
            </div>
            <div className="about__images" aria-hidden="true">
              <div className="about__img about__img--back">👨‍🍳</div>
              <div className="about__img about__img--front">🍽️</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
