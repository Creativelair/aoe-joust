import matchesService from '../../../../lib/services/matches'

export default (req, res) => {
  if (req.method === 'GET') {
    getMatch(req, res)
  }
}

const getMatch = async (req, res) => {
  try {
    const {
      query: { id },
    } = req
    const match = await matchesService.getMatch(id)
    if (match !== null) {
      res.statusCode = 200
      res.json(match)
    } else {
      res.statusCode = 404
      res.json({ message: 'Match not found' })
    }
  } catch (err) {
    res.statusCode = 500
    res.json({ message: 'Error', cause: err.message })
  }
}
