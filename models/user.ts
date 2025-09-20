import mongoose, {Schema, Document,Model } from "mongoose";
import bcrypt from "bcrypt";

interface IUser extends Document{
    username: string;
    name:string;
    password: string;
    createdAt:Date;
    isValidPassword(plain:string): Promise<Boolean>;

}
export interface IUserMethods{
    isValidPassword(plain:string): Promise<Boolean>;
}
export type UserModel = Model<IUser, {}, IUserMethods>;

const UserSchema = new Schema<IUser>(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            minlength:5,
            maxlength:30,
            match: [/^[a-zA-Z0-9_]+$/, "Username must be alphanumeric (letters, numbers, underscores)"],
        },
        name:{
            type:String,
            required:true,
            trim:true
        },
        password:{
            type:String,
            required:true,
            minlength:12,
            maxlength:30
        },
        createdAt:{
            type:Date,
            default:Date.now
        }},
        {timestamps:true}
);
UserSchema.pre('save', async function(next){
        if(!this.isModified('password')) return next();
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password,salt);
        next();
});
// NOTE: password must be selected in the query
UserSchema.methods.isValidPassword = function(plain:string){
    try{
        return  bcrypt.compare(plain, this.password);
    }
    catch(error){
        throw new Error('Password comparison failed');
    }
}
UserSchema.statics.register = async function ({
  username,
  name,
  password,
}: {
  username: string;
  name: string;
  password: string;
}) {
  const bcrypt = require("bcrypt");
  const saltRounds = 12;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  return this.create({ username, name, password: passwordHash });
};

export interface IUserModel extends Model<IUser> {
  register(args: { email: string; name: string; password: string }): Promise<IUser>;
}

export const User = mongoose.model<IUser, IUserModel>("User", UserSchema);