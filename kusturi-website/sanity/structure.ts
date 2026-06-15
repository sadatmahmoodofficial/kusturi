import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Kusturi CMS')
    .items([
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings'),
        ),
      S.divider(),
      S.documentTypeListItem('menuCategory').title('Menu Categories'),
      S.documentTypeListItem('menuItem').title('Menu Items'),
      S.documentTypeListItem('specialOffer').title('Special Offers'),
      S.documentTypeListItem('testimonial').title('Testimonials'),
      S.documentTypeListItem('galleryImage').title('Gallery Images'),
    ])
