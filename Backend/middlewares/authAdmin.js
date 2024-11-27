import jwt from "jsonwebtoken";
// user authentication middleware;

const authAdmin = async (req, res, next) => {
  try {
   
    const { atoken } = req.headers;

 
    if (!atoken) {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }
    const token_decode = jwt.verify(atoken, "aliqannan");
   req.body.userId = token_decode.id

   next();
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
export default authAdmin;
