const UserService = require('./userService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthService {
    login({ email, password }) {
        try {
            // Отримання користувача за ім'ям користувача
            const user = UserService.getUserByEmail(email);

            // Перевірка чи знайдений користувач та чи вірний пароль
            if (!user || !(bcrypt.compare(password, user.password))) {
                throw new Error('Invalid username or password');
            }

            // Генерація токену
            const token = this.generateToken(user);

            return { user, token };
        } catch (error) {
            throw Error('Authentication failed');
        }
    }

    generateToken(user) {
        const payload = {
            userId: user.id,
            username: user.username,
            // Додайте інші дані користувача, які ви хочете включити в токен
        };

        const secretKey = 'your-secret-key'; // Замініть на свій секретний ключ
        const options = { expiresIn: '1h' }; // Можете налаштувати термін дії токена

        const token = jwt.sign(payload, secretKey, options);
        return token;
    }

}

module.exports = new AuthService();