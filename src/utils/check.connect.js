"use strict";

const mongoose = require("mongoose");
const os = require("os");
const process = require("process");
const _SECONDS = 5000;
// count connect
const countConnect = () => {
  const numConnections = mongoose.connections.length;
  console.log(`Connections: ${numConnections}`);
};

// check overload
const checkOverload = () => {
  setInterval(() => {
    const numConnections = mongoose.connections.length;
    const numCores = os.cpus().length;
    const memoryUse = process.memoryUsage().rss;
    const maxConnections = numCores * 5;
    if (numConnections > maxConnections) {
      console.log(`Connection overloaded `);
    }
  }, _SECONDS);
};

module.exports = {
  countConnect,
  checkOverload,
};
