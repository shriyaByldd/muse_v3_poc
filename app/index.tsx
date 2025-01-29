import React, { useCallback, useEffect, useState } from "react";
import {
  NativeEventEmitter,
  NativeModules,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DeviceModal from "../DeviceConnectionModal";
import useBLE from "../useBle";
import usenewBle from "@/usenewBle";

import BleManager from "react-native-ble-manager"

interface DeviceType {
  id: string;
  name: string;
  // Add other properties as needed
}
const SECONDS_TO_SCAN_FOR = 3;
const SERVICE_UUIDS: string[] = [];
const ALLOW_DUPLICATES = true;
const App: React.FC = () => {
  const {
    // allDevices,
    connectedDevice,
    connectToDevice,
    color,
    requestPermissions,
    scanForPeripherals,
  } = usenewBle();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
   const [allDevices, setAllDevices] = useState<DeviceType[]>([]);


  useEffect(() => {
    try {
      BleManager.start({ showAlert: false })
        .then(() => {

          scanForDevices()
          console.debug('BleManager started.')
        }
      )
        .catch((error: any) =>
          console.error('BeManager could not be started.', error)
        );
    } catch (error) {
      console.error('unexpected error starting BleManager.', error);
      return;
    }
   
   
    const listeners: any[] = [
      BleManager.onDiscoverPeripheral(handleDiscoverPeripheral),
    ];
  }, [])

  interface Peripheral {
    connected?: boolean;
    connecting?: boolean;
  }


  // const [devices, setDevices] = useState([]);
  const [isScanning,setIsScanning] = useState(false)
  const [peripherals, setPeripherals] = useState(
    new Map<Peripheral[], Peripheral>()
  );


  const handleDiscoverPeripheral = (peripheral: any) => {
    // console.debug('[handleDiscoverPeripheral] new BLE peripheral=', peripheral);
    const {name} =peripheral

    console.log(name)
    if(name){
       setAllDevices(peripheral)
    }

    // if (!peripheral.name) {
    //   peripheral.name = 'NO NAME';
    // }
    // setPeripherals((map) => {
    //   // return new Map(map.set(peripheral.id, peripheral));
    // });
  };
  


  const scanForDevices = (async () => {
    console.log("asking for permission");
    const isPermissionsEnabled = await requestPermissions();
    if (isPermissionsEnabled) {
      console.log({ isPermissionsEnabled });

      // BleManager.start({ showAlert: false }).then(() => {
      //   console.log("Module initialized");
      //   // setIsScanning(true)
      //   // scanForPeripherals(isScanning,setPeripherals,setIsScanning)
        
      //   // setIsScanning(false)
      // }).catch((err) => {
      //   console.log(err)
      // })

      // scanForPeripherals(isScanning,setPeripherals,setIsScanning)
    }
  });

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const openModal = useCallback(async () => {
    scanForPeripherals()
    setIsModalVisible(true)

  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: color || "#f2f2f2" }]}>
      <View style={styles.heartRateTitleWrapper}>
        {connectedDevice ? (
          <Text style={styles.heartRateTitleText}>Start Data Transfer</Text>
        ) : (
          <Text style={styles.heartRateTitleText}>No Device Connected</Text>
        )}
      </View>
      <TouchableOpacity onPress={openModal} style={styles.ctaButton}>
        <Text style={styles.ctaButtonText}>Start</Text>
      </TouchableOpacity>
      <DeviceModal
        closeModal={hideModal}
        visible={isModalVisible}
        connectToPeripheral={connectToDevice}
        devices={allDevices || []}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  heartRateTitleWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heartRateTitleText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 20,
    color: "black",
  },
  ctaButton: {
    backgroundColor: "#FF6060",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginHorizontal: 20,
    marginBottom: 5,
    borderRadius: 8,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default App;
