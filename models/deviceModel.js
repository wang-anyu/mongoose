const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const deviceSchema = mongoose.Schema(
  {
    deviceId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    protocol: {
      type: String,
      required: true,
    },
    firmware: {
      type: String,
      required: true,
    },
    ipAddress: {
      type: String,
      required: true,
    },
    macAddress: {
      type: String,
      required: true,
    },
    roomId: {
      type: String,
      required: true,
    },
    capabilities: {
      type: [String],
      required: true,
    },
    config: {
      autoShutdown: {
        type: Boolean,
        default: false,
      },
      scheduleEnabled: {
        type: Boolean,
        default: false,
      },
    },
    status: {
      online: {
        type: Boolean,
        default: false,
      },
      power: {
        type: String,
        enum: ['on', 'off'],
        default: 'off',
      },
      brightness: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
      },
      lastUpdate: {
        type: Date,
        default: Date.now,
      },
    },
    created: {
      type: Date,
      default: Date.now,
    },
    modified: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Device", deviceSchema, "Devices");