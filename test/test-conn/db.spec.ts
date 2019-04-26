import mongoose from "mongoose"
import { expect } from "chai"

// writing a test suit for the connection with the database
before((done) => {
    mongoose.connect(process.env.MONGO_URL_LOCAL, {
        dbName: "schools_testing",
        useNewUrlParser: true
    });
    mongoose.set('useCreateIndex', true);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, "connection error"));
    db.once('open', () => {
        done();
    });
});

after( (done) => {
    mongoose.connection.close(done);
});

export default () => {
    afterEach((done) => {
        mongoose.connection.db.dropDatabase(done);
    });
}