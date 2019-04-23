import mongoose from "mongoose"

const Schema = mongoose.Schema;

const SchoolSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    motto: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
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

const School = mongoose.model("Schools", SchoolSchema);
export default School;