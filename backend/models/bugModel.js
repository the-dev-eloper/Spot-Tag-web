import mongoose from 'mongoose';

const bugSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, },
        category: { type: String, required: true, },
        language: { type: String, required: true, },
        reason: { type: String, required: true,},
        testingTool: { type: String, required: true, },
        solution: { type: String, required: true, },
        refLink: { type: String, required: true, },
        addedBy: { type: String, required: true, },
    },
    {
        timestamps: true,
    }
);

const Bug = mongoose.model('Bug', bugSchema);
export default Bug;
