const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');
const mammoth = require('mammoth');
const fileUpload = require('express-fileupload');


const userRouter = Router();

userRouter.post(
  '/',
  createUserValid,
  (req, res, next) => {
    try {
      const addedUser = UserService.addUser(req.body)
      next({
        status: 200,
        json: addedUser
      })
    } catch (err) {
      next({
        status: 400,
        json: { error: true, message: 'Error with creating user.' }
      })
    }
  }, responseMiddleware)

userRouter.post('/test', fileUpload(), (req, res, next) => {
  if (!req.files || !req.files.docxFile) {
    return res.status(400).send('Файл не був завантажений.');
  }

  const docxFile = req.files.docxFile;

  if (docxFile.mimetype !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    return res.status(400).send('Формат файлу повинен бути .docx');
  }

  function removeImgTags(htmlString) {
    // Видаляє <img> теги з рядка
    return htmlString.replace(/<img[^>]*>/gi, '');
  }

  mammoth.convertToHtml({ buffer: docxFile.data })
    .then((result) => {
      // Отриманий HTML
      const html = result.value;
      res.json({ html: removeImgTags(html) });
    })
    .catch((error) => {
      console.error('Помилка при конвертації Docx в HTML:', error);
      res.status(500).send('Помилка при конвертації Docx в HTML');
    });
});

userRouter.post('/convertDocxToHtml', (req, res) => {
  if (!req.files || !req.files.docxFile) {
    return res.status(400).send('Файл не був завантажений.');
  }

  const docxFile = req.files.docxFile;

  mammoth.extractRawText({ buffer: docxFile.data })
    .then((result) => {
      // Отриманий HTML
      const html = result.value;
      res.send(html);
    })
    .catch((error) => {
      console.error('Помилка при конвертації Docx в HTML:', error);
      res.status(500).send('Помилка при конвертації Docx в HTML');
    });
});


userRouter.get(
  '/',
  (req, res, next) => {
    try {
      const findUsers = UserService.getAllUser()

      next({
        status: 200,
        json: findUsers
      })
    } catch (err) {
      next({
        status: 404,
        json: { error: true, message: 'Error with find all users.' }
      })
    }
  }, responseMiddleware)

userRouter.get(
  '/:id',
  (req, res, next) => {
    try {
      const findUser = UserService.getUserById(req.params.id)

      next({
        status: 200,
        json: findUser
      })
    } catch (err) {
      next({
        status: 404,
        json: { error: true, message: 'Error with find user by id.' }
      })
    }
  }, responseMiddleware)

userRouter.delete(
  '/:id',
  (req, res, next) => {
    try {
      const deletedUser = UserService.deleteUserById(req.params.id)

      next({
        status: 200,
        json: deletedUser
      })
    } catch (err) {
      next({
        status: 404,
        json: { error: true, message: 'Error with delete user by id.' }
      })
    }
  }, responseMiddleware)

userRouter.put(
  '/:id',
  updateUserValid,
  (req, res, next) => {
    try {
      const updatedUser = UserService.updateUserById(req.params.id, req.body)

      next({
        status: 200,
        json: updatedUser
      })
    } catch (err) {
      next({
        status: 404,
        json: {error: true, message: 'Error with delete user by id.'}
      })
    }
  }, responseMiddleware)


module.exports = userRouter;