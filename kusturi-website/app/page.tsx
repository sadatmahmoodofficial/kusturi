'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

// ─── MENU DATA (will later come from Sanity) ─────────────────
const MENU_TABS = [
  { id: 'appetisers', label: 'Appetisers' },
  { id: 'tandoor', label: 'From the Tandoor' },
  { id: 'korahi', label: 'Korahi' },
  { id: 'favourite', label: 'Kusturi Favourite' },
  { id: 'biryani', label: 'Biryani' },
];

const MENU_ITEMS: Record<string, { name: string; desc?: string; price: string }[]> = {
  appetisers: [
    { name: 'Chicken Tikka', desc: 'Tender chicken marinated with herbs, grilled in the tandoor', price: '£5.95' },
    { name: 'Lamb Tikka', desc: 'Prime lamb marinated with aromatic spices and chargrilled', price: '£6.50' },
    { name: 'Seekh Kebab', desc: 'Minced lamb blended with herbs and grilled over charcoal', price: '£5.95' },
    { name: 'Tandoori Lamb Chops', desc: 'Two chops in chef\'s signature spices, flame grilled', price: '£6.95' },
    { name: 'King Prawn Butterfly', desc: 'Marinated in delicate spices then lightly deep fried', price: '£7.85' },
    { name: 'Paneer Tikka', desc: 'Indian cottage cheese marinated with spices and grilled', price: '£5.95' },
    { name: 'Fish Tikka', desc: 'Boneless fish cooked with onions and lightly spiced', price: '£7.85' },
    { name: 'Samosa Chaat', desc: 'Crispy samosa with yoghurt, chickpeas and chaat dressing', price: '£5.95' },
  ],
  tandoor: [
    { name: 'Chicken or Lamb Tikka', desc: 'Tender cubes marinated in aromatic spices and flame grilled', price: '£11.65' },
    { name: 'Sheek Kebab', desc: 'Minced lamb blended with herbs and charcoal grilled', price: '£11.65' },
    { name: 'Chicken Shashlik', desc: 'Chicken tikka cooked with onions, peppers & tomatoes', price: '£12.65' },
    { name: 'Tandoori Mix Grill', desc: 'Selection of tandoori chicken, tikkas & sheek kebab with naan', price: '£14.65' },
    { name: 'Kusturi Spicy Grill', desc: 'Our signature mixed grill finished with Kusturi special spicy sauce', price: '£20.65' },
    { name: 'Lamb Chops (5 Pieces)', desc: 'Five tender chops in chef\'s selected spices, flame grilled', price: '£13.95' },
    { name: 'Tandoori King Prawn', desc: 'King prawns marinated with aromatic spices, grilled in clay oven', price: '£16.65' },
    { name: 'Sizzling Tandoori Fish', desc: 'Boneless fish in tandoori spices, served on an iron sizzler', price: '£16.65' },
  ],
  korahi: [
    { name: 'Chicken or Lamb Korahi', desc: 'Medium spiced with thick sauce, tossed with garlic, onions & peppers', price: '£11.95' },
    { name: 'Prawn Korahi', desc: 'Served sizzling on an iron dish', price: '£12.95' },
    { name: 'Chicken or Lamb Tikka Korahi', desc: 'Tikka cooked in classic korahi style', price: '£12.95' },
    { name: 'Garlic Chicken Chilli Korahi', desc: 'Bold garlic and chilli flavours in rich korahi sauce', price: '£13.95' },
    { name: 'Tandoori King Prawn Korahi', desc: 'King prawns in rich korahi sauce', price: '£15.95' },
    { name: 'Garlic Chilli King Prawn Korahi', desc: 'Our most indulgent korahi', price: '£16.95' },
  ],
  favourite: [
    { name: 'Kusturi Special Curry', desc: 'Chef\'s signature medium spiced dish with selected herbs & house spices', price: '£13.95' },
    { name: 'Kusturi Special Lamb Shank', desc: 'Slow-braised whole lamb shank in rich aromatic sauce — Chef Signature', price: '£18.95' },
    { name: 'Sea Bass Samba', desc: 'Whole sea bass in special mustard sauce with a touch of spice', price: '£14.95' },
    { name: 'Special Butter Chicken', desc: 'Tandoori chicken in creamy butter sauce with tomatoes & fresh cream', price: '£13.95' },
    { name: 'Kusturi Modhu Chicken', desc: 'Chicken in lightly spiced creamy sauce with honey & almonds', price: '£13.95' },
    { name: 'Achari Gost', desc: 'Cooked in bhuna style with traditional achar spices and fresh herbs', price: '£14.95' },
    { name: 'Lamb Khala Bhuna', desc: 'Rich and deeply spiced dry bhuna style lamb', price: '£14.95' },
    { name: 'Satkora Chicken or Lamb', desc: 'Cooked with the distinctive Bangladeshi citrus fruit, satkora', price: '£14.95' },
  ],
  biryani: [
    { name: 'Kusturi Special Biryani', desc: 'Chicken tikka, spinach & potatoes, topped with omelette', price: '£16.95' },
    { name: 'Chicken or Lamb Biryani', desc: 'Stir fried with basmati rice, served with vegetable curry', price: '£12.95' },
    { name: 'Prawn Biryani', desc: 'Aromatic basmati with succulent prawns', price: '£13.95' },
    { name: 'Tandoori King Prawn Biryani', desc: 'The most premium biryani on the menu', price: '£17.95' },
    { name: 'Paneer Tikka Biryani', desc: 'Vegetarian masterpiece with grilled paneer', price: '£14.95' },
    { name: 'King Prawn Biryani', desc: 'Plump king prawns with fragrant basmati', price: '£16.95' },
  ],
};

const SIGNATURE_DISHES = [
  {
    num: '01',
    name: 'Kusturi Special Lamb Shank',
    desc: 'Slow-braised whole lamb shank in a rich aromatic sauce with caramelised onions, roasted garlic and warming Asian spices. Chef Signature.',
    price: '£18.95',
  },
  {
    num: '02',
    name: 'Kusturi Spicy Grill',
    desc: 'Tandoori chicken, chicken tikka, lamb tikka, king prawn and seekh kebab finished with Kusturi special spicy sauce. Served with naan bread.',
    price: '£20.65',
  },
  {
    num: '03',
    name: 'Sea Bass Samba',
    desc: 'Whole sea bass cooked in a special mustard sauce with a touch of spice. A true showcase of Kusturi\'s creative kitchen.',
    price: '£14.95',
  },
  {
    num: '04',
    name: 'Special Butter Chicken',
    desc: 'Tender tandoori chicken cooked in a creamy butter sauce with tomatoes, mild spices and finished with fresh cream.',
    price: '£13.95',
  },
  {
    num: '05',
    name: 'Kusturi Loaded Naan',
    desc: 'Freshly baked naan loaded with grilled favourites, signature sauces and bold Indian flavours. The most talked-about dish at Kusturi.',
    price: 'From £15.95',
  },
  {
    num: '06',
    name: 'Kusturi Special Biryani',
    desc: 'Chicken tikka, spinach & potatoes stir fried with basmati rice, topped with omelette. A celebration in a dish.',
    price: '£16.95',
  },
];

const TESTIMONIALS = [
  {
    initials: 'SR',
    name: 'Sarah R.',
    source: 'Google Reviews',
    stars: 5,
    text: 'Absolutely stunning food and atmosphere. The lamb shank was melt-in-your-mouth perfection. Kusturi is easily the best Indian restaurant in Colchester.',
  },
  {
    initials: 'JM',
    name: 'James M.',
    source: 'TripAdvisor',
    stars: 5,
    text: 'The Kusturi Spicy Grill is extraordinary — a sizzling platter that arrives looking like a piece of theatre. Service is warm and attentive throughout.',
  },
  {
    initials: 'PK',
    name: 'Priya K.',
    source: 'Google Reviews',
    stars: 5,
    text: 'We came for Banquet Night and left completely satisfied. Five courses for £19.95 is remarkable value. Will absolutely be coming back.',
  },
];

const GOOGLE_MAPS_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!3m2!1sen!2sbd!4v1781548616189!5m2!1sen!2sbd!6m8!1m7!1saxx1PqOE9QpIL8VHCiSH1A!2m2!1d51.88574608636571!2d0.9071702612888165!3f330.2281240046627!4f-0.27414560600807647!5f0.7820865974627469';

// ─── COMPONENTS ──────────────────────────────────────────────

function Navbar({ mobileOpen, setMobileOpen }: { mobileOpen: boolean; setMobileOpen: (v: boolean) => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <a href="#" className="navbar-logo">
          <Image src="/images/logo.png" alt="Kusturi" width={120} height={52} style={{ height: '52px', width: 'auto' }} />
        </a>
        <ul className="nav-links">
          {['#about', '#menu', '#specials', '#gallery', '#location'].map((href, i) => (
            <li key={href}>
              <a href={href}>{['About', 'Menu', 'Specials', 'Gallery', 'Find Us'][i]}</a>
            </li>
          ))}
        </ul>
        <a href="tel:01206239474" className="btn btn-gold nav-cta">
          Reserve a Table
        </a>
        <button className="hamburger" onClick={() => setMobileOpen(true)} aria-label="Open menu">
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mobile-overlay${mobileOpen ? ' open' : ''}`} onClick={() => setMobileOpen(false)} />
      <div className={`mobile-nav${mobileOpen ? ' open' : ''}`}>
        <button className="mobile-nav-close" onClick={() => setMobileOpen(false)}>✕</button>
        {['#about', '#menu', '#specials', '#gallery', '#location'].map((href, i) => (
          <a key={href} href={href} onClick={() => setMobileOpen(false)}>
            {['About', 'Menu', 'Specials', 'Gallery', 'Find Us'][i]}
          </a>
        ))}
        <a href="tel:01206239474" className="btn btn-gold" style={{ marginTop: '1rem', justifyContent: 'center' }}>
          Reserve a Table
        </a>
      </div>
    </>
  );
}

function GoldLine() {
  return (
    <div className="gold-line">
      <div className="gold-line-dot" />
    </div>
  );
}

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="testimonial-stars">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="star">★</span>
      ))}
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────
type HomepageMenuCategory = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  order?: number;
};

type HomepageMenuItem = {
  _id: string;
  name: string;
  description?: string;
  price?: number;
  priceDisplay?: string | null;
  category?: string;
  categorySlug: string;
  isSignature?: boolean | null;
  isVegetarian?: boolean | null;
  isSpicy?: boolean | null;
  order?: number;
};

type SiteSettings = {
  restaurantName?: string;
  tagline?: string;
  phone?: string;
  website?: string;
  openingHours?: string | null;
  mapEmbedUrl?: string;
  latitude?: number;
  longitude?: number;
  address?: {
    street?: string;
    city?: string;
    postcode?: string;
    country?: string;
  };
};

type HomepageData = {
  success: boolean;
  siteSettings: SiteSettings | null;
  menuCategories: HomepageMenuCategory[];
  menuItems: HomepageMenuItem[];
};

function formatPrice(item: HomepageMenuItem) {
  if (item.priceDisplay) return item.priceDisplay;
  if (typeof item.price === 'number') return `£${item.price.toFixed(2)}`;
  return '';
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('appetisers');
  const [homepageData, setHomepageData] = useState<HomepageData | null>(null);

  useEffect(() => {
  let mounted = true;

  async function loadHomepageData() {
    try {
      const response = await fetch('/api/homepage');
      const data: HomepageData = await response.json();

      if (mounted && data.success) {
        setHomepageData(data);
      }
    } catch (error) {
      console.error('Failed to load homepage data from Sanity:', error);
    }
  }

  loadHomepageData();

  return () => {
    mounted = false;
  };
}, []);
  // Scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      }),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Hero loaded class for parallax
  useEffect(() => {
    const hero = document.querySelector('.hero');
    if (hero) setTimeout(() => hero.classList.add('loaded'), 100);
  }, []);

  const menuTabs =
  homepageData?.menuCategories?.length
    ? homepageData.menuCategories.map((category) => ({
        id: category.slug,
        label: category.title,
      }))
    : MENU_TABS;

const cmsMenuItems =
  homepageData?.menuItems?.reduce<Record<string, { name: string; desc?: string; price: string }[]>>(
    (acc, item) => {
      if (!acc[item.categorySlug]) {
        acc[item.categorySlug] = [];
      }

      acc[item.categorySlug].push({
        name: item.name,
        desc: item.description,
        price: formatPrice(item),
      });

      return acc;
    },
    {},
  ) || {};

const currentItems =
  homepageData?.menuItems?.length
    ? cmsMenuItems[activeTab] || []
    : MENU_ITEMS[activeTab] || [];

  return (
    <>
      <Navbar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="eyebrow hero-eyebrow">Indian Fine Dining &amp; Takeaway · Colchester</p>
          <h1 className="hero-title">
            Where Spice<br />Meets <em>Soul</em>
          </h1>
          <p className="hero-subtitle">Authentic Indian cuisine, crafted with passion</p>
          <GoldLine />
          <p className="hero-desc">
            Open 7 days a week · 5:00 PM – 11:30 PM<br />
            181B Magdalen Street, Colchester, CO1 2JX
          </p>
          <div className="hero-actions">
            <a href="tel:01206239474" className="btn btn-gold">Reserve a Table</a>
            <a href="#menu" className="btn btn-outline">View Menu</a>
          </div>
        </div>
        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* ── INFO STRIP ── */}
      <div className="info-strip">
        <div className="info-strip-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>
          Open Daily 5:00 PM – 11:30 PM
        </div>
        <div className="info-strip-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg>
          01206 239474
        </div>
        <div className="info-strip-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          181B Magdalen Street, Colchester
        </div>
        <div className="info-strip-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          Banquet Night Every Wednesday
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section className="section section-cream" id="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-image-wrap fade-up">
              <Image
                src="/images/about-main.jpg"
                alt="Kusturi restaurant interior"
                width={560}
                height={700}
                className="about-image-main"
              />
              <Image
                src="/images/about-accent.jpg"
                alt="Indian cuisine at Kusturi"
                width={320}
                height={320}
                className="about-image-accent"
              />
              <div className="about-badge">
                <div className="about-badge-num">7</div>
                <div className="about-badge-label">Days a Week</div>
              </div>
            </div>
            <div className="about-content">
              <p className="eyebrow fade-up">Our Story</p>
              <GoldLine />
              <h2 className="display-lg fade-up fade-up-delay-1">
                Crafted with Passion,<br /><em>Served with Pride</em>
              </h2>
              <p className="body-lg about-text fade-up fade-up-delay-2">
                At Kusturi, we believe Indian cuisine is an art form. Every dish is a celebration of authentic South Asian flavours, crafted by our kitchen team using time-honoured techniques and the finest fresh ingredients.
              </p>
              <p className="body-md about-text fade-up fade-up-delay-2">
                From the gentle heat of our clay tandoor to the fragrant richness of our slow-braised lamb shank, every plate tells a story of heritage, passion and culinary craft.
              </p>
              <div className="about-features fade-up fade-up-delay-3">
                {['Fine Dining Experience', 'Takeaway & Delivery', 'Banquet Night Wednesdays', 'Clay Tandoor Kitchen', 'Chef Signature Dishes', 'Open Every Day'].map(f => (
                  <div className="feature-item" key={f}>
                    <div className="feature-dot" />
                    <span className="feature-label">{f}</span>
                  </div>
                ))}
              </div>
              <a href="tel:01206239474" className="btn btn-outline-dark fade-up fade-up-delay-4">
                Make a Reservation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── SIGNATURE DISHES ── */}
      <section className="section signature-section" id="specials">
        <div className="container">
          <div className="section-header fade-up">
            <p className="eyebrow">The Kitchen's Pride</p>
            <GoldLine />
            <h2 className="display-lg" style={{ color: 'var(--white)' }}>
              Signature <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Dishes</em>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', marginTop: '1rem', fontSize: '0.9rem' }}>
              Dishes that define the Kusturi experience
            </p>
          </div>
          <div className="dishes-grid">
            {SIGNATURE_DISHES.map((dish, i) => (
              <div className="dish-card fade-up" key={dish.num} style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="dish-num">{dish.num}</div>
                <h3 className="dish-name">{dish.name}</h3>
                <p className="dish-desc">{dish.desc}</p>
                <div className="dish-price">{dish.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BANQUET NIGHT ── */}
      <section className="section banquet-section">
        <div className="container">
          <div className="banquet-inner">
            <div className="banquet-block fade-up">
              <div className="banquet-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
              </div>
              <p className="eyebrow">Every Wednesday</p>
              <h3 className="display-md">Banquet <em>Night</em></h3>
              <div className="banquet-price"><sup>£</sup>19.95</div>
              <p>Five courses chosen from our à la carte menu. Upgrade to Signature Dishes, King Prawn or Tandoor Grill for just £3.</p>
              <a href="tel:01206239474" className="btn btn-outline-dark">Book Your Table</a>
            </div>
            <div className="banquet-divider" />
            <div className="banquet-block fade-up fade-up-delay-2">
              <div className="banquet-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <p className="eyebrow">Special Occasion</p>
              <h3 className="display-md">Kurzi Lamb <em>Feast</em></h3>
              <div className="banquet-price"><sup>£</sup>135.95</div>
              <p>A whole leg of lamb for four, with starters, sides and naan. Requires 12 hours notice. An unforgettable centrepiece.</p>
              <a href="tel:01206239474" className="btn btn-outline-dark">Enquire &amp; Book</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── MENU ── */}
      <section className="section menu-section" id="menu">
        <div className="container">
          <div className="section-header fade-up">
            <p className="eyebrow">Explore</p>
            <GoldLine />
            <h2 className="display-lg" style={{ color: 'var(--white)' }}>Our Menu</h2>
          </div>
          <div className="menu-tabs fade-up">
            {menuTabs.map(tab => (
              <button
                key={tab.id}
                className={`menu-tab${activeTab === tab.id ? ' active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="menu-items-grid">
            {currentItems.map((item, i) => (
              <div className="menu-item fade-up" key={i} style={{ transitionDelay: `${i * 0.05}s` }}>
                <div>
                  <div className="menu-item-name">{item.name}</div>
                  {item.desc && <div className="menu-item-desc">{item.desc}</div>}
                </div>
                <div className="menu-item-dots" />
                <div className="menu-item-price">{item.price}</div>
              </div>
            ))}
          </div>
          <div className="menu-cta fade-up">
            <a href="/menu" className="btn btn-outline">View Full Menu</a>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section testimonials-section">
        <div className="container">
          <div className="section-header fade-up">
            <p className="eyebrow">What Our Guests Say</p>
            <GoldLine />
            <h2 className="display-lg" style={{ color: 'var(--green-deep)' }}>
              Loved by <em style={{ fontStyle: 'italic', color: 'var(--gold-dim)' }}>Colchester</em>
            </h2>
          </div>
          <div className="testimonials-grid">
            {TESTIMONIALS.map((t, i) => (
              <div className="testimonial-card fade-up" key={i} style={{ transitionDelay: `${i * 0.12}s` }}>
                <Stars count={t.stars} />
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{t.initials}</div>
                  <div>
                    <div className="author-name">{t.name}</div>
                    <div className="author-source">{t.source}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOCATION ── */}
      <section className="section location-section" id="location">
        <div className="container">
          <div className="location-grid">
            <div className="location-info fade-up">
              <p className="eyebrow">Find Us</p>
              <GoldLine />
              <h2 className="display-lg">
                Visit <em>Kusturi</em>
              </h2>
              <div className="location-details">
                <div className="location-detail">
                  <div className="detail-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <div>
                    <div className="detail-label">Address</div>
                    <div className="detail-value">181B Magdalen Street<br />Colchester, CO1 2JX</div>
                  </div>
                </div>
                <div className="location-detail">
                  <div className="detail-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>
                  </div>
                  <div>
                    <div className="detail-label">Opening Hours</div>
                    <div className="detail-value">Open 7 Days a Week<br />5:00 PM – 11:30 PM (Including All Holidays)</div>
                  </div>
                </div>
                <div className="location-detail">
                  <div className="detail-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg>
                  </div>
                  <div>
                    <div className="detail-label">Reservations &amp; Takeaway</div>
                    <div className="detail-value">01206 239474</div>
                  </div>
                </div>
                <div className="location-detail">
                  <div className="detail-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
                  </div>
                  <div>
                    <div className="detail-label">Website</div>
                    <div className="detail-value">www.kusturi.com</div>
                  </div>
                </div>
              </div>
              <a href="tel:01206239474" className="btn btn-gold">Call to Reserve</a>
            </div>
            <div className="map-wrap fade-up fade-up-delay-2">
              <iframe
                title="Kusturi location"
                src="https://www.google.com/maps/embed?pb=!3m2!1sen!2sbd!4v1781548616189!5m2!1sen!2sbd!6m8!1m7!1saxx1PqOE9QpIL8VHCiSH1A!2m2!1d51.88574608636571!2d0.9071702612888165!3f330.2281240046627!4f-0.27414560600807647!5f0.7820865974627469"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <Image
                src="/images/logo.png"
                alt="Kusturi"
                width={100}
                height={56}
                className="footer-brand-logo"
                style={{ height: '56px', width: 'auto' }}
              />
              <p>Indian Fine Dining &amp; Takeaway, serving Colchester with authentic South Asian cuisine crafted with passion and served with pride.</p>
              <div className="footer-socials">
                <a href="#" className="social-btn" aria-label="Facebook">f</a>
                <a href="#" className="social-btn" aria-label="Instagram">in</a>
                <a href="#" className="social-btn" aria-label="TikTok">tt</a>
              </div>
            </div>
            <div className="footer-col">
              <h4>Navigate</h4>
              <ul>
                <li><a href="#about">About Us</a></li>
                <li><a href="#menu">Menu</a></li>
                <li><a href="#specials">Signature Dishes</a></li>
                <li><a href="#location">Find Us</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Menu</h4>
              <ul>
                <li><a href="#menu">Appetisers</a></li>
                <li><a href="#menu">From the Tandoor</a></li>
                <li><a href="#menu">Korahi Cuisine</a></li>
                <li><a href="#menu">Biryanis</a></li>
                <li><a href="#menu">Kusturi Favourites</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Visit Us</h4>
              <ul>
                <li><a href="#">181B Magdalen Street</a></li>
                <li><a href="#">Colchester, CO1 2JX</a></li>
                <li><a href="tel:01206239474">01206 239474</a></li>
                <li><a href="#">Mon–Sun: 5 PM – 11:30 PM</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2025 Kusturi Indian Fine Dining &amp; Takeaway. All rights reserved.</span>
            <span>Designed with care · <a href="#">Privacy Policy</a></span>
          </div>
        </div>
      </footer>
    </>
  );
}