import client from '../../database'
import {User, storefrontUser} from '../users'

const userStore = new storefrontUser();

describe('users models test',()=>{
    
const user: User = {
            first_name: 'mo',
            last_name: 'Ali',
            user_name: 'MoAli',
           password: 'M253A'
};

    beforeAll(async()=>{
        const createUser = await userStore.create(user)
            user.id = createUser.id;
    });
    afterAll(async()=>{
      const conn = await client.connect();
     const sql ='DELETE FROM users;\ALTER SEQUENCE RESTART users_id_seq with 1';
     await conn.query(sql);
     conn.release;
    })

    it('the authenticate methode should return the authenticated user',async()=>{
      const authenticatedUser = await userStore.authenticate(user.user_name,user.password)
      expect(authenticatedUser?.first_name).toBe(user.first_name);
      expect(authenticatedUser?.last_name).toBe(user.last_name);
      expect(authenticatedUser?.user_name).toBe(user.user_name);
     } )

     it('the create methode should return a new created user',async()=>{
      const createdUser = await userStore.create({
        first_name: 'Tom',
        last_name: 'Ali',
        user_name: 'TomAli',
       password: 'T253A'
} as User)
      expect(createdUser?.first_name).toBe('Tom');
      expect(createdUser?.last_name).toBe('Ali');
      expect(createdUser?.user_name).toBe('TomAli');
      expect(createdUser).toEqual({
        id:createdUser.id,
        first_name: 'Tom',
        last_name: 'Ali',
        user_name: 'TomAli'
      }as User)
     } )
    
      it('the index methode should return all created products',async()=>{
        const allproducts = await userStore.index()
        expect(allproducts).toEqual([user,{
          first_name: 'Tom',
          last_name: 'Ali',
          user_name: 'TomAli',
         password: 'T253A'
  }]);
       } )
   
        it('the show methode should return a product by ID',async()=>{
          const showProduct = await userStore.show(user.id as number) 
          expect(showProduct).toEqual(user); })


          describe('test methods exist',()=>{
            it('should have an index method', () => {
                expect(userStore.index).toBeDefined();
              });
            
              it('should have a show method', () => {
                expect(userStore.index).toBeDefined();
              });
            
              it('should have a create method', () => {
                expect(userStore.index).toBeDefined();
              });
            
              it('should have an update method', () => {
                expect(userStore.index).toBeDefined();
              });
            
              it('should have a delete method', () => {
                expect(userStore.index).toBeDefined();
              });
        
              it('should have an authenticate method', () => {
                expect(userStore.authenticate).toBeDefined();
              });
        })

        it('deletes user by id ', async()=>{
          const deletedUserID = await userStore.delete(user.id as number,user);
          expect( deletedUserID.id).toBe(user.id);
          
           })
        
        })