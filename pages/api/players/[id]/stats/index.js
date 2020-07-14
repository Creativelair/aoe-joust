import playersService from '../../../../../lib/services/players'

export default (req, res) => {
  if (req.method === 'GET') {
    getStats(req, res)
  }
}

const getStats = async (req, res) => {
  try {
    const {
      query: { id },
    } = req
    const match = await playersService.getStats(id)
    if (match !== null) {
      res.statusCode = 200
      res.json(match)
    } else {
      res.statusCode = 404
      res.json({ message: 'Stats not found' })
    }
  } catch (err) {
    res.statusCode = 500
    res.json({ message: 'Error', cause: err.message })
  }
}
