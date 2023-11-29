const { UserRepository } = require('../repositories/userRepository')

class UserService {

    addUser(data) {
        const item = UserRepository.create(data)
        if(!item) {
            return null
        }
        return item
    }

    getUserById(id) {
        const item = UserRepository.getOne({ id })
        if(!item) {
            return null
        }
        return item
    }

    getUserByEmail(email) {
        const item = UserRepository.getOne({ email })
        if(!item) {
            return null
        }
        return item
    }

    getAllUser() {
        const item = UserRepository.getAll()
        if(!item) {
            return null
        }
        return item
    }

    deleteUserById(id) {
        const item = UserRepository.delete(id)
        if(!item) {
            return null
        }
        return item
    }

    updateUserById(id, dataToUpdate) {
        const item = UserRepository.update(id, dataToUpdate)
        if(!item) {
            return null
        }
        return item
    }
}

module.exports = new UserService()