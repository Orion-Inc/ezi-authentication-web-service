import { expect } from "chai"
import { default as Server } from "../app"
import request from "supertest"

const server = new Server();
describe("GET /testing", function () {
    it('should return a testing message', function (done) {
        return request(server)
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