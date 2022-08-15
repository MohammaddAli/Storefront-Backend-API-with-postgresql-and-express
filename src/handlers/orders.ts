import client from '../database'
import express ,{Request,Response} from 'express'
import {Order, storefrontOrder} from '../models/orders'
import jwt, {Secret} from 'jsonwebtoken'


const storeOrder = new storefrontOrder();

const index = async (req: Request, res: Response)=>{
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
    const orders = await storeOrder.index();
    res.json(orders);
} catch(err){
    res.status(400);
    res.json(err);
}
}

const show = async (req: Request, res: Response)=>{
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
        const order = await storeOrder.show(req.params.id as unknown as number);
        res.json(order);
    } catch(err){
        res.status(400);
        res.json(err);
    }
}

const create = async (req: Request, res: Response)=>{
    try {
        console.log('before headerAuthorization in create order')
        const headerAuthorization = req.headers.authorization;
            const token = (headerAuthorization as string).split(' ')[1];
            jwt.verify(token, process.env.TOKEN_SECRET as Secret);
       } catch (error) {
        res.status(401);
        res.json(`acces denied, INVALID TOKEN ${error}`);
        return;
       }
    try {
        console.log('before creating order in create order')
        const order = await storeOrder.create(req.body);
        console.log('before res.json order');
        res.json(order);
        console.log('order ' + order);

    } catch(err){
        res.status(400);
        res.json(err);
    }
}

const update = async (req: Request, res: Response)=>{
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
        const updateorder: Order = {
            status:req.body.status
         }
        const updatedorder = await storeOrder.update(req.body.id, updateorder);
        res.json(updatedorder);
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
        const order = await storeOrder.delete(req.body.id, req.body);
        res.json(order);
    } catch(err){
        res.status(400);
        res.json(err);
    }
}

const addProduct = async (req: Request, res: Response)=>{
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
        const orderProduct =  await storeOrder.addProduct(req.body);
        res.json(orderProduct);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const currentOrder = async (req: Request, res: Response)=>{
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
        const order = await storeOrder.currentOrder(req.params.user_id as unknown as number);
        res.json(order);
    } catch(err){
        res.status(400);
        res.json(err);
    }
}

const order_routes = (app: express.Application)=> {
app.get('/order',index);
app.get('/order/:id',show);
app.post('/order',create);
app.put('/updateOrder',update);
app.delete('/deleteoOrder',destroy);
app.post('order/:id/products', addProduct);
app.get('/order/:user_id',currentOrder);
}

export default order_routes;
