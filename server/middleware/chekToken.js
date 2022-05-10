const jwt = require("jsonwebtoken");
const Token = require("../models/tokens");
const { accessKey, refreshKey } = require("../config");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../service/tokens");

module.exports = async (req, res, next) => {
  if (req.method === "OPTIONS") next();
  const accessToken = req.headers.authorization?.split(" ")[1];
  if (!accessToken) return res.status(403).json("user is not authorized");
  try {
    const decodedData = jwt.verify(accessToken, accessKey);
    req.user = decodedData;
    next();
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {

      const refreshTokenFromCookies = req.cookies.refreshTokenData;
      const RefreshTokenData = await Token.findOne({
        refreshToken: refreshTokenFromCookies,
      });
      const decodedRefreshTokenData = jwt.verify(
        refreshTokenFromCookies,
        refreshKey
      );
      const payload = [
        decodedRefreshTokenData.username,
        decodedRefreshTokenData.id,
      ];
      const accessNewToken = generateAccessToken(...payload);
      const refreshNewToken = generateRefreshToken(...payload);
      RefreshTokenData.refreshToken = refreshNewToken;
      RefreshTokenData.save();
      req.cookie = refreshNewToken;
      req.accessToken = accessNewToken;
      req.user = { username: payload[0], id: [payload[1]] };

      next();
    } else {
      return res.status(403).json("authorization error here");
    }
  }
};
