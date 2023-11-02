const {
    isEqualToUserModel,
    isUniqueUserFieldsValidation,
    isCorrectUpdateUser,
    isCorrectUserFieldsValues
} = require('../validation/user.validation')

const createUserValid = (req, res, next) => {
    if (!isEqualToUserModel(req.body)) {
        return res
          .status(400)
          .json({message: 'Request body is not equal to user model.'})
    }

    if (!isCorrectUserFieldsValues(req.body)) {
        return res
          .status(400)
          .json({message: 'User fields don`t correct'})
    }

    if (!isUniqueUserFieldsValidation(req.body)) {
        return res
          .status(400)
          .json({message: 'This email or phone number already use.'})
    }

    next()
}

const updateUserValid = (req, res, next) => {
    if (!isUniqueUserFieldsValidation(req.body)) {
        return res
          .status(400)
          .json({message: 'This name already use.'})
    }

    if (!isCorrectUpdateUser(req.body)) {
        return res
          .status(400)
          .json({message: 'Request body is not correct for update.'})
    }
    next()
}

exports.createUserValid = createUserValid
exports.updateUserValid = updateUserValid