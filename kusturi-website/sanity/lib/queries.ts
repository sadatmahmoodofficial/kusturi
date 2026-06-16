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

export const allMenuCategoriesQuery = groq`
  *[
    _type == "menuCategory" &&
    isActive == true
  ] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    order,
    showOnHomepage
  }
`

export const allMenuItemsQuery = groq`
  *[
    _type == "menuItem" &&
    isActive == true
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

export const specialOffersQuery = groq`
  *[
    _type == "specialOffer" &&
    isActive == true
  ] | order(order asc) {
    _id,
    title,
    eyebrow,
    priceDisplay,
    description,
    ctaLabel,
    order
  }
`

export const testimonialsQuery = groq`
  *[
    _type == "testimonial" &&
    isFeatured == true
  ] | order(order asc) {
    _id,
    customerName,
    initials,
    source,
    rating,
    quote,
    order
  }
`

export const galleryImagesQuery = groq`
  *[
    _type == "galleryImage" &&
    isActive == true
  ] | order(order asc) {
    _id,
    title,
    alt,
    category,
    image,
    order
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