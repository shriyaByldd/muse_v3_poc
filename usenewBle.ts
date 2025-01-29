import { useCallback, useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import * as ExpoDevice from "expo-device";
import {
    BleError,
    //   BleManager,
    Characteristic,
    Device,
} from "react-native-ble-plx";
import Muse_Utils from "./Muse_Utils";
import CommandResponse from "./CommandResponse";
import { Buffer } from 'react-native-buffer';

import { BleClient, numbersToDataView, numberToUUID, BluetoothLe } from '@capacitor-community/bluetooth-le';

import BleManager, {
    Peripheral,
    PeripheralInfo,
} from "react-native-ble-manager"
import { BluetoothManager } from "./bluetoothClass";
import Muse_HW from "./Muse_HW";

const periferalId = "00:80:E1:26:29:A8"

function usenewBle() {
   
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



    const scanForPeripherals = async () => {

       
        const scan = BluetoothManager.scanDevice()   
    }

    const connectToDevice = async (id:string) => {
     try {
        
        const connect = BluetoothManager.connectToDevice(id)

        const retrieveServices =  BluetoothManager.retrieveServices(id)

        const enableNotification = BluetoothManager.enableNotification(id)

        const batteryLevel = Muse_Utils.Cmd_GetBatteryCharge();

        console.log({batteryLevel})

        const writeToDevice = BluetoothManager.writeToDevice(id,batteryLevel)

        const readFromDevice = await BluetoothManager.readFromDevice(id)

        // console.log({readFromDevice})

        const commandResponse = new CommandResponse(readFromDevice);
        console.log("Battery response from device",commandResponse);
  
        const batteryCharge = Muse_Utils.Dec_BatteryCharge(commandResponse);
        console.log({ "batteryCharge":`${batteryCharge}%` });

        // const stream = Muse_Utils.Cmd_StartStream( Muse_HW.DataMode.DATA_MODE_GYRO,
        //      Muse_HW.DataFrequency.DATA_FREQ_25Hz,);

            //  const dataDecoded = Muse_Utils.ParseCommandCharacteristic(stream, true);
            //  console.log({ "dataDecoded": dataDecoded.payload});

        // console.log(stream)

        // const streamedData = BluetoothManager.writeToDevice(id,stream)

        // const readStream = await BluetoothManager.readFromDevice(id)

        //   const dataDecoded = Muse_Utils.ParseCommandCharacteristic(readStream, true);
        //      console.log({ "dataDecoded": dataDecoded});
     }catch(err){
        console.log(err)
     }

    }

   

    return {
        connectToDevice,
        // allDevices,
        connectedDevice,
        color,
        requestPermissions,
        scanForPeripherals,
        // startStreamingData,
    };
}

// const write = () => {

//     const batteryLevel = Muse_Utils.Cmd_GetBatteryCharge();
//     console.log({ batteryLevel });


// write()













// BleManager.startNotification(
//     periferalId, serviceUUID, characteristicUUID
// )
//     .then(() => {
//         // Success code
//         console.log("Notification started");

//         const batteryLevel = Muse_Utils.Cmd_GetBatteryCharge();
//         console.log({ batteryLevel });

//         //     const data= await BleManagerr.write(
//         //         periferalId,
//         //         serviceUUID,
//         //         characteristicUUID,
//         //         [135, 0],
//         //       )
//         //         .then((res) => {
//         //           // Success code
//         //           console.log("Write: ",res );
//         //         })
//         //         .catch((error) => {
//         //           // Failure code
//         //           console.log(error);
//         //         });

//         //    console.log("data from device",data)

//     })
//     .catch((error) => {
//         // Failure code
//         console.log({ error });
//     });

export default usenewBle;
