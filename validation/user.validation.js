const {user} = require('../models/user')
const {UserRepository} = require('../repositories/userRepository')

// email - только gmail почты
// phoneNumber: +380xxxxxxxxx
// password - строка, min 3 символа

const isEmailCorrect = (user) => {
  return user.email.includes("@gmail.com")
}

const isPhoneNumberCorrect = (user) => {
  return user.phoneNumber.slice(0, 4) === '+380' && user.phoneNumber.length === 13
}

const isPasswordCorrect = (user) => {
  return user.password.length > 2
}


const isEqualToUserModel = (reqBody) => {
  if (typeof reqBody !== typeof user) return false

  if (reqBody.id) return false

  const reqBodyKeys = Object
    .keys(reqBody)
    .sort()
    .filter(key => key !== 'id')

  const userKeys = Object
    .keys(user)
    .sort()
    .filter(key => key !== 'id')

  if (reqBodyKeys.length !== userKeys.length) return false

  if (!reqBodyKeys.every((value, i) => value === userKeys[i])) return false

  return true
}

const isCorrectUserFieldsValues = (user) => {
  return isEmailCorrect(user) &&
         isPhoneNumberCorrect(user) &&
         isPasswordCorrect(user)
}

const isUniqueUserFieldsValidation = (newUser) => {
  const allUsers = UserRepository.getAll()

  return !allUsers.some(user => user.email === newUser.email || user.phoneNumber === newUser.phoneNumber )
}

const isCorrectUpdateUser = (reqBody) => {
  if (typeof reqBody !== typeof user) return false

  if (reqBody.id) return false

  const reqBodyKeys = Object.keys(reqBody)

  const userKeys = Object.keys(user)

  if (!reqBodyKeys.length) return false

  if (!reqBodyKeys.every(key => userKeys.includes(key))) return false

  if (reqBody.email) {
    if (!isEmailCorrect(reqBody)) return false
  }

  if (reqBody.phoneNumber) {
    if (!isPhoneNumberCorrect(reqBody)) return false
  }

  if (reqBody.password) {
    if (!isPasswordCorrect(reqBody)) return false
  }

  return true
}

exports.isEqualToUserModel = isEqualToUserModel
exports.isCorrectUserFieldsValues = isCorrectUserFieldsValues
exports.isUniqueUserFieldsValidation = isUniqueUserFieldsValidation
exports.isCorrectUpdateUser = isCorrectUpdateUser