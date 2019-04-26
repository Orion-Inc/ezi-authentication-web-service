import mongoose from "mongoose"
import { expect } from "chai"

// writing a test suit for the connection with the database
before(function(done) {
    mongoose.connect(process.env.MONGO_URL_LOCAL, {
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

// after( function(done) {
//     mongoose.connection.close(done);
// });

export default function () {
    after( function(done) {
        mongoose.connection.close(done);
        mongoose.connection.db.dropDatabase(done);
    });
}