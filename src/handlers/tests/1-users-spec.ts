import app from '../../server'
import supertest from 'supertest'
import client from '../../database'


// import {User} from '../../models/users'

const request = supertest(app);
export let token = '';

console.log('im in the user test');
  
describe('users handlers test', ()=>{
  console.log('im in the user describe');
  
  it('creates a new user , app.post(\'/user\',create)', async()=>{
    const res = await request.post('/user').send({first_name:'Mo', last_name:'Ali',user_name:'MoAli', password:'M253A'});
    
    console.log('im in the create user test');
    console.log("the res.body is "+JSON.stringify(res.body))
    token = res.body;
    console.log(`the token is ${token}`);
    expect(res.status).toBe(200)
    expect({id:1,first_name:'Mo', last_name:'Ali',user_name:'MoAli'});
    
    })
    
    
    it('gets all users , app.get(\'/user\',index)', async()=>{
        const res = await request.get('/user').set('Authorization', `Bearer ${token}`)
        expect(res.status).toBe(200);
        expect({id:1,first_name:'Mo', last_name:'Ali',user_name:'MoAli'});
        
        })
    
    it('gets user by ID ,app.get(\'/user/:id\',show)', async()=>{
      const res = await request.get('/user/1').set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200);
      expect(res.body.first_name).toBe('Mo');
      expect(res.body.first_name).toBe('Ali');
      expect(res.body.user_name).toBe('MoAli');
      
       })

       it('update a user , app.put(\'/updateUser/:id\',update)', async()=>{
        const res = await request.post('/user/1').set('Authorization', `Bearer ${token}`)
        .send({id:1,first_name:'Tom', last_name:'Ali',user_name:'ToAli'})
        expect(res.status).toBe(200);
        expect({id:1,first_name:'Tom', last_name:'Ali',user_name:'ToAli'});
        
        })

        it('should delete a user, app.delete(\'/deleteUser\',destroy)', () => {
          request.delete('/deleteUser').set('Authorization', `Bearer ${token}`).expect(200);
          
          })   
})

    