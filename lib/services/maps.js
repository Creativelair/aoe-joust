import mapsRepository from '../repositories/maps'

class MapsService {
  async getMaps() {
    const maps = await mapsRepository.getMaps()
    return maps.map(({ MapId, Name, Image }) => ({
      id: MapId,
      name: Name,
      image: Image,
    }))
  }

  async getMap(mapId) {
    const map = await mapsRepository.getMap(mapId)
    if (map == null) {
      return null
    }
    return {
      id: map.MapId,
      name: map.Name,
      image: map.Image,
    }
  }

  async saveMap(data) {
    return await mapsRepository.saveMap(data)
  }
}

export default new MapsService()
