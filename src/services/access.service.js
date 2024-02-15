"use strict";

const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenSerive = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUtils");
const { getInfoData } = require("../utils");
const { BadRequestError } = require("../core/error.response");
const RoleShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
};
class AccessService {
  static signUp = async ({ name, email, password }) => {
    try {
      const checkExist = await shopModel.findOne({ email }).lean();
      if (checkExist) {
        throw new BadRequestError("Error: Shop already registered")
      }
      const passwordHash = await bcrypt.hash(password, 10);
      const newShop = await shopModel.create({
        name,
        email,
        password: passwordHash,
        role: [RoleShop.SHOP],
      });

      if (newShop) {
        // const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
        //   modulusLength: 4096,
        //   publicKeyEncoding: {
        //     type: "pkcs1",
        //     format: "pem",
        //   },
        //   privateKeyEncoding: {
        //     type: "pkcs1",
        //     format: "pem",
        //   },
        // });
        const privateKey = crypto.randomBytes(64).toString("hex");

        const publicKey = crypto.randomBytes(64).toString("hex");

        const keyStore = await KeyTokenSerive.createTokenKey({
          userId: newShop._id,
          publicKey,
          privateKey,
        });
        if (!keyStore) {
          return {
            code: "xxx",
            message: "publicKeyString error",
          };
        }
        // const publicKeyObject = crypto.createPublicKey(publicKeyString);
        const token = await createTokenPair(
          { userId: newShop._id, email },
          publicKey,
          privateKey
        );

        return {
          code: 201,
          metadata: {
            shop: getInfoData({
              fields: ["_id", "name", "email"],
              object: newShop,
            }),
            token,
          },
        };
      }

      return {
        code: 201,
        metadata: null,
      };
    } catch (e) {
      return {
        code: "xxx",
        message: e.message,
        status: "error",
      };
    }
  };
}
module.exports = AccessService;
