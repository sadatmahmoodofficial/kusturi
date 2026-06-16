import Link from 'next/link'

import { client } from '@/sanity/lib/client'
import {
  allMenuCategoriesQuery,
  allMenuItemsQuery,
  siteSettingsQuery,
} from '@/sanity/lib/queries'

type MenuCategory = {
  _id: string
  title: string
  slug: string
  description?: string
  order?: number
  showOnHomepage?: boolean
}

type MenuItem = {
  _id: string
  name: string
  description?: string
  price?: number
  priceDisplay?: string | null
  category?: string
  categorySlug: string
  isSignature?: boolean | null
  isVegetarian?: boolean | null
  isSpicy?: boolean | null
  order?: number
}

type SiteSettings = {
  restaurantName?: string
  tagline?: string
  phone?: string
  website?: string
  openingHours?: string | null
  address?: {
    street?: string
    city?: string
    postcode?: string
    country?: string
  }
}

function formatPrice(item: MenuItem) {
  if (item.priceDisplay) return item.priceDisplay
  if (typeof item.price === 'number') return `£${item.price.toFixed(2)}`
  return ''
}

export const metadata = {
  title: 'Menu | Kusturi Indian Fine Dining & Takeaway',
  description:
    'View the full Kusturi Indian Fine Dining & Takeaway menu in Colchester, including appetisers, tandoori dishes, korahi, massala, biryani and house favourites.',
}

export default async function MenuPage() {
  const [siteSettings, categories, menuItems] = await Promise.all([
    client.fetch<SiteSettings | null>(siteSettingsQuery),
    client.fetch<MenuCategory[]>(allMenuCategoriesQuery),
    client.fetch<MenuItem[]>(allMenuItemsQuery),
  ])

  const groupedMenuItems = categories.map((category) => ({
    ...category,
    items: menuItems.filter((item) => item.categorySlug === category.slug),
  }))

  return (
    <main className="full-menu-page">
      <section className="full-menu-hero">
        <div className="container">
          <Link href="/" className="full-menu-back">
            ← Back to Home
          </Link>

          <p className="eyebrow full-menu-eyebrow">
            {siteSettings?.tagline || 'Indian Fine Dining & Takeaway'}
          </p>

          <h1 className="display-lg full-menu-title">
            Kusturi <em>Full Menu</em>
          </h1>

          <p className="body-lg full-menu-intro">
            Explore our full selection of freshly prepared Indian dishes,
            including classic appetisers, clay oven favourites, rich house
            specialities, korahi dishes, massala delicacies and signature
            Kusturi favourites.
          </p>

          <div className="full-menu-contact">
            <span>
              {siteSettings?.address?.street || '181B Magdalen Street'}
              {siteSettings?.address?.city ? `, ${siteSettings.address.city}` : ''}
              {siteSettings?.address?.postcode
                ? `, ${siteSettings.address.postcode}`
                : ''}
            </span>
            <span>{siteSettings?.phone || '01206 239474'}</span>
            <span>
              {siteSettings?.openingHours ||
                'Open 7 days a week · 5:00 PM – 11:30 PM'}
            </span>
          </div>
        </div>
      </section>

      <section className="full-menu-content section-cream">
        <div className="container">
          <nav className="full-menu-category-nav" aria-label="Menu categories">
            {groupedMenuItems.map((category) => (
              <a key={category._id} href={`#${category.slug}`}>
                {category.title}
              </a>
            ))}
          </nav>

          <div className="full-menu-sections">
            {groupedMenuItems.map((category) => (
              <section
                key={category._id}
                id={category.slug}
                className="full-menu-category-section"
              >
                <div className="full-menu-category-header">
                  <p className="eyebrow">Kusturi Menu</p>
                  <h2 className="display-md">{category.title}</h2>
                  {category.description ? (
                    <p className="body-md">{category.description}</p>
                  ) : null}
                </div>

                {category.items.length > 0 ? (
                  <div className="full-menu-items-grid">
                    {category.items.map((item) => (
                      <article key={item._id} className="full-menu-item-card">
                        <div className="full-menu-item-main">
                          <div>
                            <h3>{item.name}</h3>

                            {item.description ? (
                              <p>{item.description}</p>
                            ) : null}

                            <div className="full-menu-badges">
                              {item.isSignature ? (
                                <span>Signature</span>
                              ) : null}
                              {item.isVegetarian ? (
                                <span>Vegetarian</span>
                              ) : null}
                              {item.isSpicy ? <span>Spicy</span> : null}
                            </div>
                          </div>

                          <strong>{formatPrice(item)}</strong>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <p className="body-md full-menu-empty">
                    Items will be added to this category soon.
                  </p>
                )}
              </section>
            ))}
          </div>

          <div className="full-menu-cta">
            <p className="body-md">
              For reservations, takeaway orders or allergy information, please
              contact the restaurant directly.
            </p>

            <a
              href={`tel:${(siteSettings?.phone || '01206239474').replace(
                /\s/g,
                '',
              )}`}
              className="btn btn-gold"
            >
              Call to Order
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}