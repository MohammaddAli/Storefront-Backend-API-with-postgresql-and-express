import client from '../database'
import express ,{Request,Response} from 'express'
import {User, storefrontUser} from '../models/users'
import jwt, {Secret} from 'jsonwebtoken'

const userStore = new storefrontUser();

const index = async (req: Request, res: Response)=>{
    try {
        const headerAuthorization = req.headers.authorization;
        // console.log("headerAuthorization is " + headerAuthorization);
        // console.log('before split in index');
        const token = (headerAuthorization as string).split(' ')[1];
        jwt.verify(token,process.env.TOKEN_SECRET as Secret);
    } catch (error) {
        res.status(401);
        res.json(`acces denied, INVALID TOKEN ${error}`);
        return;
    }
    try {
        const users = await userStore.index();
        res.json(users);
    } catch(err){
        res.status(400);
        res.json(`INVALID TOKEN ${err}`);
    }
}

const show = async (req: Request, res: Response)=>{
   try {
    const headerAuthorization = req.headers.authorization;
    // console.log('before split in show');
        const token = (headerAuthorization as string).split(' ')[1];
        // console.log("headerAuthorization is " + headerAuthorization);
        jwt.verify(token, process.env.TOKEN_SECRET as Secret);
   } catch (error) {
    res.status(401);
    res.json(`acces denied, INVALID TOKEN ${error}`);
    return;
   }
   
    try {
        const users = await userStore.show(req.params.id as unknown as number);
        res.json(users);
    } catch(err){
        res.status(400);
        res.json(err);
    }
}

const create = async (req: Request, res: Response)=>{
    try {
        // console.log('say anything');
        const users = await userStore.create(req.body);
        // console.log('before jwt');
        let token = jwt.sign({user:users}, process.env.TOKEN_SECRET as Secret);
        // console.log('after jwt');
        res.json(token);
        // console.log(`the token create user in user handlers is${JSON.stringify(token)}`);
    } catch(err){
        res.status(400);
        res.json(err);
    }
}

const update = async (req: Request, res: Response)=>{

    try {
        const headerAuthorization = req.headers.authorization;
        const token = (headerAuthorization as string).split(' ')[1];
       
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET as Secret);
        // if((decoded as jwt.JwtPayload).user_name !== req.body.user_name) {
        //     throw new Error('User Name does not match!');
        // }
    } catch(err) {
        res.status(401);
        res.json(err);
        return;
    }
    try {
        const updated = await userStore.update(req.params.id as unknown as number, req.body);
        res.json(updated);
    } catch(err){
        res.status(400);
        res.json(err);
    }
} 

const destroy = async (req: Request, res: Response)=>{
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
        const deleted = await userStore.delete(req.body.id,req.body);
        res.json(deleted);
    } catch(err){
        res.status(400);
        res.json(err);
    }
}


const authenticate = async (req: Request, res: Response)=>{
    try {
        const headerAuthorization = req.headers.authorization;
        console.log('before split in auth');
        const token = (headerAuthorization as string).split(' ')[1];
        jwt.verify(token,process.env.TOKEN_SECRET as Secret);
        console.log(`the token in jwt.veriftin user handlers is${JSON.stringify(token)}`);
    } catch (error) {
        res.status(401);
        res.json(`acces denied, INVALID TOKEN ${error}`);
        return;
    }
    try {
        const userAuthentication = await userStore.authenticate(req.body.user_name,req.body.password);
        res.json(userAuthentication);
        console.log(`the user Authentication in jwt.verift in user handlers is ${JSON.stringify(userAuthentication)}`);

    } catch(err){
        res.status(400);
        res.json(err);
    }
}

const user_routes = (app: express.Application)=> {
app.get('/user',index);
app.get('/user/:id',show);
app.post('/user',create);
app.put('/updateUser/:id',update);
app.delete('/deleteUser',destroy);
app.post('/authenticate',authenticate);
}


export default user_routes;