function dataIsValid(body = {}) {
  return Object.values(body).every(
    campo => typeof campo === 'string' && campo.trim() !== ''
  )
}

module.exports = { dataIsValid }