const { data } = require('./data')
const { filterData } = require('./filter')
const { countData } = require('./count')

const USAGE = 'Usage: node app.js --filter=<pattern> | --count'

function main(args = process.argv.slice(2), output = console) {
  if (args.length === 0) {
    output.error(USAGE)
    return 1
  }

  const filterArg = args.find(arg => arg.startsWith('--filter='))
  const hasCountArg = args.includes('--count')
  const hasUnknownArg = args.some(
    arg => !arg.startsWith('--filter=') && arg !== '--count'
  )

  if (hasUnknownArg) {
    output.error('Unknown argument')
    output.error(USAGE)
    return 1
  }

  if (filterArg && hasCountArg) {
    output.error('Use either --filter or --count, not both')
    return 1
  }

  if (filterArg) {
    const pattern = filterArg.slice('--filter='.length)

    if (pattern.length === 0) {
      output.error('Filter pattern cannot be empty')
      return 1
    }

    output.dir(filterData(data, pattern), { depth: null })
    return 0
  }

  if (hasCountArg) {
    output.dir(countData(data), { depth: null })
    return 0
  }

  output.error(USAGE)
  return 1
}

if (require.main === module) {
  process.exitCode = main()
}

module.exports = {
  main
}