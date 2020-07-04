import matchesService from '../../../../../lib/services/matches'

export default (req, res) => {
  if (req.method === 'POST') {
    saveStats(req, res)
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
