import mongoose from 'mongoose';

const languageSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        developer: { type: String, required: true },
        stableRelease: { type: String, required: true },
        firstAppeared: { type: String, required: true },
        bugList: { type: Array, required: true },
    },
    {
        timestamps: true,
    }
);

const Language = mongoose.model('Language', languageSchema);
export default Language;