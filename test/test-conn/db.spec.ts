import mongoose from "mongoose"
import { expect } from "chai"
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });
// writing a test suit for the connection with the database
before(function(done) {
    mongoose.connect("mongodb://127.0.0.1:27017", {
        dbName: "schools_testing",
        useNewUrlParser: true
    });
    mongoose.set('useCreateIndex', true);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, "connection error"));
    db.once('open', function() {
        done();
    });
});

after( function(done) {
    mongoose.connection.close(done);
});

export default function () {
    afterEach( function(done) {
        mongoose.connection.db.dropDatabase(done);
    });
}