import mongoose from "mongoose"
import { default as School } from "@models/school"

const Schema = mongoose.Schema;

const YearSchema = new Schema({
    academic_year: {
        type: String,
        required: true
    },
    school_id: {
        type: Schema.Types.ObjectId,
        ref: 'School',
        required: true
    }
},{
    timestamps:{
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

// making configurations for the middleware hooks
YearSchema.pre("update", function (next) {
    this.update({},{ $set: { updated_at: Date.now() }});
    next();
});

const Year = mongoose.model("Year", YearSchema);
export default Year;