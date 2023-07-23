const entities = require("../models");
const Account = entities.Account;

// check for duplicate email or username
checkDuplicateUsernameOrEmail = (req, res, next) => {
  // username
  Account.findOne({
    where: {
      username: req.body.username,
    },
  }).then((account) => {
    if (account) {
      res.status(400).send({
        msg: "Acount with " + username + "exists already",
      });

      return;
    }

    // check email
    Account.findOne({
      where: {
        email: req,
      },
    }).then((account) => {
      if (account) {
        res.status(400).send({
          msg: "Acount with " + email + "exists already",
        });

        return;
      }
    });

    next();
  });
};

const verifyRegistration = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
};

module.exports = verifyRegistration;
