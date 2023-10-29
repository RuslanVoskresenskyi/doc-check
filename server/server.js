const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Використання body-parser для обробки JSON даних
app.use(bodyParser.json());

// Дозвіл на CORS (якщо плануєте здійснювати запити з React на цей сервер)
app.use(cors());

// Роути
app.get('/', (req, res) => {
  const data = {
    message: 'Сервер працює!',
    someData: 'Інші дані, які ви хочете передати'
  };

  res.json(data); // Відправка об'єкта як відповідь
});
// Додайте роути, які вам потрібні для вашого додатка

// Прослуховування на певному порті
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Сервер запущено на порті ${PORT}`);
});