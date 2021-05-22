import mongoose from 'mongoose';

const bugSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        category: { type: String, required: true, unique: true },
        language: { type: String, required: true, unique: true },
        reason: { type: String, required: true, unique: true },
        testingTool: { type: String, required: true, unique: true },
        solution: { type: String, required: true, unique: true },
        refLink: { type: String, required: true, unique: true },
        addedBy: { type: String, required: true, unique: true },
    },
    {
        timestamps: true,
    }
);

const Bug = mongoose.model('Bug', bugSchema);
export default Bug;