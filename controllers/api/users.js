const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/user');

module.exports = {
  create,
  login,
  checkToken
};

async function create(req, res) {
  try {
    // Add the user to the db
    const user = await User.create(req.body);
  // Only include minimal fields in the token payload to avoid embedding sensitive mongoose internals
  const token = createJWT({ _id: user._id, name: user.name, email: user.email });
    res.json(token);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({email: req.body.email});
    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
  const token = createJWT({ _id: user._id, name: user.name, email: user.email });
    res.json(token);
  } catch (err) {
    res.status(400).json('Bad Credentials');
  }
}

function checkToken(req, res) {
  res.json(req.exp);
}

/*--- Helper Functions --*/

function createJWT(user) {
  return jwt.sign(
    // data payload
  { user },
  process.env.SECRET,
    { expiresIn: '24h' }
  );
}