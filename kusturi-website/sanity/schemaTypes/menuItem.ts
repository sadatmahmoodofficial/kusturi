import { defineField, defineType } from 'sanity'

export const menuItem = defineType({
  name: 'menuItem',
  title: 'Menu Item',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Dish Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Menu Category',
      type: 'reference',
      to: [{ type: 'menuCategory' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Use numbers only, for example 13.95.',
    }),
    defineField({
      name: 'priceDisplay',
      title: 'Price Display Text',
      type: 'string',
      description: 'Use this for text like “From £15.95” or “+£1.50”. If filled, this appears instead of the numeric price.',
    }),
    defineField({
      name: 'image',
      title: 'Dish Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'dietaryTags',
      title: 'Dietary / Menu Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Vegetarian', value: 'vegetarian' },
          { title: 'Vegan Available', value: 'veganAvailable' },
          { title: 'Spicy', value: 'spicy' },
          { title: 'Hot', value: 'hot' },
          { title: 'Chef Signature', value: 'chefSignature' },
          { title: 'Contains Nuts', value: 'containsNuts' },
          { title: 'Contains Fish', value: 'containsFish' },
          { title: 'Contains Dairy', value: 'containsDairy' },
        ],
      },
    }),
    defineField({
      name: 'isSignature',
      title: 'Signature Dish',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'showOnHomepage',
      title: 'Show on Homepage Menu Preview',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'isActive',
      title: 'Show on Website',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category.title',
      media: 'image',
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
