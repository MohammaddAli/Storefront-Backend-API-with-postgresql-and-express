import client from '../../database'
import {Product, storefrontProduct} from '../products'
import {User, storefrontUser} from '../users'

const storeProduct = new storefrontProduct();
const storeUser = new storefrontUser();


const product: Product ={
  id: 1,
  name:'tommy tshirt',
 price:35
}

const user: User = {
  id: 1,
  first_name: 'mo',
  last_name: 'Ali',
  user_name: 'MoAli',
 password: 'M253A'
}

beforeAll(async () => {
          const createdProduct = await storeProduct.create(product);
          product.id = createdProduct.id as number
          const createduser = await storeUser.create(user);
          user.id = createduser.id as number
      })
  
      afterAll(async () => {
        const conn = await client.connect();
         const sql ='DELETE FROM products;\ALTER SEQUENCE RESTART products_id_seq with 1';
         await conn.query(sql);
         const sql2 ='DELETE FROM users;\ALTER SEQUENCE RESTART users_id_seq with 1';
         await conn.query(sql2);
         conn.release;
      })


describe('products models test',()=>{
   
    describe('test methods exist',()=>{
        it('should have an index method', () => {
            expect(storeProduct.index).toBeDefined();
          });
        
          it('should have a show method', () => {
            expect(storeProduct.index).toBeDefined();
          });
        
          it('should have a create method', () => {
            expect(storeProduct.index).toBeDefined();
          });
        
          it('should have an update method', () => {
            expect(storeProduct.index).toBeDefined();
          });
        
          it('should have a delete method', () => {
            expect(storeProduct.index).toBeDefined();
          }); 
    })
    
    it('the create methode should return a new created user',async()=>{
      const createdProduct = await storeProduct.create(product)
      expect(createdProduct?.name).toBe(product.name);
      expect(createdProduct?.price).toBe(product.price);
      expect(createdProduct).toEqual({
        id: 2,
        name:'tommy tshirt',
       price:35
      } )
    })

      it('the index methode should return all created products',async()=>{
        const allproducts = await storeProduct.index()
        expect(allproducts).toEqual([product]);
       } )
   
        it('the show methode should return a product by ID',async()=>{
          const showProduct = await storeProduct.show(product.id as number) 
          expect(showProduct).toEqual(product); })
})
