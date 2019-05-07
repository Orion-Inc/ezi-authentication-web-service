import {expect} from "chai"
import * as _ from "lodash"
import request from "supertest"

const server = request.agent("http://localhost:8088");

// testing the /testing endpoint
describe("GET /testing", function () {
    it('should return a testing message', function (done) {
        server
            .get("/testing")
            .expect(200)
            .end((err, results) => {
                if (err) return done(err);
                expect(results).to.be.an("object");
                expect(results.body.success).to.be.true;
                done();
            });
    });
});

// testing the policies for the sign up endpoint
describe("POST /auth/signup for validating input policies", function () {
    it('should validate against the policies', function (done) {
        server.post("/api/v1/auth/signup")
            .send({
                name: "Presec International",
                email: "presec@gmail.com",
                password: "Lord",
                phone: _.toNumber("0200746418"),
                is_basic: true,
                is_secondary: false
            })
            .expect("Content-Type", /json/)
            .expect(403)
            .end((err, response) => {
                expect(response.body.success).to.be.false;
                expect(response.body.message).to.be.a("string");
                done();
            });
    });
});

// this test returns the user of the associated school
describe("POST /auth/signup for signing up", function () {
    it('should save data to the signup model', function (done) {
        server
            .post("/api/v1/auth/signup")
            .send({
                name: "Presec International",
                email: "presec@gmail.com",
                password: "Lordbanks@1996",
                phone: _.toNumber("0200746418"),
                is_basic: true,
                is_secondary: false
            })
            .expect("Content-Type", /json/)
            .expect(201)
            .end((err, response) => {
                expect(response.body.results.email).to.equal("presec@gmail.com");
                expect(response.body.results).to.have.property("_id");
                expect(response.body.results.uuid).to.be.a("string");
                done();
            });
    });
});
