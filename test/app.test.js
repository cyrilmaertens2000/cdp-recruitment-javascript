const test = require('node:test')
const assert = require('node:assert/strict')

const { main } = require('../app')

const USAGE = 'Usage: node app.js --filter=<pattern> | --count'

function createOutputMock() {
  const errors = []
  const results = []

  return {
    errors,
    results,
    error: message => errors.push(message),
    dir: value => results.push(value)
  }
}

test('returns an error when no argument is provided', () => {
  const output = createOutputMock()

  const exitCode = main([], output)

  assert.equal(exitCode, 1)
  assert.deepStrictEqual(output.errors, [USAGE])
  assert.deepStrictEqual(output.results, [])
})

test('returns an error for an unknown argument', () => {
  const output = createOutputMock()

  const exitCode = main(['--unknown'], output)

  assert.equal(exitCode, 1)
  assert.deepStrictEqual(output.errors, [
    'Unknown argument',
    USAGE
  ])
  assert.deepStrictEqual(output.results, [])
})

test('returns an error for an empty filter pattern', () => {
  const output = createOutputMock()

  const exitCode = main(['--filter='], output)

  assert.equal(exitCode, 1)
  assert.deepStrictEqual(output.errors, [
    'Filter pattern cannot be empty'
  ])
  assert.deepStrictEqual(output.results, [])
})

test('returns an error when filter and count are used together', () => {
  const output = createOutputMock()

  const exitCode = main(['--filter=ry', '--count'], output)

  assert.equal(exitCode, 1)
  assert.deepStrictEqual(output.errors, [
    'Use either --filter or --count, not both'
  ])
  assert.deepStrictEqual(output.results, [])
})

test('runs the filter command', () => {
  const output = createOutputMock()

  const exitCode = main(['--filter=ry'], output)

  assert.equal(exitCode, 0)
  assert.equal(output.results.length, 1)
  assert.deepStrictEqual(output.errors, [])
})

test('runs the count command', () => {
  const output = createOutputMock()

  const exitCode = main(['--count'], output)

  assert.equal(exitCode, 0)
  assert.equal(output.results.length, 1)
  assert.deepStrictEqual(output.errors, [])
})