import client from '../database'
import express ,{Request,Response} from 'express'
import {Product, storefrontProduct} from '../models/products'
import jwt, {Secret} from 'jsonwebtoken'


const storeProduct = new storefrontProduct();

const index = async (req: Request, res: Response)=>{
    try {
        const headerAuthorization = req.headers.authorization
            const token = (headerAuthorization as string).split(' ')[1]
            jwt.verify(token, process.env.TOKEN_SECRET as Secret)
       } catch (error) {
        res.status(401);
        res.json(`acces denied, INVALID TOKEN ${error}`);
        return;
       }
    try {
        const products = await storeProduct.index();
        res.json(products);
    } catch(err){
        res.status(400);
        res.json(err);
    }
}

const show = async (req: Request, res: Response)=>{
    try {
        const headerAuthorization = req.headers.authorization
            const token = (headerAuthorization as string).split(' ')[1]
            jwt.verify(token, process.env.TOKEN_SECRET as Secret)
       } catch (error) {
        res.status(401);
        res.json(`acces denied, INVALID TOKEN ${error}`);
        return;
       }
    try {
        const products = await storeProduct.show(req.params.id as unknown as number);
        res.json(products);
    } catch(err){
        res.status(400);
        res.json(err);
    }
}

const create = async (req: Request, res: Response)=>{
    try {
        const headerAuthorization = req.headers.authorization
            const token = (headerAuthorization as string).split(' ')[1]
            jwt.verify(token, process.env.TOKEN_SECRET as Secret)
       } catch (error) {
        res.status(401);
        res.json(`acces denied, INVALID TOKEN ${error}`);
        return;
       }
    try {
        const products = await storeProduct.create(req.body);
        res.json(products);
    } catch(err){
        res.status(400);
        res.json(err);
    }
}

const update = async (req: Request, res: Response)=>{
    try {
        const headerAuthorization = req.headers.authorization
            const token = (headerAuthorization as string).split(' ')[1]
            jwt.verify(token, process.env.TOKEN_SECRET as Secret)
       } catch (error) {
        res.status(401);
        res.json(`acces denied, INVALID TOKEN ${error}`);
        return;
       }
    try {
        const updateProduct: Product = {
            name:req.body.name,
            price:req.body.price
         }
        const updatedProduct = await storeProduct.update(req.body.id,updateProduct);
        res.json(updatedProduct);
    } catch(err){
        res.status(400);
        res.json(err);
    }
} 

const destroy = async (req: Request, res: Response)=>{
    try {
        const headerAuthorization = req.headers.authorization
            const token = (headerAuthorization as string).split(' ')[1]
            jwt.verify(token, process.env.TOKEN_SECRET as Secret)
       } catch (error) {
        res.status(401);
        res.json(`acces denied, INVALID TOKEN ${error}`);
        return;
       }
    try {
        const products = await storeProduct.delete(req.params as unknown as number,req.body);
        res.json(products);
    } catch(err){
        res.status(400);
        res.json(err);
    }
}

const product_routes = (app: express.Application)=> {
    app.get('/product',index)
    app.get('/product/:id',show)
    app.post('/product',create)
    app.put('/updateProduct',update)
    app.delete('/deleteProduct',destroy)
}


export default product_routes;