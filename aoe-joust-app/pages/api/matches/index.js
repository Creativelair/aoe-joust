import matchesService from '../../../lib/services/matches'

export default (req, res) => {
  if (req.method === 'GET') {
    getMatches(req, res)
  } else if (req.method === 'POST') {
    saveMatch(req, res)
  }
}

const getMatches = async (req, res) => {
  try {
    const matches = await matchesService.getMatches()
    res.statusCode = 200
    res.json(matches)
  } catch (err) {
    res.statusCode = 500
    res.json({ message: 'Error', cause: err.message })
  }
}

const saveMatch = async (req, res) => {
  try {
    if (!req.body.mapId) {
      res.statusCode = 400
      return res.json({ message: 'Field [mapId] is required' })
    }
    if (!req.body.date) {
      res.statusCode = 400
      return res.json({ message: 'Field [date] is required' })
    }
    if (!req.body.teams) {
      res.statusCode = 400
      return res.json({ message: 'Field [teams] is required' })
    }
    if (!req.body.teams.length || !req.body.teams.every(team => team != null)) {
      res.statusCode = 400
      return res.json({ message: 'Field [teams] is empty or is invalid' })
    }

    await matchesService.saveMatch({ mapId: req.body.mapId, date: req.body.date, teams: req.body.teams })
    res.statusCode = 201
    res.json({ message: 'Match created successfully' })
  } catch (err) {
    res.statusCode = 500
    res.json({ message: 'Error', cause: err.message })
  }
}
