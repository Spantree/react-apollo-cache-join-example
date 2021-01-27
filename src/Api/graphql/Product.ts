import { extendType, objectType } from 'nexus'
import faker from 'faker'
import _ from 'lodash'
import { brandFixtures } from './Brand'

const productFixtures = _.range(1, 26).map((id) => {
  return {
    id,
    name: faker.commerce.productName(),
    brand: {
      id: _.random(1, brandFixtures.length),
    },
  }
})

export const Product = objectType({
  name: 'Product',
  definition(t) {
    t.int('id')
    t.string('name')
    t.field('brand', { type: 'Brand' })
  },
})

export const ProductsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('products', {
      type: 'Product',
      resolve: () => productFixtures,
    })
  },
})
