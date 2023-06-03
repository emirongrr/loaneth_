import { Schema, model, SchemaTypes, models } from 'mongoose';

export interface ILogUser extends Document {
  id: string;
  snapshot: Snapshot[];
}

const logUserSchema = new Schema<ILogUser>(
  {
    id: {
      type: String,
      required: true,
    },
    snapshot: [
      {
        type: SchemaTypes.Mixed,
      },
    ],
  },
  {
    timestamps: false,
  }
);

const LogUserModel =
  models.LogUser || model('LogUser', logUserSchema, 'LogUserSchema');

export default LogUserModel;
