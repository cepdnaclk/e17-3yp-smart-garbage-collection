// let chai = require('chai');
// let chaiHttp = require('chai-http');
// let server = require('../index');

// // Assertion style
// chai.should();

// chai.use(chaiHttp);

// describe('SIGN UP TESTS', () => {

//     describe("POST /Signup", () => {
//         it("Already existing username test 1", (done) => {
//             const fname = "Harith";
//             const lname = "Jayarathne";
//             const username = "sanaJ";
//             const password = "hari123";
//             chai.request(server)
//                 .post("/Signup/?adminfname=" + fname + '&adminlname=' + lname + '&adminusername=' + username + '&adminpassword=' + password)
//                 .send(fname, lname, username, password)
//                 .end((err, response) => {
//                     if (err) {
//                         console.log(err)
//                     }
//                     else {
//                         response.body.should.be.a('object');
//                         response.body.should.have.property('error').eq("Username already exists");
//                     }

//                     done();
//                 });
//         });

//         it("Already existing username test 2", (done) => {
//             const fname = "Harith";
//             const lname = "Jayarathne";
//             const username = "isara123";
//             const password = "hari123";
//             chai.request(server)
//                 .post("/Signup/?adminfname=" + fname + '&adminlname=' + lname + '&adminusername=' + username + '&adminpassword=' + password)
//                 .send(fname, lname, username, password)
//                 .end((err, response) => {
//                     if (err) {
//                         console.log(err)
//                     }
//                     else {
//                         response.body.should.be.a('object');
//                         response.body.should.have.property('error').eq("Username already exists");
//                     }

//                     done();
//                 });
//         });

//         it("Succesful Sign Up", (done) => {
//             const fname = "Harith";
//             const lname = "Jayarathne";
//             const username = "harithJ";
//             const password = "hari123";
//             chai.request(server)
//                 .post("/Signup/?adminfname=" + fname + '&adminlname=' + lname + '&adminusername=' + username + '&adminpassword=' + password)
//                 .send(fname, lname, username, password)
//                 .end((err, response) => {
//                     if (err) {
//                         console.log(err)
//                     }
//                     else {
//                         response.body.should.be.a('object');
//                         response.body.should.have.property('message').eq("succesful");
//                     }

//                     done();
//                 });
//         });
//     });

// })

