import React, { useCallback, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DeviceModal from "../DeviceConnectionModal";
import useBLE from "../useBle";

interface DeviceType {
  id: string;
  name: string;
  // Add other properties as needed
}

const App: React.FC = () => {
  const {
    allDevices,
    connectedDevice,
    connectToDevice,
    color,
    requestPermissions,
    scanForPeripherals,
  } = useBLE();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const scanForDevices = useCallback(async () => {
    console.log("check scanning");
    const isPermissionsEnabled = await requestPermissions();
    if (isPermissionsEnabled) {
      console.log({ isPermissionsEnabled });
      scanForPeripherals();
    }
  }, [requestPermissions, scanForPeripherals]);

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const openModal = useCallback(async () => {
    scanForDevices();
    setIsModalVisible(true);
  }, [scanForDevices]);

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
        devices={allDevices || []} // Ensure devices have a fallback
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
