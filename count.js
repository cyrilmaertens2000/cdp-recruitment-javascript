function countData(data) {
  // Preserve existing fields while returning new objects instead of mutating the originals.
  return data.map(country => ({
    ...country,
    name: `${country.name} [${country.people.length}]`,
    people: country.people.map(person => ({
      ...person,
      name: `${person.name} [${person.animals.length}]`
    }))
  }))
}

module.exports = {
  countData
}