const { FighterRepository } = require('../repositories/fighterRepository');

class FighterService {
  addFighter(data) {
    const item = FighterRepository.create(data)
    if(!item) {
      return null
    }
    return item
  }

  getFighterById(id) {
    const item = FighterRepository.getOne({ id })
    if(!item) {
      return null
    }
    return item
  }

  getAllFighter() {
    const item = FighterRepository.getAll()
    if(!item) {
      return null
    }
    return item
  }

  deleteFighterById(id) {
    const item = FighterRepository.delete(id)
    if(!item) {
      return null
    }
    return item
  }

  updateFighterById(id, dataToUpdate) {
    const item = FighterRepository.update(id, dataToUpdate)
    if(!item) {
      return null
    }
    return item
  }

}

module.exports = new FighterService();