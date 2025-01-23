import { useCallback, useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import * as ExpoDevice from "expo-device";
import {
  BleError,
  BleManager,
  Characteristic,
  Device,
} from "react-native-ble-plx";
import Muse_Utils from "./Muse_Utils";
import CommandResponse from "./CommandResponse";

const serviceUUID = "c8c0a708-e361-4b5e-a365-98fa6b0a836f";
const characteristicUUID = "09bf2c52-d1d9-c0b7-4145-475964544307";

const bleManager = new BleManager();

function useBLE() {
  const [allDevices, setAllDevices] = useState<Device[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const [color, setColor] = useState<string>("white");

  const requestAndroid31Permissions = async (): Promise<boolean> => {
    const bluetoothScanPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );
    const bluetoothConnectPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );
    const fineLocationPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );

    return (
      bluetoothScanPermission === "granted" &&
      bluetoothConnectPermission === "granted" &&
      fineLocationPermission === "granted"
    );
  };

  const requestPermissions = async (): Promise<boolean> => {
    if (Platform.OS === "android") {
      if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "Bluetooth Low Energy requires Location",
            buttonPositive: "OK",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        return await requestAndroid31Permissions();
      }
    } else {
      return true;
    }
  };

  const connectToDevice = async (device: Device): Promise<void> => {
    try {
      const deviceConnection = await bleManager.connectToDevice(device.id);
      setConnectedDevice(deviceConnection);
      await deviceConnection.discoverAllServicesAndCharacteristics();
      const allServices = await deviceConnection.services();

      bleManager.stopDeviceScan();

      checkBatteryLevel();
      startStreamingData(deviceConnection);
    } catch (e) {
      console.log("FAILED TO CONNECT", e);
    }
  };

  const checkBatteryLevel = (): void => {
    try {
      const batteryLevel = Muse_Utils.Cmd_GetBatteryCharge();
      console.log({ batteryLevel });

      const commandResponse = new CommandResponse(batteryLevel);
      console.log(commandResponse, "command response");

      const batteryCharge = Muse_Utils.Dec_BatteryCharge(commandResponse);
      console.log({ batteryCharge });
    } catch (err) {
      console.log(err);
    }
  };

  const startStreamingData = async (device: Device | null): Promise<void> => {
    if (device) {
      const stream = Muse_Utils.Cmd_StartStream(0x00000001, 0x01);
      console.log("Data from stream: ", stream);

      const dataDecoded = Muse_Utils.ParseCommandCharacteristic(stream, true);
      console.log({ dataDecoded });
    } else {
      console.log("No Device Connected");
    }
  };

  const isDuplicateDevice = (devices: Device[], nextDevice: Device): boolean =>
    devices.findIndex((device) => nextDevice.id === device.id) > -1;

  const scanForPeripherals = useCallback((): void => {
    bleManager.startDeviceScan(null, null, (error: BleError | null, device: Device | null) => {
      if (error) {
        console.log(error, "Scan error");
        return;
      }

      if (device && (device.localName !== null || device.name !== null)) {
        setAllDevices((prevState) => {
          if (!isDuplicateDevice(prevState, device)) {
            return [...prevState, device];
          }
          return prevState;
        });
      }
    });
  }, []);

  return {
    connectToDevice,
    allDevices,
    connectedDevice,
    color,
    requestPermissions,
    scanForPeripherals,
    startStreamingData,
  };
}

export default useBLE;
