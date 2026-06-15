import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kusturi | Indian Fine Dining & Takeaway – Colchester',
  description:
    'Kusturi offers authentic Indian fine dining and takeaway in Colchester. Open 7 days a week 5 PM–11:30 PM. Book a table or call 01206 239474.',
  keywords: 'Indian restaurant Colchester, Indian fine dining, takeaway Colchester, Kusturi, curry Colchester',
  openGraph: {
    title: 'Kusturi | Indian Fine Dining & Takeaway',
    description: 'Authentic Indian cuisine crafted with passion, served with pride. Colchester, CO1 2JX.',
    url: 'https://www.kusturi.com',
    siteName: 'Kusturi',
    locale: 'en_GB',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=Jost:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        {/* Schema.org Restaurant markup for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Restaurant',
              name: 'Kusturi',
              description: 'Indian Fine Dining & Takeaway in Colchester',
              url: 'https://www.kusturi.com',
              telephone: '01206239474',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '181B Magdalen Street',
                addressLocality: 'Colchester',
                postalCode: 'CO1 2JX',
                addressCountry: 'GB',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 51.88574608636571,
                longitude: 0.9071702612888165,
              },
              openingHours: 'Mo-Su 17:00-23:30',
              servesCuisine: 'Indian',
              priceRange: '££',
              hasMenu: 'https://www.kusturi.com/menu',
              acceptsReservations: true,
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}