import playersService from '../../../lib/services/players'

export default (req, res) => {
  if (req.method === 'GET') {
    getPlayer(req, res)
  }
}

const getPlayer = async (req, res) => {
  try {
    const {
      query: { id },
    } = req
    const player = await playersService.getPlayer(id)
    if (player !== null) {
      res.statusCode = 200
      res.json(player)
    } else {
      res.statusCode = 404
      res.json({ message: 'Player not found' })
    }
  } catch (err) {
    res.statusCode = 500
    res.json({ message: 'Error', cause: err.message })
  }
}
