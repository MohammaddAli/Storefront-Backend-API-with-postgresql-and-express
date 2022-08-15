import app from '../../server'
import supertest from 'supertest'
import {token} from './1-users-spec'
import client from '../../database'
import {Product} from '../../models/products'


const request = supertest(app);

describe('Products handlers test', ()=>{
  //create product model first to be able to test on it
const product: Product =  {name:'tommy tshirt', price:35};

  it('creates a product , INSERT INTO products', async()=>{
    const res = await request.post('/product').set('Authorization', `Bearer ${token}`).send(product);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('tommy tshirt');
    expect(res.body.price).toBe(35);
    
    })

    
    it('gets all products , SELECT * FROM products', async()=>{
        const res = await request.get('/product').set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body).toEqual([
          {id:1,name:'tommy tshirt', price:35},
          {id:2,name:'tommy tshirt', price:35},
          // {id:3,name:'tommy tshirt', price:35}
        ]);
        
        })
    
    it('gets product by ID , SELECT * FROM proucts WHERE id = # ', async()=>{
      const res = await request.get(`/product/1`).set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.name).toBe('tommy tshirt');
      expect(res.body.price).toBe(35);
      
       })
   
//        //بردو الupdate
//   it('should have an update product endpoint', async() => {
//       const updatedProduct: Product = {
//         id:1,  
//         name: 'Test',
//           price: 50.0
//       }
//       const res = await request.put(`updateProduct`).set('Authorization', `Bearer ${token}`)
//           .send({id:1,name:'tommy tshirt', price:35})
//           .expect(200)
//           .expect({
//               id: 1,
//               name: 'Test',
//               price:35
//           })
          
//   })

// //اسال عليها
//   it('should delete a product given its id', async() => {
//     const res = await request.delete(`/deleteProduct/1`).set('Authorization', `Bearer ${token}`)
//     .send({id:1,name:'tommy tshirt', price:35})
//     .expect(200);
        
//   })
})



// afterAll(async()=>{
//   const conn = await client.connect();
//  const sql ='DELETE FROM users;\ALTER SEQUENCE RESTART users_id_seq with 1';
//  await conn.query(sql);
//  conn.release;
// })


// //   beforeAll(async(done)=>{
// // await request.post('/product').send(product);
// // done();
// // })

// // afterAll(async()=>{
// //   const conn = await client.connect();
// //  const sql ='DELETE FROM products;\ALTER SEQUENCE RESTART products_id_seq with 1';
// //  await conn.query(sql);
// //  conn.release;
 
// // })  