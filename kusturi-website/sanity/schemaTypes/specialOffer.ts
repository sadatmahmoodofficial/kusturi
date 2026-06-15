import { defineField, defineType } from 'sanity'

export const specialOffer = defineType({
  name: 'specialOffer',
  title: 'Special Offer',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Offer Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'eyebrow', title: 'Small Label', type: 'string' }),
    defineField({ name: 'priceDisplay', title: 'Price Display', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
    defineField({ name: 'ctaLabel', title: 'Button Label', type: 'string', initialValue: 'Book Your Table' }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', initialValue: 0 }),
    defineField({ name: 'isActive', title: 'Show on Website', type: 'boolean', initialValue: true }),
  ],
  orderings: [
    { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
})
