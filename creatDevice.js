const Device = require('./models/deviceModel');
const connectDb = require('./dbConnection');

const createDevice = async () => {
  const newDevice = new Device({
    deviceId: "dev_005",
    name: "Ambient light",
    brand: "xiaomi",
    model: "yeelight-v2",
    type: "light",
    protocol: "wifi",
    firmware: "1.2.3",
    ipAddress: "192.168.1.100",
    macAddress: "AA:BB:CC:DD:EE:FF",
    roomId: "room_001",
    capabilities: ["power", "brightness", "color", "temperature"],
    config: {
      autoShutdown: true,
      scheduleEnabled: true,
    },
    status: {
      online: true,
      power: "on",
      brightness: 80,
      lastUpdate: "2025-02-24T10:00:00Z",
    },
  });

  try {
    await newDevice.save();
    console.log("Device created successfully!");
  } catch (error) {
    console.error("Error creating device:", error);
  }
};

const run = async () => {
    await connectDb(); 
    await createDevice(); 
  };

run();