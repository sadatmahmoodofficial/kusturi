import { NextResponse } from 'next/server'

import { client } from '@/sanity/lib/client'
import { homepageMenuItemsQuery } from '@/sanity/lib/queries'

export async function GET() {
  try {
    const menuItems = await client.fetch(homepageMenuItemsQuery)

    return NextResponse.json({
      success: true,
      count: menuItems.length,
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