import mongoose from "mongoose"
import { default as Relationship } from "./relationship"


const Schema = mongoose.Schema;

const ParentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    relationship_id: {
        type: Schema.Types.ObjectId,
        ref: 'Relationship',
    }
},{
    timestamps:{
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

// making configurations for the middleware hooks
ParentSchema.pre("update", function (next) {
    this.update({},{ $set: { updated_at: Date.now() }});
    next();
});

const Parent = mongoose.model("Parent", ParentSchema);
export default Parent;