import civilizationsService from '../../../lib/services/civilizations'

export default (req, res) => {
  if (req.method === 'GET') {
    getCivilizations(req, res)
  } else if (req.method === 'POST') {
    saveCivilizations(req, res)
  }
}

const getCivilizations = async (req, res) => {
  try {
    const teams = await civilizationsService.getCivilizations()
    res.statusCode = 200
    res.json(teams)
  } catch (err) {
    res.statusCode = 500
    res.json({ message: 'Error', cause: err.message })
  }
}

const saveCivilizations = async (req, res) => {
  try {
    if (!req.body.name) {
      res.statusCode = 400
      return res.json({ message: 'Field [name] is required' })
    }
    if (!req.body.image) {
      res.statusCode = 400
      return res.json({ message: 'Field [image] is required' })
    }

    await civilizationsService.saveCivilization({ name: req.body.name, image: req.body.image })
    res.statusCode = 201
    res.json({ message: 'Civilization created successfully' })
  } catch (err) {
    res.statusCode = 500
    res.json({ message: 'Error', cause: err.message })
  }
}
