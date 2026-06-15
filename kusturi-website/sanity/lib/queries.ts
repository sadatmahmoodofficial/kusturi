import { groq } from 'next-sanity'

export const homepageMenuCategoriesQuery = groq`
  *[
    _type == "menuCategory" &&
    isActive == true &&
    showOnHomepage == true
  ] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    order
  }
`

export const homepageMenuItemsQuery = groq`
  *[
    _type == "menuItem" &&
    isActive == true &&
    showOnHomepage == true
  ] | order(category->order asc, order asc) {
    _id,
    name,
    description,
    price,
    priceDisplay,
    isSignature,
    isVegetarian,
    isSpicy,
    order,
    "category": category->title,
    "categorySlug": category->slug.current
  }
`

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"] | order(_updatedAt desc)[0] {
    restaurantName,
    tagline,
    phone,
    website,
    openingHours,
    mapEmbedUrl,
    latitude,
    longitude,
    address {
      street,
      city,
      postcode,
      country
    },
    facebookUrl,
    instagramUrl,
    tiktokUrl
  }
`