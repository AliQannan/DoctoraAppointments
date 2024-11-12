import jwt from "jsonwebtoken";
// user authentication middleware;

const authUser = async (req, res, next) => {
  try {
   
    const { token } = req.headers;

 
    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }
    const token_decode = jwt.verify(token, "aliqannan");
   req.body.userId = token_decode.id

   next();
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
export default authUser;
