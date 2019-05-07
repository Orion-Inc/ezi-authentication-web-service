import mongoose from "mongoose"

const Schema = mongoose.Schema;

const SchoolSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    motto: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    website: {
        type: String,
        required: false
    },
    is_basic: {
        type: Boolean,
        required: true
    },
    is_secondary: {
        type: Boolean,
        required: true
    },
},{
    timestamps:{
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

// making configurations for the middleware hooks
SchoolSchema.pre("update", function (next) {
    this.update({},{ $set: { updated_at: Date.now() }});
    next();
});

const School = mongoose.model("Schools", SchoolSchema);
export default School;