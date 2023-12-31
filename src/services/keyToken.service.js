"use strict";

const keyTokenModel = require("../models/keytoken.model");
class KeyTokenSerive {
  static createTokenKey = async ({ userId, publicKey, privateKey }) => {
    try {
      const tokens = await keyTokenModel.create({
        user: userId,
        publicKey,
        privateKey,
      });
      return tokens ? tokens.publicKey : null;
    } catch (e) {
      return e;
    }
  };
}
module.exports = KeyTokenSerive;
