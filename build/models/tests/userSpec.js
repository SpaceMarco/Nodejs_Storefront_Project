"use strict";
// import supertest from 'supertest';
// import jwt from 'jsonwebtoken';
// import Randomstring from 'randomstring';
// import jwt_decode from 'jwt-decode';
// import app from '../../server';
// import { User, UserModel } from '../user';
// import auth from '../../middlewares/authorizer';
// const request = supertest(app);
// const userStore = new UserModel();
// let createduser: User;
// export let token: string;
// const user1: User = {
//   first_name: 'Ali',
//   last_name: 'Omar',
//   phone: Randomstring.generate({ length: 12, charset: 'numeric' }) as string,
//   password: '123',
// };
// const user2: User = {
//   first_name: 'Tarek',
//   last_name: 'Hisham',
//   phone: Randomstring.generate({ length: 12, charset: 'numeric' }) as string,
//   password: '123',
// };
// const jsonHeaders = {
//   Accept: 'application/json',
//   'Content-Type': 'application/json',
// };
// describe('testing user model routes: ', () => {
//   beforeAll(async () => {
//     createduser = (await userStore.create(user1)) as User;
//   });
//   it('testing the main/index route', async () => {
//     try {
//       const res = await request.get('/');
//       expect(res.status).toBe(200);
//     } catch (err) {
//       throw err;
//     }
//   });
//   it('testing to create users', async () => {
//     const res = await request.post('/users').send(user2);
//     token = res.body;
//     expect(res.status).toBe(200);
//   });
//   it('testing to show users', async () => {
//     const res = await request
//       .get('/users')
//       .set({ ...jsonHeaders, Authorization: 'Bearer ' + token });
//     expect(res.status).toBe(200);
//   });
//   it('authenticate the user', async () => {
//     const res = await request
//       .post('/authenticate')
//       .set(jsonHeaders)
//       .send({ phone: user1.phone, password: user1.password });
//     expect(res.status).toBe(200);
//     const decodedHeader: User = jwt_decode('Bearer ' + res.body) as User;
//     // spyOn(console, 'log').and.callThrough();
//     // console.log(res.body);
//     // console.log('this is it: \n', decodedHeader.first_name);
//     expect(decodedHeader.first_name as string).toEqual(
//       user1.first_name as string
//     );
//     expect(decodedHeader.last_name as string).toEqual(
//       user1.last_name as string
//     );
//     expect(decodedHeader.phone as string).toEqual(user1.phone as string);
//   });
//   it('testing to delete user', async () => {
//     const res = await request
//       .delete('/users')
//       .set({ ...jsonHeaders, Authorization: 'Bearer ' + token })
//       .send({ id: createduser.id });
//     expect(res.status).toBe(200);
//   });
// });
// export default token;
