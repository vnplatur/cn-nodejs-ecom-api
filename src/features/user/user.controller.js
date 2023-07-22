import UserModel from './user.model.js';
import jwt from 'jsonwebtoken';
import UserRepository from './user.repository.js';
import bcrypt from 'bcrypt';

export default class UserController {

  constructor(){
    this.userRepository = new UserRepository();
  }

  async signUp(req, res) {
    const {
      name,
      email,
      password,
      type,
    } = req.body;

    // hash password.
    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = new UserModel(
      name,
      email,
      hashedPassword,
      type
    );
    await this.userRepository.signUp(user);
    res.status(201).send(user);
  }

  async signIn(req, res) {

    let result = await this.userRepository.findByEmail(req.body.email);
    if (!result) {
      return res
        .status(400)
        .send('Incorrect Credentials');
    } else {
      console.log(req.body.password)
      bcrypt.compare(req.body.password, result.password)
        .then((success)=>{
        if(success){
// 1. Create token.
const token = jwt.sign(
  {
    userID: result.id,
    email: result.email,
  },
  'AIb6d35fvJM4O9pXqXQNla2jBCH9kuLz',
  {
    expiresIn: '1h',
  }
);
  // 2. Send token.
  res.status(200).send(token);
        }else{
          res
        .status(400)
        .send('Incorrect Credentials');
        }
    }).catch(err=>{
      res
        .status(400)
        .send('Incorrect Credentials');
    })
    }
  }
}
