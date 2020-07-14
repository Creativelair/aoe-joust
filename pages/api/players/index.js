import playersService from '../../../lib/services/players'

export default (req, res) => {
  if (req.method === 'GET') {
    getPlayers(req, res)
  }
}

const getPlayers = async (req, res) => {
  try {
    const players = await playersService.getPlayers()
    res.statusCode = 200
    res.json(players)
  } catch (err) {
    res.statusCode = 500
    res.json({ message: 'Error', cause: err.message })
  }
}
