import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../Models/user.model.js';


const JWT_SECRET = process.env.JWT_SECRET

export const handleRegistration = async (req, res) => {
    try{
      const salt = await bcrypt.genSalt()

      const {email, name, password} = req.body
      
      const hashed_password = await bcrypt.hash(password, salt)

      const user = new User({email, name, password:hashed_password})
      await user.save();

      res.status(201).json({status: "success", code: 201, message: "User registered successfully"});

    }catch (errors){
      console.error('Registration error:', errors);

      res.status(500).json({
        status: "failed", 
        code:500, 
        message:"Internal server error", 
        error:errors.message || "An unexpected error occurred"
      });
    }
}

export const handleLogin = async (req, res) => {
  try{
    const {name, password} = req.body
    const user = await User.findOne({name})

    if (!user) {
      return res.status(400).json({status:"Bad request", code:404, message:"User not found"})
    }

    const isMatch = await bcrypt.compare(password, user.password)
    

    if(!isMatch){
      return res.status(401).json({status:"Invalid credentials", code:401, message:"You submitted wrong password", wrongPassword:true})
    }else{
      const token = jwt.sign({id: user._id, name:user.name}, JWT_SECRET, {expiresIn: '1h'})

      return res.status(201).json({token:token, name:user.name, message:"Login complete"});
    }


    

  }catch (err){
    res.status(500).json({ message: 'Server error', err });
  }
}

export const InputFieldChecking = async (req, res) =>{
  try {
    const user = req.body

    const isAvailable = await User.findOne({$or: [{ email:user.email }, { name:user.name }]})

    
    if (isAvailable) {
      return res.status(200).json({ available: false, isAvailable}); // 
} else {
      return res.status(200).json({ available: true, message:"Email is available (not taken)"});
}

  } catch (error) {
    res.status(500).json({ status:"failed", code:500, message: 'Server error', Error:error });
  }
}