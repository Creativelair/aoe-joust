import matchesService from '../../../../../../lib/services/matches'

export default (req, res) => {
  if (req.method === 'GET') {
    getPlayerStats(req, res)
  }
}

const getPlayerStats = async (req, res) => {
  try {
    const {
      query: { id, playerId },
    } = req
    const match = await matchesService.getPlayerStats(id, playerId)
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
