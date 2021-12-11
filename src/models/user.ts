import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  active: {
    type: Schema.Types.Boolean,
    default: true,
  },
});

export default model('user', UserSchema);
