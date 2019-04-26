import mongoose from "mongoose"

const Schema = mongoose.Schema;

const YearSchema = new Schema({
    academic_year: {
        type: String,
        required: true
    },
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