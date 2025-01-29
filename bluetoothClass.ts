import { NativeEventEmitter, NativeModules } from "react-native";
import BleManager from "react-native-ble-manager"


const serviceUUID = "c8c0a708-e361-4b5e-a365-98fa6b0a836f"
const periferalId = "00:80:E1:26:29:A8"
const characteristicUUID = "d5913036-2d8a-41ee-85b9-4e361aa5c8a7"
const characteristicUUIDData = "09bf2c52-d1d9-c0b7-4145-475964544307"

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export class BluetoothManager {

    static scanDevice = () => {

        try {

            BleManager.scan([], 10, true).then(() => {
                console.log("Scan started");
            }).catch((err) => {
                console.log(err)
            })


        } catch (error) {
            console.log(error)
        }
    }

    static connectToDevice = (id:string) => {
        try {

            BleManager.connect(id)
                .then(() => {
                    // Success code
                    console.log("Connected");
                })
                .catch((error) => {
                    // Failure code
                    console.log(error);
                });

        } catch (error) {
            console.log(error)
        }
    }

    static retrieveServices = (id:string) => {
        try {
        BleManager.retrieveServices(id).then(
                (peripheralInfo) => {
                    // Success code
                    // console.log({peripheralInfo})
                   
                }
            ).catch((err) => {
                console.log(err)
            })

        } catch (error) {
            console.log(error)
        }
    }


    static enableNotification = (id:string) => {
        try {
            BleManager.startNotification(
                id, serviceUUID, characteristicUUID
            )
                .then(() => {
                    // Success code
                    console.log("Notification started");

                })
                .catch((error) => {
                    // Failure code
                    console.log({ error });
                });
        } catch (error) {
            console.log(error)
        }
    }

    static writeToDevice = (id:string,data:any) => {
        // console.log(data,'inside write')
        // console.log(Array.isArray(data),"-checkisarray")
        try {

            BleManager.write(
                id,
                serviceUUID,
                characteristicUUID,
                data,
            )
                .then((res) => {
                    // Success code
                    // console.log("Write: ", res);
                })
                .catch((error) => {
                    // Failure code
                    console.log("write to device error",error);
                });

        } catch (error) {
            console.log("write to device error 1",error)
        }
    }

    static readFromDevice = (id:string) => {
        try {

          return  BleManager.read(
                id,
                serviceUUID,
                characteristicUUID, 
            )
                .then((res) => {
                    // Success code
                    // console.log("read ", res);
                    return res
                })
                .catch((error) => {
                    // Failure code
                    console.log("read to device error",error);
                });

        } catch (error) {
            console.log("read to device error 1",error)
        }
    }
}