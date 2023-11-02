const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');


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


userRouter.post(
  '/test',
  (req, res, next) => {
    try {
      next({
        status: 200,
        json: { test: 'test' }
      })
    } catch (err) {
      next({
        status: 400,
        json: { error: true, message: 'Error with creating user.' }
      })
    }
  }, responseMiddleware)



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