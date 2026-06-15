import { defineField, defineType } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'initials', title: 'Initials', type: 'string', validation: (Rule) => Rule.max(4) }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      options: { list: ['Google Reviews', 'TripAdvisor', 'Facebook', 'Website'] },
    }),
    defineField({ name: 'rating', title: 'Rating', type: 'number', initialValue: 5, validation: (Rule) => Rule.min(1).max(5) }),
    defineField({ name: 'quote', title: 'Quote', type: 'text', rows: 4, validation: (Rule) => Rule.required() }),
    defineField({ name: 'isFeatured', title: 'Featured', type: 'boolean', initialValue: true }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', initialValue: 0 }),
  ],
})
