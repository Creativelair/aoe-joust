import teamsService from '../../../lib/services/teams'

export default (req, res) => {
  if (req.method === 'GET') {
    getTeams(req, res)
  } else if (req.method === 'POST') {
    saveTeam(req, res)
  }
}

const getTeams = async (req, res) => {
  try {
    const teams = await teamsService.getTeams()
    res.statusCode = 200
    res.json(teams)
  } catch (err) {
    res.statusCode = 500
    res.json({ message: 'Error', cause: err.message })
  }
}

const saveTeam = async (req, res) => {
  try {
    if (!req.body.name) {
      res.statusCode = 400
      return res.json({ message: 'Field [name] is required' })
    }
    if (!req.body.players) {
      res.statusCode = 400
      return res.json({ message: 'Field [players] is required' })
    }
    if (!req.body.players.length || !req.body.players.every(player => player != null && !!player.name)) {
      res.statusCode = 400
      return res.json({ message: 'Field [players] is empty or is invalid' })
    }

    await teamsService.saveTeam({ name: req.body.name, players: req.body.players })
    res.statusCode = 201
    res.json({ message: 'Team created successfully' })
  } catch (err) {
    res.statusCode = 500
    res.json({ message: 'Error', cause: err.message })
  }
}
