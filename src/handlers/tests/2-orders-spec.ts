import app from '../../server'
import supertest from 'supertest'
import {token} from './1-users-spec'
import client from '../../database'
import {Order} from '../../models/orders';
import {Product} from '../../models/products';
import {OrderProducts} from '../../models/orders';

 // it('completed order, app.put(\'/updateUser\',update)', async(done)=>{
  //   const res = await request.post('/??????').set('Authorization', `Bearer ${token}`)
  //   expect(res.status).toBe(200);
  //   expect(res.body[0].user_id).toEqual(1);

  //   done();
  //    })

const request = supertest(app);

const order: Order =  {status:'Active', user_id:1};
const product: Product =  {name:'tommy tshirt', price:35};
  
describe('orders handlers test', ()=>{
  
it('creates a new order)', async()=>{
  const res = await request.post('/order').set('Authorization', `Bearer ${token}`).send(order);
  console.log(token);
  expect(res.status).toBe(200)
  expect(res.body.status).toBe('Active');
  expect(res.body.user_id).toBe(1);
  
  })

  it('should add a product to an order', async() => {
    const res = await request.post('order/1/products').set('Authorization', `Bearer ${token}`)
        .send(order)
        .expect(201)
        .expect({
            id: 1,
            order_id: 1,
            product_id: 1,
            quantity: 10,
        })
        
})

it('gets current order ', async()=>{
  const res = await request.get('/order/1').set('Authorization', `Bearer ${token}`)
  expect(res.status).toBe(200);
  expect(res.body.status).toEqual('Active');
  expect(res.body).toEqual({
    id: 1,
    quantity: 5,
    order_id: 1,
    product_id: 1
  } as OrderProducts);
  
   })

   it('orders should get all orders', async() => {
    const res = await request.get('/order').set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect([{status:'Active', user_id:1},{name:'tommy tshirt', price:35}]);
        
})

it('orders should get order by ID', async() => {
  const res = await request.get('/order/1').set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect({status:'Active', user_id:1});
      
})

it('should update an order', async() => {
  const updatedtOrder : Order= {status:'Active', user_id:1}
  const res = await request.put('/updateOrder').set('Authorization', `Bearer ${token}`)
      .send(updatedtOrder)
      .expect(200)
      .expect({status:'Active', user_id:1});
      
})

it('should delete an order given its id', async() => {
  const res = await request.delete(`/deleteoOrder`).set('Authorization', `Bearer ${token}`)
  .send({id:1, status:'Active', user_id:1})
        .expect(200)
       
})

})
 
   
    