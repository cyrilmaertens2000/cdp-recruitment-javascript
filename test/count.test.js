const test = require('node:test')
const assert = require('node:assert/strict')

const { countData } = require('../count')

test('adds the number of people to country names', () => {
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
          animals: [{ name: 'Dog' }]
        }
      ]
    }
  ]

  const result = countData(data)

  assert.equal(result[0].name, 'Country A [2]')
})

test('adds the number of animals to people names', () => {
  const data = [
    {
      name: 'Country A',
      people: [
        {
          name: 'Alice',
          animals: [
            { name: 'Cat' },
            { name: 'Dog' },
            { name: 'Rabbit' }
          ]
        }
      ]
    }
  ]

  const result = countData(data)

  assert.equal(result[0].people[0].name, 'Alice [3]')
})

test('handles a country with no people', () => {
  const data = [
    {
      name: 'Country A',
      people: []
    }
  ]

  const result = countData(data)

  assert.deepStrictEqual(result, [
    {
      name: 'Country A [0]',
      people: []
    }
  ])
})

test('handles a person with no animals', () => {
  const data = [
    {
      name: 'Country A',
      people: [
        {
          name: 'Alice',
          animals: []
        }
      ]
    }
  ]

  const result = countData(data)

  assert.deepStrictEqual(result, [
    {
      name: 'Country A [1]',
      people: [
        {
          name: 'Alice [0]',
          animals: []
        }
      ]
    }
  ])
})

test('keeps animals unchanged', () => {
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

  const result = countData(data)

  assert.deepStrictEqual(result[0].people[0].animals, [
    { name: 'Cat' },
    { name: 'Dog' }
  ])
})

test('counting does not mutate the original data', () => {
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

  const originalData = structuredClone(data)

  countData(data)

  assert.deepStrictEqual(data, originalData)
})