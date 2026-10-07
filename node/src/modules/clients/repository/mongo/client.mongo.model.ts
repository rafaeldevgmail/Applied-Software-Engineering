import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    userId: { type: Number, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, default: null },
    company: { type: String, default: null },
    status: { type: String, default: "prospect" },
    notes: { type: String, default: null },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true, versionKey: false, id: false },
);

const existingClient = mongoose.models.Client as
  | mongoose.Model<any>
  | undefined;

export const ClientModel =
  existingClient ?? mongoose.model("Client", clientSchema);
