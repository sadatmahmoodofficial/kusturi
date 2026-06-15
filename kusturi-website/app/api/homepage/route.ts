import { NextResponse } from 'next/server'

import { client } from '@/sanity/lib/client'
import {
  homepageMenuCategoriesQuery,
  homepageMenuItemsQuery,
  siteSettingsQuery,
} from '@/sanity/lib/queries'

export async function GET() {
  try {
    const [siteSettings, menuCategories, menuItems] = await Promise.all([
      client.fetch(siteSettingsQuery),
      client.fetch(homepageMenuCategoriesQuery),
      client.fetch(homepageMenuItemsQuery),
    ])

    return NextResponse.json({
      success: true,
      siteSettings,
      menuCategories,
      menuItems,
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