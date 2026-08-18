const test = require('node:test')
const assert = require('node:assert/strict')

const { filterData } = require('../filter')
const { data } = require('../data')

test('filters animals containing the given pattern', () => {
  const data = [
    {
      name: 'Country A',
      people: [
        {
          name: 'Alice',
          animals: [
            { name: 'John Dory' },
            { name: 'Cat' }
          ]
        }
      ]
    }
  ]

  const result = filterData(data, 'ry')

  assert.deepStrictEqual(result, [
    {
      name: 'Country A',
      people: [
        {
          name: 'Alice',
          animals: [
            { name: 'John Dory' }
          ]
        }
      ]
    }
  ])
})

test('removes people with no matching animals', () => {
  const data = [
    {
      name: 'Country A',
      people: [
        {
          name: 'Alice',
          animals: [{ name: 'Cat' }]
        },
        {
          name: 'Bob',
          animals: [{ name: 'Oryx' }]
        }
      ]
    }
  ]

  const result = filterData(data, 'ry')

  assert.deepStrictEqual(result, [
    {
      name: 'Country A',
      people: [
        {
          name: 'Bob',
          animals: [{ name: 'Oryx' }]
        }
      ]
    }
  ])
})

test('removes countries with no matching animals', () => {
  const data = [
    {
      name: 'Country A',
      people: [
        {
          name: 'Alice',
          animals: [{ name: 'Cat' }]
        }
      ]
    }
  ]

  const result = filterData(data, 'ry')

  assert.deepStrictEqual(result, [])
})

test('preserves the original order of matching animals', () => {
  const data = [
    {
      name: 'Country A',
      people: [
        {
          name: 'Alice',
          animals: [
            { name: 'Zebra' },
            { name: 'Cat' },
            { name: 'Zebu' }
          ]
        }
      ]
    }
  ]

  const result = filterData(data, 'Z')

  assert.deepStrictEqual(result[0].people[0].animals, [
    { name: 'Zebra' },
    { name: 'Zebu' }
  ])
})

test('returns an empty array when no animal matches the pattern', () => {
  const data = [
    {
      name: 'Country A',
      people: [
        {
          name: 'Alice',
          animals: [
            { name: 'Cat' },
            { name: 'Dog' }
          ]
        }
      ]
    }
  ]

  const result = filterData(data, 'xyz')

  assert.deepStrictEqual(result, [])
})

test('filtering does not mutate the original data', () => {
  const data = [
    {
      name: 'Country A',
      people: [
        {
          name: 'Alice',
          animals: [
            { name: 'John Dory' },
            { name: 'Cat' }
          ]
        }
      ]
    }
  ]

  const originalData = structuredClone(data)

  filterData(data, 'ry')

  assert.deepStrictEqual(data, originalData)
})

test('matches the expected result for pattern "ry"', () => {
  const result = filterData(data, 'ry')

  assert.deepStrictEqual(result, [
    {
      name: 'Uzuzozne',
      people: [
        {
          name: 'Lillie Abbott',
          animals: [
            { name: 'John Dory' }
          ]
        }
      ]
    },
    {
      name: 'Satanwi',
      people: [
        {
          name: 'Anthony Bruno',
          animals: [
            { name: 'Oryx' }
          ]
        }
      ]
    }
  ])
})