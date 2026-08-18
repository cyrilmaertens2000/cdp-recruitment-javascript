function filterData(data, pattern) {
  // Build a new structure instead of mutating the input data, avoiding side effects.
  return data
    .map(country => {
      // First keep only matching animals, then remove people left with no animals.
      const filteredPeople = country.people
        .map(person => {
          const filteredAnimals = person.animals.filter(animal =>
            animal.name.includes(pattern)
          )

          return {
            ...person,
            animals: filteredAnimals
          }
        })
        .filter(person => person.animals.length > 0)

      return {
        ...country,
        people: filteredPeople
      }
    })
    .filter(country => country.people.length > 0)
}

module.exports = {
  filterData
}