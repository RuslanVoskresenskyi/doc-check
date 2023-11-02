const {
  isEqualToFighterModel,
  isUniqueFighterNameValidation,
  isCorrectUpdateFighter,
  isCorrectFighterFieldsValues
} = require('../validation/fighter.validation')

const createFighterValid = (req, res, next) => {
  if (!isEqualToFighterModel(req.body)) {
    return res
      .status(400)
      .json({message: 'Request body is not equal to fighter model.'})
  }
  if (!isUniqueFighterNameValidation(req.body)) {
    return res
      .status(400)
      .json({message: 'This name already use.'})
  }

  next()
}

const updateFighterValid = (req, res, next) => {
  if (!isUniqueFighterNameValidation(req.body)) {
    return res
      .status(400)
      .json({message: 'This name already use.'})
  }

  if (!isCorrectUpdateFighter(req.body)) {
    return res
      .status(400)
      .json({message: 'Request body is not correct for update.'})
  }
  next()
}

exports.createFighterValid = createFighterValid
exports.updateFighterValid = updateFighterValid