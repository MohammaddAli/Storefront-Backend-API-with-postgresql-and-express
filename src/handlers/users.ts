import express, { Request, Response } from 'express';
import { storefrontUser } from '../models/users';
import jwt, { Secret } from 'jsonwebtoken';

const userStore = new storefrontUser();

const index = async (req: Request, res: Response) => {
  try {
    const headerAuthorization = req.headers.authorization;
    const token = (headerAuthorization as string).split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET as Secret);
  } catch (error) {
    res.status(401);
    res.json(`acces denied, INVALID TOKEN ${error}`);
    return;
  }
  try {
    const users = await userStore.index();
    res.json(users);
  } catch (err) {
    res.status(400);
    res.json(`INVALID TOKEN ${err}`);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const headerAuthorization = req.headers.authorization;
    const token = (headerAuthorization as string).split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET as Secret);
  } catch (error) {
    res.status(401);
    res.json(`acces denied, INVALID TOKEN ${error}`);
    return;
  }

  try {
    const users = await userStore.show(req.params.id as unknown as number);
    res.json(users);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const users = await userStore.create(req.body);
    const token = jwt.sign({ user: users }, process.env.TOKEN_SECRET as Secret);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const headerAuthorization = req.headers.authorization;
    const token = (headerAuthorization as string).split(' ')[1];

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as Secret);
    if ((decoded as jwt.JwtPayload).user_name !== req.body.user_name) {
      throw new Error('User Name does not match!');
    }
  } catch (err) {
    res.status(401);
    res.json(err);
    return;
  }
  try {
    const updated = await userStore.update(
      req.params.id as unknown as number,
      req.body
    );
    res.json(updated);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const headerAuthorization = req.headers.authorization;
    const token = (headerAuthorization as string).split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET as Secret);
  } catch (error) {
    res.status(401);
    res.json(`acces denied, INVALID TOKEN ${error}`);
    return;
  }

  try {
    const deleted = await userStore.delete(req.body.id);
    res.json(deleted);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const authenticate = async (req: Request, res: Response) => {
  try {
    const userAuthentication = await userStore.authenticate(
      req.body.user_name,
      req.body.password
    );
    res.json(userAuthentication);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const user_routes = (app: express.Application) => {
  app.get('/user', index);
  app.get('/user/:id', show);
  app.post('/user', create);
  app.put('/updateUser/:id', update);
  app.delete('/deleteUser', destroy);
  app.post('/authenticate', authenticate);
};

export default user_routes;
