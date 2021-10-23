// let chai = require('chai');
// let chaiHttp = require('chai-http');
// let server = require('../index');

// // Assertion style
// chai.should();

// chai.use(chaiHttp);

// describe('SIGN IN TESTS', () => {

//     describe("POST /Signin", () => {
//         it("User does not exist", (done) => {

//             const username = "sanaJJ";
//             const password = "hari123";
//             chai.request(server)
//                 .post("/Signin/?&adminusername=" + username + '&adminpassword=' + password)
//                 .send(username, password)
//                 .end((err, response) => {
//                     if (err) {
//                         console.log(err)
//                     }
//                     else {
//                         response.body.should.be.a('object');
//                         response.body.should.have.property('error').eq("User doesn't exist");
//                         response.body.should.have.property('auth').eq(false);
//                     }

//                     done();
//                 });
//         });

//         it("Incorrect Passowrd", (done) => {

//             const username = "sanaJ";
//             const password = "hari123";
//             chai.request(server)
//                 .post("/Signin/?&adminusername=" + username + '&adminpassword=' + password)
//                 .send(username, password)
//                 .end((err, response) => {
//                     if (err) {
//                         console.log(err)
//                     }
//                     else {
//                         response.body.should.be.a('object');
//                         response.body.should.have.property('error').eq("Incorrect password");
//                         response.body.should.have.property('auth').eq(false);
//                     }

//                     done();
//                 });
//         });

//         it("Sign in succesful", (done) => {

//             const username = "sanaJ";
//             const password = "sana123";
//             chai.request(server)
//                 .post("/Signin/?&adminusername=" + username + '&adminpassword=' + password)
//                 .send(username, password)
//                 .end((err, response) => {
//                     if (err) {
//                         console.log(err)
//                     }
//                     else {
//                         response.body.should.be.a('object');
//                         response.body.should.have.property('auth').eq(true);
//                     }

//                     done();
//                 });
//         });

//     });

// })

