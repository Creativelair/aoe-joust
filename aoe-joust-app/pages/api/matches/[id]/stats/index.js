import matchesService from '../../../../../lib/services/matches'

export default (req, res) => {
  if (req.method === 'GET') {
    getStats(req, res)
  } else if (req.method === 'POST') {
    saveStats(req, res)
  }
}

const getStats = async (req, res) => {
  try {
    const {
      query: { id },
    } = req
    const match = await matchesService.getStats(id)
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

const saveStats = async (req, res) => {
  try {
    if (!req.body.stats) {
      res.statusCode = 400
      return res.json({ message: 'Field [stats] is required' })
    }
    if (!req.body.stats.length || !req.body.stats.every(stat => stat != null)) {
      res.statusCode = 400
      return res.json({ message: 'Field [stats] is empty or is invalid' })
    }

    const {
      query: { id },
    } = req
    await matchesService.saveStats({ matchId: id, stats: req.body.stats })
    res.statusCode = 200
    res.json({ message: 'Stats updated successfully' })
  } catch (err) {
    res.statusCode = 500
    res.json({ message: 'Error', cause: err.message })
  }
}
