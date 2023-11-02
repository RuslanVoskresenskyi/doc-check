const { Router } = require('express')
const FighterService = require('../services/fighterService')
const { responseMiddleware } = require('../middlewares/response.middleware')
const { createFighterValid, updateFighterValid } = require('../middlewares/fighter.validation.middleware')

const fighterRouter = Router()

fighterRouter.post(
  '/',
  createFighterValid,
  (req, res, next) => {
    try {
      const addedFighter = FighterService.addFighter(req.body)

      next({
        status: 200,
        json: addedFighter
      })
    } catch (err) {
      next({
        status: 400,
        json: { error: true, message: 'Error with creating fighter.' }
      })
    }
  }, responseMiddleware)

fighterRouter.get(
  '/',
  (req, res, next) => {
    try {
      const findFighters = FighterService.getAllFighter()

      next({
        status: 200,
        json: findFighters
      })
    } catch (err) {
      next({
        status: 404,
        json: { error: true, message: 'Error with find all fighters.' }
      })
    }
  }, responseMiddleware)

fighterRouter.get(
  '/:id',
  (req, res, next) => {
    try {
      const findFighter = FighterService.getFighterById(req.params.id)

      next({
        status: 200,
        json: findFighter
      })
    } catch (err) {
      next({
        status: 404,
        json: { error: true, message: 'Error with find fighter by id.' }
      })
    }
  }, responseMiddleware)

fighterRouter.delete(
  '/:id',
  (req, res, next) => {
    try {
      const deletedFighter = FighterService.deleteFighterById(req.params.id)

      next({
        status: 200,
        json: deletedFighter
      })
    } catch (err) {
      next({
        status: 404,
        json: { error: true, message: 'Error with delete fighter by id.' }
      })
    }
  }, responseMiddleware)

fighterRouter.put(
  '/:id',
  updateFighterValid,
  (req, res, next) => {
    try {
      const updatedFighter = FighterService.updateFighterById(req.params.id, req.body)

      next({
        status: 200,
        json: updatedFighter
      })
    } catch (err) {
      next({
        status: 404,
        json: {error: true, message: 'Error with delete fighter by id.'}
      })
    }
  }, responseMiddleware)


module.exports = fighterRouter