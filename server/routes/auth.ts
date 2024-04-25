import express from "express";
import z from "zod";
import { User } from "../db/user.model";
import { hashSync, compareSync } from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();
const SECRET = process.env.JWT_SECRET;

const signUpInput = z.object({
  username: z.string().email(),
  password: z.string().min(6),
});

type signupInfo = z.infer<typeof signUpInput>;

router.get("/test", (req, res) => {
  res.json({
    message: "hi there",
  });
});

router.post("/signup", async (req, res) => {

  const { success } = signUpInput.safeParse(req.body);

  if (!success) {
    return res.status(403).json({
      message: "enter a valid input",
    });
  }

  const { username, password }: signupInfo = req.body;

  const hashedPassword = hashSync(password, 10);

  try {
    const user = await User.findOne({ username });
    if (user) {
      res.status(403).json({ message: "User already exists" });
    } else {
      const newUser = new User({
        username,
        password: hashedPassword,
      });

      await newUser.save();

      res.json({ message: 'User created successfully' });
    }
  } catch (error) {
    console.log(error);
    
  }
});

router.post('/signin', async(req, res) => {

  const {success} = signUpInput.safeParse(req.body);

  if (!success) {
    res.status(403).json({
      message: "enter a valid input",
    });
  }
  const { username, password }: signupInfo = req.body;
  try{

    const validUser  = await User.findOne({username});

    if (!validUser) {
      return res.status(403).json({ message: "invalid username or password" });
    }
    const user: signupInfo = validUser as signupInfo;
    const validPassword = compareSync(password,user.password)
    if (!validPassword) {
      return res.status(403).json({ message: "invalid username or password" });
    }
    const token = jwt.sign({id : validUser._id}, SECRET || '', {expiresIn : '1h'});
    res.status(200).json({ message: 'Logged in successfully', token, username });
  }catch(error){
    console.log(error);
    
  }
})
export default router;
