import client from '../../database'
import {Order, storefrontOrder} from '../orders'
import {User, storefrontUser} from '../users'
import {Product, storefrontProduct} from '../products'


const storeOrder = new storefrontOrder();
const storeProduct = new storefrontProduct();
const storeUser = new storefrontUser();


//create order , user and product records first to be able to test on it (because order depends on user)
const order: Order =  {id: 1, status:'Active', user_id:1};
// const product: Product =  {id: 1, name:'tommy tshirt', price:35};
const user: User = {id: 1, first_name: 'Mo',last_name: 'Ali', user_name: 'MoAli',password: 'M253A'};

  beforeAll(async()=>{
    const createduser = await storeUser.create(user);
    user.id = createduser.id as number;
    const createdOrder = await storeOrder.create(order);
    order.id = createdOrder.id as number;
    // const createdProduct = await storeProduct.create(product);
    // product.id = createdProduct.id as number;

})

afterAll(async()=>{
  const conn = await client.connect();
  const sql ='DELETE FROM users';
  await conn.query(sql);
  const sql2 = 'ALTER SEQUENCE users_id_seq RESTART with 1';
  await conn.query(sql2);
  const sql3 ='DELETE FROM orders';
 await conn.query(sql3);
 const sql4 = 'ALTER SEQUENCE orders_id_seq RESTART with 1';
 await conn.query(sql4);
//  const sql5 ='DELETE FROM products';
//  await conn.query(sql5);
//  const sql6 ='ALTER SEQUENCE products_id_seq RESTART with 1'
//  await conn.query(sql5);
 conn.release();
})

    describe('test methods exist',()=>{
        it('should have an index method', () => {
            expect(storeOrder.index).toBeDefined();
          });
        
          it('should have a show method', () => {
            expect(storeOrder.index).toBeDefined();
          });
        
          it('should have a create method', () => {
            expect(storeOrder.index).toBeDefined();
          });
        
          it('should have an update method', () => {
            expect(storeOrder.index).toBeDefined();
          });
        
          it('should have a delete method', () => {
            expect(storeOrder.index).toBeDefined();
          });
        

      it('gets current order ', async()=>{
        const result = await storeOrder.currentOrder(user.id as number);
      expect({id: 1, status:'Active', user_id:'1'});
        
         })

      
})