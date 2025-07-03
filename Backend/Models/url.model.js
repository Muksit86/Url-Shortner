import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    redirectUrl: { type: String, required: true },
    shortId: { type: String, required: true, unique: true },
    visitHistory: [{timestamps:{type:Number}}],
    createdBy: {type:mongoose.Schema.Types.ObjectId, ref:'User', required:true}
}, {timestamps: true})

const urlModel = mongoose.model('Url', urlSchema);
export default urlModel