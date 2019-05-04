import { expect } from "chai"
import { generateUUID, hashPassword , comparePassword , generateToken , shortForRoles } from "../utils/resolvers";

describe("Resolver Function", () => {
    it('should generate a hash password', function (done) {
        hashPassword("lordbanks").then(async (results) => {
            expect(results).to.be.a("string");
            const compare = await comparePassword("lordbanks", results);
            expect(compare).to.equal(true);
        });

        done();
    });

    it('should generate UUID as a string', function (done) {
        generateUUID("offeilord@gmail.com").then((results) => {
            expect(results).to.be.a('string');
            done();
        });
    });

    it('should generate 4 digit token', function (done) {
       const token = generateToken(10000,99999);
       expect(token).to.be.a("number");
       done();
    });

    it('should generate a short name of two characters', function (done) {
        const short = shortForRoles("School Administrator");
        expect(short).to.be.a("string");
        expect(short).to.have.lengthOf(2);
        expect(short).to.equal("sa");
        done();
    });
});

