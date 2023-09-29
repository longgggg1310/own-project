"use strict";
const { model, Schema, Types } = require("mongoose");

const DOCUMENT_NAME = "Key";
const COLECTION_NAME = "Keys";

const keyTokenSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "Shop",
    },
    publicKey: {
      type: String,
      require: true,
    },
    privateKey: {
      type: String,
      require: true,
    },
    refreshToken: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
    collection: COLECTION_NAME,
  }
);
module.exports = model(DOCUMENT_NAME, keyTokenSchema);
