const { fighter } = require('../models/fighter')
const { FighterRepository } = require('../repositories/fighterRepository')

const isPowerCorrect = (fighter) => {
  return fighter.power > 1 && fighter.power < 100
}

const isDefenseCorrect = (fighter) => {
  return fighter.defense > 1 && fighter.defense < 10
}

const isHealthCorrect = (fighter) => {
  return fighter.health > 80 && fighter.health < 120
}


const isEqualToFighterModel = (reqBody) => {
  if (typeof reqBody !== typeof fighter) return false

  if (reqBody.id) return false

  const reqBodyKeys = Object
    .keys(reqBody)
    .sort()
    .filter(key => key !== 'id' && key !== 'health')

  const fightersKeys = Object
    .keys(fighter)
    .sort()
    .filter(key => key !== 'id' && key !== 'health')

  if (reqBodyKeys.length !== fightersKeys.length) return false

  if (!reqBodyKeys.every((value, i) => value === fightersKeys[i])) return false

  return true
}

const isCorrectFighterFieldsValues = (fighter) => {
  if(fighter.health){
    if(!isHealthCorrect(fighter)) return false
  }
  else{
    fighter.health = 100
  }

  return isPowerCorrect(fighter) && isDefenseCorrect(fighter)
}

const isUniqueFighterNameValidation = (newFighter) => {
  const allFighters = FighterRepository.getAll()

  return !allFighters.some(fighter => fighter.name === newFighter.name)
}

const isCorrectUpdateFighter = (reqBody) => {
  if (typeof reqBody !== typeof fighter) return false

  if (reqBody.id) return false

  const reqBodyKeys = Object.keys(reqBody)

  const fightersKeys = Object.keys(fighter)

  if(!reqBodyKeys.length) return false

  if(!reqBodyKeys.every(key => fightersKeys.includes(key))) return false

  if(reqBody.power){
    if(!isPowerCorrect(reqBody)) return false
  }

  if(reqBody.defense){
    if(!isDefenseCorrect(reqBody)) return false
  }

  if(reqBody.health){
    if(!isHealthCorrect(reqBody)) return false
  }

  return true
}

exports.isEqualToFighterModel = isEqualToFighterModel
exports.isCorrectFighterFieldsValues = isCorrectFighterFieldsValues
exports.isUniqueFighterNameValidation = isUniqueFighterNameValidation
exports.isCorrectUpdateFighter = isCorrectUpdateFighter