import mongoose, {Document, Model, Schema, Types} from 'mongoose';
import bcrypt from 'bcrypt';
import { boolean } from 'zod/v4';

export interface IUser extends Document {
  _id: Types.ObjectId;
  userName: string;
  email: string;
  password: string;
  stripe_id: string;
  isAdmin: boolean;
  comparePassword(candidate: string): Promise<boolean>;
}


const UserSchema = new Schema<IUser>({
        userName: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true},
        stripe_id: { type: String, required: true },
        isAdmin: { type: Boolean, default: null, required: false}
    },
    {timestamps: true, collection: 'users'},
);

UserSchema.pre("save", async function (next) {
  // Only hash if the password is new or changed
  if (!this.isModified("password")) return next();

  const saltRounds = 10;
  const rawPassword = this.password;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashed = await bcrypt.hash(rawPassword, salt);
  this.password = hashed;

  next();
});

/**compare password string with password hash*/
UserSchema.methods.comparePassword = async function (testPassword: string) {
  return bcrypt.compare(testPassword, this.password);
};

/**User model*/
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
