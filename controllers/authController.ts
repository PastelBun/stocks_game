import {Request, Response} from "express";
import {User} from '../models/user';
const RegisterPage = (_req: Request, res: Response) => res.render("auth/register");
const LoginPage = (_req: Request, res: Response) => res.render("auth/login");
const register = async (req: Request, res:Response)=>{
    try{
        const {username, name, password} =req.body;
        console.log(req.body);
        if(!username || !name || !password){
            return res.status(400).render("auth/register",{error:"All fields required."});

        }
        const user = await (User as any).register({username,name,password});
        (req.session as any).user = {id:user._id.toString(),username: user.username,name:user.name};
        res.redirect("/");
    }catch(err:any){
        const message = err.code === 11000 ? "Username already in use. ": "Registration failed.";
        res.status(400).render("auth/register",{error:message});
    }  
};
const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // NOTE: select +password so the hash is available
  const user = await User.findOne({ username }).select("+password");

  if (!user || !(await user.isValidPassword(password))) {
    return res.status(401).render("auth/login", { error: "Invalid credentials." });
  }

  (req.session as any).user = {
    username: user.username,
    name: user.name,
  };

  res.redirect("/");
};
const logout = (req: Request, res: Response) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};

export default { RegisterPage, LoginPage, register, login, logout };