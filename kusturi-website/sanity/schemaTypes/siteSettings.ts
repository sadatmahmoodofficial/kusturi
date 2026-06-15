import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'restaurantName',
      title: 'Restaurant Name',
      type: 'string',
      initialValue: 'Kusturi',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      initialValue: 'Indian Fine Dining & Takeaway',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Homepage Hero Title',
      type: 'string',
      initialValue: 'Where Spice Meets Soul',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      initialValue: '01206 239474',
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
      initialValue: 'https://www.kusturi.com',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'object',
      fields: [
        defineField({ name: 'street', title: 'Street', type: 'string', initialValue: '181B Magdalen Street' }),
        defineField({ name: 'city', title: 'City', type: 'string', initialValue: 'Colchester' }),
        defineField({ name: 'postcode', title: 'Postcode', type: 'string', initialValue: 'CO1 2JX' }),
        defineField({ name: 'country', title: 'Country', type: 'string', initialValue: 'United Kingdom' }),
      ],
    }),
    defineField({
      name: 'openingHoursDisplay',
      title: 'Opening Hours Display Text',
      type: 'string',
      initialValue: 'Open 7 days a week · 5:00 PM – 11:30 PM',
    }),
    defineField({
      name: 'mapEmbedUrl',
      title: 'Google Maps Embed URL',
      type: 'url',
      initialValue:
        'https://www.google.com/maps/embed?pb=!3m2!1sen!2sbd!4v1781548616189!5m2!1sen!2sbd!6m8!1m7!1saxx1PqOE9QpIL8VHCiSH1A!2m2!1d51.88574608636571!2d0.9071702612888165!3f330.2281240046627!4f-0.27414560600807647!5f0.7820865974627469',
    }),
    defineField({
      name: 'latitude',
      title: 'Latitude',
      type: 'number',
      initialValue: 51.88574608636571,
    }),
    defineField({
      name: 'longitude',
      title: 'Longitude',
      type: 'number',
      initialValue: 0.9071702612888165,
    }),
    defineField({ name: 'facebookUrl', title: 'Facebook URL', type: 'url' }),
    defineField({ name: 'instagramUrl', title: 'Instagram URL', type: 'url' }),
    defineField({ name: 'tiktokUrl', title: 'TikTok URL', type: 'url' }),
  ],
  preview: {
    select: {
      title: 'restaurantName',
      subtitle: 'tagline',
    },
  },
})
