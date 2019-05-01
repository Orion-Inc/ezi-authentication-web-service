import { expect } from "chai"
import { default as app } from "../app"
import request from "supertest"

describe("GET /testing", function () {
    it('should return a testing message', function (done) {
        request(app)
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