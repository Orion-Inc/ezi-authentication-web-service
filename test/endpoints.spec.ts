import { expect } from "chai"
import { default as Server } from "../app"
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