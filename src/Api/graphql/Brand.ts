import { objectType, extendType } from 'nexus'

export const brandFixtures = [
  { id: 1, name: 'Gucci' },
  { id: 2, name: 'Prada' },
  { id: 3, name: 'Offwhite' },
  { id: 4, name: 'Adidas Originals' },
  { id: 5, name: 'Saint Laurent' },
  { id: 6, name: 'Nike' },
]

export const Brand = objectType({
  name: 'Brand',
  definition(t) {
    t.int('id')
    t.string('name')
  },
})

export const BrandsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('brands', {
      type: 'Brand',
      resolve: () => brandFixtures,
    })
  },
})
