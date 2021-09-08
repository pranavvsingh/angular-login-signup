/* eslint-disable no-useless-catch */
const models = require('../models/models');

exports.register = async (req, next) => {
  try {
    const dbDetails = {
      condition: {
        email: req.body.email,
      },
      table: 'Users',
    };
    const checkUserExist = await models.fetchByEmail(dbDetails);
    if (checkUserExist.length === 0) {
      const {
        firstName, lastName, password, email, collegeName
      } = req.body;

      const data = {
        firstName,
        lastName,
        password,
        email,
        collegeName,
      };

      const saveData = await models.insert(data, 'Users');
      return saveData;
    }
    return false;
  } catch (error) {
    throw error;
  }
};

exports.login = async (req, next) => {
  try {
    const dbDetails = {
      condition: {
        email: req.body.email,
        password: req.body.password,
      },
      table: 'Users',
    };
    const checkUserExist = await models.fetchByEmail(dbDetails);
    if (checkUserExist.length === 1) {
      return checkUserExist;
    }
    return false;
  } catch (error) {
    next(error, null);
  }
};
