const services = require('../services/services');

exports.register = async (req, res, next) => {
  try {
    const user = await services.register(req, res, next);
    if (user === false) {
      return res.status(402).send({ status: 402, data: 'User Already Exist' });
    }
    delete user[0].password;
    return res.status(200).send({ status: 200, data: user[0] });
  } catch (error) {
    return res.status(500).send({ status: 500, data: error });
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await services.login(req);
    if (user === false) {
      return res.status(401).send({ status: 401, data: 'Invalid Credentials' });
    }
    delete user[0].password;
    return res.status(200).send({ status: 200, data: user[0] });
  } catch (error) {
    return res.status(500).send({ status: 500, data: error });
  }
};
