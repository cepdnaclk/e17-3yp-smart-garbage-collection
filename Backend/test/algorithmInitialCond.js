// let chai = require('chai');
// let chaiHttp = require('chai-http');
// let server = require('../index');

// // Assertion style
// chai.should();

// chai.use(chaiHttp);

// describe('TESTING ASSIGNING AUTOMATION ALGORITHM (INITIAL CONDITION)', () => {

//     /*
//     send from bin Id 1, 2, 4
//     bin Id 3 (from same unit) is already assigned to collector Id 2 (in 'Sent' or 'Accepted' status)
//     -> request should be assigned to collector Id 2
//     */

//     // 
//     describe("POST /Hardware/assign/:binId", () => {
//         it("Checking initial condition test 1", (done) => {
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
//                         response.body.should.have.property('selectedColId').eq(2);
//                         response.body.should.have.property('criteria').eq(0);
//                     }

//                     done();
//                 });
//         });

//     });

//     describe("POST /Hardware/assign/:binId", () => {
//         it("Checking initial condition test 2", (done) => {
//             const binId = "2";
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
//                         response.body.should.have.property('criteria').eq(0);
//                     }

//                     done();
//                 });
//         });

//     });

//     describe("POST /Hardware/assign/:binId", () => {
//         it("Checking initial condition test 3", (done) => {
//             const binId = "4";
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
//                         response.body.should.have.property('criteria').eq(0);
//                     }

//                     done();
//                 });
//         });

//     });


//     // 2. criteria 3 (when all col locations are same and tasks are 0)
//     // 3. when criteria 1 chooses a single collector
//     // 4. when criteria 2 chooses a single collector

// })

