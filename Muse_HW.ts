/* eslint-disable prettier/prettier */
/* eslint-disable no-bitwise */
namespace Muse_HW {
    export enum Constants {
        READ_BIT_MASK = 128, // 0x80
    }

    export enum GATT {
        SRV_GENERIC_ATTRIBUTE = '0x1801',
        SRV_GENERIC_ACCESS = '0x1800',

        SRV_DEVICE_INFORMATION = '0x180a',
        CHR_MANUFACTURER_NAME = '00002a29-0000-1000-8000-00805f9b34fb',
        CHR_FIRMWARE_REVISION = '00002a26-0000-1000-8000-00805f9b34fb',
        CHR_HARDWARE_REVISION = '00002a27-0000-1000-8000-00805f9b34fb',
        CHR_SERIAL_NUMBER = '00002a25-0000-1000-8000-00805f9b34fb',
        CHR_SYSTEM_ID = '00002a23-0000-1000-8000-00805f9b34fb',

        SRV_CUSTOM_SERVICE = 'c8c0a708-e361-4b5e-a365-98fa6b0a836f',
        CHR_COMMAND = 'd5913036-2d8a-41ee-85b9-4e361aa5c8a7',
        CHR_DATA = '09bf2c52-d1d9-c0b7-4145-475964544307'
    }

    export enum Command {
        CMD_NONE = 255,                     // 0xff
        CMD_ACK = 0,                        // 0x00
        CMD_STATE = 2,                      // 0x02
        CMD_RESTART = 3,                    // 0x03
        CMD_APP_INFO = 4,                   // 0x04
        CMD_BATTERY_CHARGE = 7,             // 0x07
        CMD_BATTERY_VOLTAGE = 8,            // 0x08
        CMD_CHECK_UP = 9,                   // 0x09
        CMD_FW_VERSION = 10,                // 0x0a
        CMD_TIME = 11,                      // 0x0b
        CMD_BLE_NAME = 12,                  // 0x0c
        CMD_DEVICE_ID = 14,                 // 0x0e
        CMD_DEVICE_SKILLS = 15,             // 0x0f
        CMD_MEM_CONTROL = 32,               // 0x20
        CMD_MEM_FILE_INFO = 33,             // 0x21
        CMD_MEM_FILE_DOWNLOAD = 34,         // 0x22
        CMD_MEM_STAT_DOWNLOAD = 35,         // 0x23
        CMD_CLK_OFFSET = 49,                // 0x31
        CMD_TIME_SYNC = 50,                 // 0x32
        CMD_EXIT_TIME_SYNC = 51,            // 0x33
        CMD_SENSORS_FS = 64,                // 0x40
        CMD_CALIB_MATRIX = 72,              // 0x48
        CMD_BTN_LOG = 80,                   // 0x50
        CMD_USER_CFG = 81,                  // 0x51
        CMD_FW_UPLOAD = 5,
    }

    export enum CommandLength {
        /// <summary> Get state command length </summary>
        CMD_LENGTH_GET_STATE = 2,
        /// <summary> Set state command length </summary>
        CMD_LENGTH_SET_STATE = 3,
        /// <summary> Start stream acquisition command length </summary>
        CMD_LENGTH_START_STREAM = 7,
        /// <summary> Start log acquisition command length </summary>
        CMD_LENGTH_START_LOG = 7,
        /// <summary> Stop acquisition command length </summary>
        CMD_LENGTH_STOP_ACQUISITION = 3,
        /// <summary> Restart command length </summary>
        CMD_LENGTH_RESTART = 3,
        /// <summary> Get firmware application info command length </summary>
        CMD_LENGTH_GET_APP_INFO = 2,
        /// <summary> Get battery charge level command length </summary>
        CMD_LENGTH_GET_BATTERY_CHARGE = 2,
        /// <summary> Get battery voltage level command length </summary>
        CMD_LENGTH_GET_BATTERY_VOLTAGE = 2,
        /// <summary> Get check-up register value command length </summary>
        CMD_LENGTH_GET_CHECK_UP = 2,
        /// <summary> Get firmware versions command length </summary>
        CMD_LENGTH_GET_FW_VERSION = 2,
        /// <summary> Get time command length </summary>
        CMD_LENGTH_GET_TIME = 2,
        /// <summary> Set time command length </summary>
        CMD_LENGTH_SET_TIME = 6,
        /// <summary> Get device name command length </summary>
        CMD_LENGTH_GET_BLE_NAME = 2,
        /// <summary> Set device command length </summary>
        CMD_LENGTH_SET_BLE_NAME = 20,
        /// <summary> Get device unique identifier command length </summary>
        CMD_LENGTH_GET_DEVICE_ID = 2,
        /// <summary> Get device skills command length </summary>
        CMD_LENGTH_GET_DEVICE_SKILLS = 3,
        /// <summary> Get memory status command length </summary>
        CMD_LENGTH_GET_MEM_CONTROL = 2,
        /// <summary> Erase memory command length </summary>
        CMD_LENGTH_SET_MEM_CONTROL = 3,
        /// <summary> Get memory file info command length </summary>
        CMD_LENGTH_GET_MEM_FILE_INFO = 4,
        /// <summary> Start file offload command length </summary>
        CMD_LENGTH_GET_MEM_FILE_DOWNLOAD = 5,
        /// <summary> Get clock offset command length </summary>
        CMD_LENGTH_GET_CLK_OFFSET = 2,
        /// <summary> Set clock offset command length </summary>
        CMD_LENGTH_SET_CLK_OFFSET = 10,
        /// <summary> Enter timesync command length </summary>
        CMD_LENGTH_ENTER_TIME_SYNC = 2,
        /// <summary> Exit timesync command length </summary>
        CMD_LENGTH_EXIT_TIME_SYNC = 2,
        /// <summary> Get sensors full scale configuration command length </summary>
        CMD_LENGTH_GET_SENSORS_FS = 2,
        /// <summary> Set sensors full scale configuration command length </summary>
        CMD_LENGTH_SET_SENSORS_FS = 3,
        /// <summary> Get calibration matrix command length </summary>
        CMD_LENGTH_GET_CALIB_MATRIX = 4,
        /// <summary> Set calibration matrix command length </summary>
        CMD_LENGTH_SET_CALIB_MATRIX = 16,
        /// <summary> Get button log configuration command length </summary>
        CMD_LENGTH_GET_BUTTON_LOG = 2,
        /// <summary> Set button log configuration command length </summary>
        CMD_LENGTH_SET_BUTTON_LOG = 6,
        /// <summary> Get user configuration command length </summary>
        CMD_LENGTH_GET_USER_CONFIG = 2,
        /// <summary> Set user configuration command length </summary>
        CMD_LENGTH_SET_USER_CONFIG = 6
    }

    export enum AcknowledgeType {
        /// <summary>NOT AN ACKNOWLEDGE - used only on software side </summary>
        ACK_NONE = 0xff,
        /// <summary>Success</summary>
        ACK_SUCCESS = 0x00,
        /// <summary>Error</summary>
        ACK_ERROR = 0x01
    }

    export enum SystemState {
        /// <summary>System state NONE - used only on software side</summary>
        SYS_NONE = 0x00,
        /// <summary>System state ERROR</summary>
        SYS_ERROR = 0xff,
        /// <summary>System state STARTUP</summary>
        SYS_STARTUP = 0x01,
        /// <summary>System state IDLE</summary>
        SYS_IDLE = 0x02,
        /// <summary>System state STANDBY</summary>
        SYS_STANDBY = 0x03,
        /// <summary>System state LOG - acquisition mode</summary>
        SYS_LOG = 0x04, //used for file acquisition
        /// <summary>System state READOUT - memory file download</summary>
        SYS_READOUT = 0x05,
        /// <summary>System state STREAM - buffered acquisition (realtime)</summary>
        SYS_TX_BUFFERED = 0x06,
        /// <summary>System state CALIB - calibration routines</summary>
        SYS_CALIB = 0x07,
        /// <summary>System state STREAM - direct acquisition (realtime)</summary>
        SYS_TX_DIRECT = 0x08,
        SYS_IDLE_BOOT = 0xF1,
    }

    export enum RestartMode {
        /// <summary>Restart device in application mode</summary>
        RESET = 0x00,
        /// <summary>Restart device in bootloader mode</summary>
        BOOT = 0x01
    }

    export enum CommunicationChannel {
        /// <summary>Channel NONE - used only on software side</summary>
        CHANNEL_NONE = 0x00,
        /// <summary>Bluetoot Low Energy</summary>
        CHANNEL_BLE = 0x01,
        /// <summary>USB</summary>
        CHANNEL_USB = 0x02
    }

    export enum DataMode {
        /// <summary>Acquisition mode NONE - used only on software side</summary>
        DATA_MODE_NONE = 0x00000000,
        /// <summary>Acquisition mode Gyroscope</summary>
        DATA_MODE_GYRO = 0x00000001,
        /// <summary>Acquisition mode Accelerometer</summary>
        DATA_MODE_AXL = 0x00000002,
        /// <summary>Acquisition mode IMU: Gyroscope + Accelerometer</summary>
        DATA_MODE_IMU = DATA_MODE_AXL | DATA_MODE_GYRO,
        /// <summary>Acquisition mode Magnetometer</summary>
        DATA_MODE_MAGN = 0x00000004,
        /// <summary>Acquisition mode 9DOF: Gyroscope + Accelerometer + Magnetometer</summary>
        DATA_MODE_9DOF = DATA_MODE_MAGN | DATA_MODE_IMU,
        /// <summary>Acquisition mode High Dynamic Range (HDR) Accelerometer</summary>
        DATA_MODE_HDR = 0x00000008,
        /// <summary>Acquisition mode IMU + HDR</summary>
        DATA_MODE_IMU_HDR = DATA_MODE_IMU | DATA_MODE_HDR,
        /// <summary>Acquisition mode orientation quaternion</summary>
        DATA_MODE_ORIENTATION = 0x00000010,
        /// <summary>Acquisition mode IMU + orientation quaternion</summary>
        DATA_MODE_IMU_ORIENTATION = DATA_MODE_ORIENTATION | DATA_MODE_IMU,
        /// <summary>Acquisition mode 9DOF + orientation quaternion</summary>
        DATA_MODE_9DOF_ORIENTATION = DATA_MODE_9DOF | DATA_MODE_ORIENTATION,
        /// <summary>Acquisition mode timestamp</summary>
        DATA_MODE_TIMESTAMP = 0x00000020,
        /// <summary>Acquisition mode temperature and humidity</summary>
        DATA_MODE_TEMP_HUM = 0x00000040,
        /// <summary>Acquisition mode temperature and barometric pressure</summary>
        DATA_MODE_TEMP_PRESS = 0x00000080,
        /// <summary>Acquisition mode range and light intensity</summary>
        DATA_MODE_RANGE = 0x00000100,
        /// <summary>Acquisition mode microphone</summary>
        DATA_MODE_SOUND = 0x00000400
    }

    export enum DataSize {
        /// <summary>Packet size Gyroscope</summary>
        DATA_SIZE_GYRO = 6,
        /// <summary>Packet size Accelerometer</summary>
        DATA_SIZE_AXL = 6,
        /// <summary>Packet size IMU: Gyroscope + Accelerometer</summary>
        DATA_SIZE_IMU = DATA_SIZE_AXL + DATA_SIZE_GYRO,
        /// <summary>Packet size Magnetometer</summary>
        DATA_SIZE_MAGN = 6,
        /// <summary>Packet size 9DOF: Gyroscope + Accelerometer + Magnetometer</summary>
        DATA_SIZE_9DOF = DATA_SIZE_MAGN | DATA_SIZE_IMU,
        /// <summary>Packet size High Dynamic Range (HDR) Accelerometer</summary>
        DATA_SIZE_HDR = 6,
        /// <summary>Packet size IMU + HDR</summary>
        DATA_SIZE_IMU_HDR = DATA_SIZE_IMU | DATA_SIZE_HDR,
        /// <summary>Packet size orientation quaternion</summary>
        DATA_SIZE_ORIENTATION = 6,
        /// <summary>Packet size IMU + orientation quaternion</summary>
        DATA_SIZE_IMU_ORIENTATION = DATA_SIZE_ORIENTATION | DATA_SIZE_IMU,
        /// <summary>Packet size 9DOF + orientation quaternion</summary>
        DATA_SIZE_9DOF_ORIENTATION = DATA_SIZE_9DOF | DATA_SIZE_ORIENTATION,
        /// <summary>Packet size timestamp</summary>
        DATA_SIZE_TIMESTAMP = 6,
        /// <summary>Packet size temperature and humidity</summary>
        DATA_SIZE_TEMP_HUM = 6,
        /// <summary>Packet size temperature and barometric pressure</summary>
        DATA_SIZE_TEMP_PRESS = 6,
        /// <summary>Packet size luminosity</summary>
        DATA_SIZE_RANGE = 6,
        /// <summary>Packet size microphone</summary>
        DATA_SIZE_SOUND = 6
    }

    export enum DataFrequency {
        /// <summary>Acquisition Frequency NONE - used only on software side</summary>
        DATA_FREQ_NONE = 0x00,
        /// <summary>Acquisition frequency 25 Hz</summary>
        DATA_FREQ_25Hz = 0x01,
        /// <summary>Acquisition frequency 50 Hz</summary>
        DATA_FREQ_50Hz = 0x02,
        /// <summary>Acquisition frequency 100 Hz</summary>
        DATA_FREQ_100Hz = 0x04,
        /// <summary>Acquisition frequency 200 Hz</summary>
        DATA_FREQ_200Hz = 0x08,
        /// <summary>Acquisition frequency 400 Hz</summary>
        DATA_FREQ_400Hz = 0x10,
        /// <summary>Acquisition frequency 800 Hz</summary>
        DATA_FREQ_800Hz = 0x20,
        /// <summary>Acquisition frequency 1600 Hz</summary>
        DATA_FREQ_1600Hz = 0x40
    }

    export enum HardwareSkills {
        /// <summary>Hardware feature NONE - used only on software side</summary>
        SKILLS_HW_NONE = 0x0000,
        /// <summary>Gyroscope</summary>
        SKILLS_HW_GYRO = 0x0001,
        /// <summary>Accelerometer</summary>
        SKILLS_HW_AXL = 0x0002,
        /// <summary>Magnetometer</summary>
        SKILLS_HW_MAGN = 0x0004,
        /// <summary>High Dynamic Range (HDR) Accelerometer</summary>
        SKILLS_HW_HDR = 0x0008,
        /// <summary>Temperature</summary>
        SKILLS_HW_TEMP = 0x0010,
        /// <summary>Relative Humidity</summary>
        SKILLS_HW_RH = 0x0020,
        /// <summary>Barometric Pressure</summary>
        SKILLS_HW_BAR = 0x0040,
        /// <summary>Light intensity (i.e., visible)</summary>
        SKILLS_HW_LUM_VIS = 0x0080,
        /// <summary>Light intensity (i.e., infrared)</summary>
        SKILLS_HW_LUM_IR = 0x0100,
        /// <summary>Distance / Range</summary>
        SKILLS_HW_RANGE = 0x0200,
        /// <summary>Microphone</summary>
        SKILLS_HW_MIC = 0x0400
    }

    export enum MEMS_ID {
        /// <summary>Gyroscope</summary>
        SENSORS_GYRO = 0x01,
        /// <summary>Accelerometer</summary>
        SENSORS_AXL = 0x02,
        /// <summary>High Dynamic Range (HDR) Accelerometer</summary>
        SENSORS_HDR = 0x04,
        /// <summary>Magnetometer</summary>
        SENSORS_MAGN = 0x08
    }

    export enum GyroscopeFS {
        /// <summary>245 dps</summary>
        GYR_FS_245dps = 0x00,
        /// <summary>500 dps</summary>
        GYR_FS_500dps = 0x01,
        /// <summary>1000 dps</summary>
        GYR_FS_1000dps = 0x02,
        /// <summary>2000 dps</summary>
        GYR_FS_2000dps = 0x03
    }

    /// <summary>Gyroscope configurations dictionary (i.e., full scale and sensitivity coefficient)</summary>
    export const Gyroscope_CFG = new Map();
    Gyroscope_CFG.set(0xff, {key: 0xff, full_scale: 0, sensitivity: 1});
    Gyroscope_CFG.set(0x00, {key: 0x00, full_scale: 245, sensitivity: 0.00875});
    Gyroscope_CFG.set(0x01, {key: 0x01, full_scale: 500, sensitivity: 0.0175});
    Gyroscope_CFG.set(0x02, {key: 0x02, full_scale: 1000, sensitivity: 0.035});
    Gyroscope_CFG.set(0x03, {key: 0x03, full_scale: 2000, sensitivity: 0.070});

    export enum AccelerometerFS {
        /// <summary>4 g</summary>
        AXL_FS_4g = 0x00,
        /// <summary>8 g</summary>
        AXL_FS_08g = 0x08,
        /// <summary>16 g</summary>
        AXL_FS_16g = 0x0c,
        /// <summary>32 g</summary>
        AXL_FS_32g = 0x04
    }

    /// <summary>Accelerometer configurations dictionary (i.e., full scale and sensitivity coefficient)</summary>
    export const Accelerometer_CFG = new Map();
    Accelerometer_CFG.set(0xff, {key: 0xff, full_scale: 0, sensitivity: 1});
    Accelerometer_CFG.set(0x00, {key: 0x00, full_scale:4, sensitivity: 0.122});
    Accelerometer_CFG.set(0x08, {key: 0x08, full_scale:8, sensitivity: 0.244});
    Accelerometer_CFG.set(0x0c, {key: 0x0c, full_scale:16, sensitivity: 0.488});
    Accelerometer_CFG.set(0x04, {key: 0x04, full_scale:32, sensitivity: 0.976});

    export enum MagnetometerFS {
        /// <summary>4 Gauss</summary>
        MAG_FS_04G = 0x00,
        /// <summary>8 Gauss</summary>
        MAG_FS_08G = 0x40,
        /// <summary>12 Gauss</summary>
        MAG_FS_12G = 0x80,
        /// <summary>16 Gauss</summary>
        MAG_FS_16G = 0xc0
    }

    /// <summary>Magnetometer configurations dictionary (i.e., full scale and sensitivity coefficient)</summary>
    export const Magnetometer_CFG = new Map();
    Magnetometer_CFG.set(0xff, {key: 0xff, full_scale: 0, sensitivity: 1});
    Magnetometer_CFG.set(0x00, {key: 0x00, full_scale:4, sensitivity: 1000.0 / 6842.0});
    Magnetometer_CFG.set(0x40, {key: 0x40, full_scale:8, sensitivity: 1000.0 / 3421.0});
    Magnetometer_CFG.set(0x80, {key: 0x80, full_scale:12, sensitivity: 1000.0 / 2281.0});
    Magnetometer_CFG.set(0xc0, {key: 0xc0, full_scale:16, sensitivity: 1000.0 / 1711.0});

    export enum AccelerometerHDRFS {
        /// <summary>100 g</summary>
        HDR_FS_100g = 0x00,
        /// <summary>200 g</summary>
        HDR_FS_200g = 0x10,
        /// <summary>400 g</summary>
        HDR_FS_400g = 0x30
    }

    /// <summary>High Dynamic Range (HDR) Accelerometer configurations dictionary (i.e., full scale and sensitivity coefficient)</summary>
    export const AccelerometerHDR_CFG = new Map();
    AccelerometerHDR_CFG.set(0xff, {key: 0xff, full_scale: 0, sensitivity: 1});
    AccelerometerHDR_CFG.set(0x00, {key: 0x00, full_scale:100, sensitivity: 49.0});
    AccelerometerHDR_CFG.set(0x10, {key: 0x10, full_scale:200, sensitivity: 98.0});
    AccelerometerHDR_CFG.set(0x30, {key: 0x30, full_scale:400, sensitivity: 195.0});

    export enum UserConfigMask {
        /// <summary>NONE - used only on software side</summary>
        USER_CFG_MASK_NONE = 0x0000,
        /// <summary>Extracts STANDBY configuration channel</summary>
        USER_CFG_MASK_STANDBY = 0x0001,
        /// <summary>Extracts CIRCULAR MEMORY configuration channel</summary>
        USER_CFG_MASK_CIRCULAR_MEMORY = 0x0002,
        /// <summary>Extracts USB STREAM configuration channel</summary>
        USER_CFG_MASK_USB_STREAM = 0x0004
    }

    export enum CalibrationType {
        /// <summary>Accelerometer</summary>
        CALIB_TYPE_AXL = 0,
        /// <summary>Gyroscope</summary>
        CALIB_TYPE_GYR = 1,
        /// <summary>Magnetometer</summary>
        CALIB_TYPE_MAG = 2
    }
}
export default Muse_HW;
