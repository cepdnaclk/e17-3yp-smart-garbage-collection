// let chai = require('chai');
// let chaiHttp = require('chai-http');
// let server = require('../index');

// // Assertion style
// chai.should();

// chai.use(chaiHttp);

// describe('TESTING ASSIGNING AUTOMATION ALGORITHM (THIRD CRITERIA)', () => {

//     /*
//     (when all col locations are same and in the same round)
//     -> should assign according to zone
//     */

//     // 
//     describe("POST /Hardware/assign/:binId", () => {
//         it("Checking third criteria test 1", (done) => {
//             const binId = "1";
//             chai.request(server)
//                 .post("/Hardware/assign/" + binId)
//                 .send(binId)
//                 .end((err, response) => {
//                     if (err) {
//                         console.log(err)
//                     }
//                     else {
//                         response.should.have.status(201);
//                         response.body.should.be.a('object');
//                         response.body.should.have.property('message').eq("Request sent succesfully");
//                         response.body.should.have.property('selectedColId').eq(1);
//                         response.body.should.have.property('criteria').eq(3);
//                     }

//                     done();
//                 });
//         });

//     });

//     describe("POST /Hardware/assign/:binId", () => {
//         it("Checking third criteria test 2", (done) => {
//             const binId = "56";
//             chai.request(server)
//                 .post("/Hardware/assign/" + binId)
//                 .send(binId)
//                 .end((err, response) => {
//                     if (err) {
//                         console.log(err)
//                     }
//                     else {
//                         response.should.have.status(201);
//                         response.body.should.be.a('object');
//                         response.body.should.have.property('message').eq("Request sent succesfully");
//                         response.body.should.have.property('selectedColId').eq(2);
//                         response.body.should.have.property('criteria').eq(3);
//                     }

//                     done();
//                 });
//         });

//     });

//     describe("POST /Hardware/assign/:binId", () => {
//         it("Checking third criteria test 3", (done) => {
//             const binId = "88";
//             chai.request(server)
//                 .post("/Hardware/assign/" + binId)
//                 .send(binId)
//                 .end((err, response) => {
//                     if (err) {
//                         console.log(err)
//                     }
//                     else {
//                         response.should.have.status(201);
//                         response.body.should.be.a('object');
//                         response.body.should.have.property('message').eq("Request sent succesfully");
//                         response.body.should.have.property('selectedColId').eq(3);
//                         response.body.should.have.property('criteria').eq(3);
//                     }

//                     done();
//                 });
//         });

//     });



//     // 3. when criteria 1 chooses a single collector
//     // 4. when criteria 2 chooses a single collector

// })