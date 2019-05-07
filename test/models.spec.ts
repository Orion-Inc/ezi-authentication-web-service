import {default as Roles} from "../models/roles"
import {default as Schools} from "../models/school"
import {default as db} from "./test-conn/db.spec"
import {expect} from "chai"

// make the connection before you start something
db();

describe("Testing Role Model", function () {
    it('should should save data to the roles model and return an object', function (done) {
        type Name = {
            name: string,
            short: string,
            description: string
        };
        const Query: Name = {
            name: "BackOffice Administrator",
            short: "ba",
            description: ""
        };
        const req = new Roles(Query);
        req.save(function (err, results) {
            expect(results._id).to.exist;
            expect(results).to.be.an("object");
            expect(results).to.have.property("name");
        });
        done();
    });
});