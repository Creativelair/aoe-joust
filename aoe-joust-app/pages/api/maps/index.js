import mapsService from '../../../lib/services/maps'

export default (req, res) => {
  if (req.method === 'GET') {
    getMaps(req, res)
  } else if (req.method === 'POST') {
    saveMaps(req, res)
  }
}

const getMaps = async (req, res) => {
  try {
    const teams = await mapsService.getMaps()
    res.statusCode = 200
    res.json(teams)
  } catch (err) {
    res.statusCode = 500
    res.json({ message: 'Error', cause: err.message })
  }
}

const saveMaps = async (req, res) => {
  try {
    if (!req.body.name) {
      res.statusCode = 400
      return res.json({ message: 'Field [name] is required' })
    }
    if (!req.body.image) {
      res.statusCode = 400
      return res.json({ message: 'Field [image] is required' })
    }

    await mapsService.saveMap({ name: req.body.name, image: req.body.image })
    res.statusCode = 201
    res.json({ message: 'Map created successfully' })
  } catch (err) {
    res.statusCode = 500
    res.json({ message: 'Error', cause: err.message })
  }
}
