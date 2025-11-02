import mongoose, { Schema, Document } from "mongoose";

// Mongoose document interface
interface IPostDocument extends Document {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

const PostSchema = new Schema<IPostDocument>({
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model<IPostDocument>("Post", PostSchema);