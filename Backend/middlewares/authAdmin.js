import jwt from "jsonwebtoken";
// admin authentication middleware;

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
    if (token_decode !== "admin@prescripto.com" + "P@ssw0rd1ali") {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }
    next();
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
export default authAdmin;
