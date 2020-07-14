import civilizationsRepository from '../repositories/civilizations'

class CivilizationsService {
  async getCivilizations() {
    const civilizations = await civilizationsRepository.getCivilizations()
    return civilizations.map(({ CivilizationId, Name, Image }) => ({
      id: CivilizationId,
      name: Name,
      image: Image,
    }))
  }

  async saveCivilization(data) {
    return await civilizationsRepository.saveCivilization(data)
  }
}

export default new CivilizationsService()
