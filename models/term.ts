import mongoose from "mongoose"
import { default as Year } from "@models/year"

const Schema = mongoose.Schema;

const TermSchema = new Schema({
    academic_term: {
        type: String,
        required: true
    },
    academic_year_id: {
        type: Schema.Types.ObjectId,
        ref: 'Year',
        required: true
    }
},{
    timestamps:{
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

// making configurations for the middleware hooks
TermSchema.pre("update", function (next) {
    this.update({},{ $set: { updated_at: Date.now() }});
    next();
});

const Term = mongoose.model("Term", TermSchema);
export default Term;