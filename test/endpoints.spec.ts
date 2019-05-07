import {expect} from "chai"
import * as _ from "lodash"
import request from "supertest"

const server = request.agent("http://localhost:8088");
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
describe("POST /auth/signup", function() {
    it('should validate the password', function (done) {
        server.
            post("/api/v1/auth/signup")
            .send({
                name: "Presec International",
                email: "presec@gmail.com",
                password: "LordBanks@1996",
                phone: _.toNumber("0200746418"),
                is_basic: true,
                is_secondary: false
            })
            .expect("Content-Type",/json/)
            .expect(403)
            .end((err, response) => {
               console.log(response.body)
                done();
            });
    });
});