import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'restaurant',
  title: 'Restaurant',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Restaurant Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'short_description',
      title: 'Short Description',
      type: 'string',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'image',
      title: 'Image of the Restaurant',
      type: 'image',
    }),
    defineField({
      name: 'lat',
      title: 'Latitude of The Restaurant',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'long',
      title: 'Longitude of The Restaurant',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Restaurant Address',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Enter a Rating from (1-5 Stars)',
      type: 'number',
      validation: (Rule) => 
      Rule.required()
      .min(1)
      .max(5)
      .error("Please enter a value between 1 and 5"),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      validation: (Rule) => Rule.required(),
      type: 'reference',
      to : [{type: "category"}],
    }),
    defineField({
      name: 'dishes',
      title: 'Dishes',
      type: 'array',
      of: [{type: "reference" , to : [{type: "dish"}] }], 
    }),
  ]
  
})
