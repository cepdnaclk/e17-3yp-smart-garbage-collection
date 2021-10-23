// let chai = require('chai');
// let chaiHttp = require('chai-http');
// let server = require('../index');

// // Assertion style
// chai.should();

// chai.use(chaiHttp);

// describe('BIN FILL LEVEL AND COLOR UPDATE TESTS', () => {

//     describe("PUT /Hardware/update/bin", () => {
//         it("test 1", (done) => {
//             const binId = "1";
//             const binFillLevel = '20';
//             const binColor = 'g';
//             chai.request(server)
//                 .put("/Hardware/update/bin/?binId=" + binId + '&binFillLevel=' + binFillLevel + '&binColor=' + binColor)
//                 .send(binId, binFillLevel, binColor)
//                 .end((err, response) => {
//                     if (err) {
//                         console.log(err)
//                     }
//                     else {
//                         response.body.should.be.a('object');
//                         response.body.should.have.property('message').eq("Color & fill level updated");
//                     }

//                     done();
//                 });
//         });

//     });

//     describe("PUT /Hardware/update/bin", () => {
//         it("test 2", (done) => {
//             const binId = "2";
//             const binFillLevel = '60';
//             const binColor = 'y';
//             chai.request(server)
//                 .put("/Hardware/update/bin/?binId=" + binId + '&binFillLevel=' + binFillLevel + '&binColor=' + binColor)
//                 .send(binId, binFillLevel, binColor)
//                 .end((err, response) => {
//                     if (err) {
//                         console.log(err)
//                     }
//                     else {
//                         response.body.should.be.a('object');
//                         response.body.should.have.property('message').eq("Color & fill level updated");
//                     }

//                     done();
//                 });
//         });

//     });

//     describe("PUT /Hardware/update/bin", () => {
//         it("test 3", (done) => {
//             const binId = "500";
//             const binFillLevel = '20';
//             const binColor = 'g';
//             chai.request(server)
//                 .put("/Hardware/update/bin/?binId=" + binId + '&binFillLevel=' + binFillLevel + '&binColor=' + binColor)
//                 .send(binId, binFillLevel, binColor)
//                 .end((err, response) => {
//                     if (err) {
//                         console.log(err)
//                     }
//                     else {
//                         response.should.have.status(400);
//                         response.body.should.be.a('object');
//                         response.body.should.have.property('error').eq("Invalid bin Id");
//                     }

//                     done();
//                 });
//         });

//     });

// })

