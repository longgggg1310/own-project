"use strict";

const { model, Schema, Types } = require("mongoose");

const DOCUMENT_NAME = "Shop";
const COLECTION_NAME = "Shops";
const shopSchema = new Schema(
  {
    user: {
      type: String,
      trim: true,
      maxLength: 150,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    verify: {
      type: Schema.Types.Boolean,
      default: false,
    },
    roles: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
    collection: COLECTION_NAME,
  }
);
module.exports = model(DOCUMENT_NAME, shopSchema);
