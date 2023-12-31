"use strict";
const JWT = require("jsonwebtoken");
const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    const accessToken = await JWT.sign(payload, publicKey, {
      expiresIn: "2 days",
    });
    const refreshToken = await JWT.sign(payload, privateKey, {
      expiresIn: "7 days",
    });
    JWT.verify(accessToken, publicKey, (err, decoded) => {
      if (err) {
        console.log(`error verifying`, err);
      } else {
        console.log(`decoded verifying`, decoded);
      }
    });
    return { accessToken, refreshToken };
  } catch (err) {}
};
module.exports = { createTokenPair };
