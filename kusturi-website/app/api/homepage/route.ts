import { NextResponse } from 'next/server'

import { client } from '@/sanity/lib/client'
import {
  galleryImagesQuery,
  homepageMenuCategoriesQuery,
  homepageMenuItemsQuery,
  siteSettingsQuery,
  specialOffersQuery,
  testimonialsQuery,
} from '@/sanity/lib/queries'

export async function GET() {
  try {
    const [
      siteSettings,
      menuCategories,
      menuItems,
      specialOffers,
      testimonials,
      galleryImages,
    ] = await Promise.all([
      client.fetch(siteSettingsQuery),
      client.fetch(homepageMenuCategoriesQuery),
      client.fetch(homepageMenuItemsQuery),
      client.fetch(specialOffersQuery),
      client.fetch(testimonialsQuery),
      client.fetch(galleryImagesQuery),
    ])

    return NextResponse.json({
      success: true,
      siteSettings,
      menuCategories,
      menuItems,
      specialOffers,
      testimonials,
      galleryImages,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    )
  }
}