import type { Express } from 'express';
import { UserModel as User } from './models';

export const userRoute = (app: Express) => {
  
    app.get('/user/is-exist', async (req, res) => {
    const user = await User.find({
      name: req.query['username'],
      password: req.query['password'],
    });
    if (!user.length) {
        res.status(404).send({ message: 'user not found' });
        return;
    }
    res.send(user);
  });

  app.post('/user/signup', async (req, res) => {
    const { username, password, userType } = req.body;
    const findUser = await User.find({
      name: username,
      password
    });
    if (findUser.length) {
        res.status(409).send({ message: 'user already exists' });
        return;
    }
    const user = new User({
      name: username,
      password,
      userType
    });
    const savedUser = await user.save();
    res.status(201).send(savedUser);
  });
};
