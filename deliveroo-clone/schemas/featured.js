import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'featured',
  title: 'featured Menu Categories',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Featured Category Name',
      type: 'string',
    }),
    defineField({
      name: 'short_description',
      title: 'Short Description',
      type: 'string',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'restaurants',
      title: 'Restaurants',
      type: 'array',
      of : [{type : "reference", to: [{type: 'restaurant'}] }]
    }),

  ]
})
