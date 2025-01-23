/* eslint-disable prettier/prettier */
/* eslint-disable no-bitwise */
import CommandResponse from './CommandResponse';
import Muse_HW from './Muse_HW';

export function numbersToDataView(value: number[]): DataView {
  return new DataView(Uint8Array.from(value).buffer);
}

export type SensorConfigType = {
  key: number;
  full_scale: number;
  sensitivity: number;
};

class Muse_Utils {
  //// USB WRAPPER FUNCTIONS
  static WrapMessage(buffer: Uint8Array) {
    var wrapped_buffer = null;
    if (buffer != null) {
      // Define wrapped message buffer and initialize with header characters
      wrapped_buffer = [
        Buffer.from('?').readUInt8(0),
        Buffer.from('!').readUInt8(0),
      ];

      // Copy main content
      wrapped_buffer.concat(Array.from(buffer));

      // Add trailer to input buffer
      wrapped_buffer.concat([
        Buffer.from('!').readUInt8(0),
        Buffer.from('?').readUInt8(0),
      ]);
    }
    return wrapped_buffer;
  }

  static ExtractMessage(buffer: Uint8Array) {
    // Remove header and trailer from input buffer
    var dewrapped_buffer = null;
    if (buffer != null) {
      dewrapped_buffer = buffer.slice(2, buffer.length - 2); // idx 2 included, buffer.length-2 excluded
    }

    return dewrapped_buffer;
  }

  //// ENCODING COMMANDS

  static Cmd_GetSystemState() {
    var buffer = new Uint8Array(2);
    buffer[0] = Muse_HW.Command.CMD_STATE + Muse_HW.Constants.READ_BIT_MASK;

    // Wrap message with header and trailer in the case of USB communication
    // if (channel == CommunicationChannel.CHANNEL_USB)
    // return WrapMessage(buffer);

    return Array.from(buffer);
  }

  static Cmd_StartStream(
    mode: Muse_HW.DataMode,
    frequency: Muse_HW.DataFrequency,
    enableDirect = false
  ): Uint8Array {
    // Definition of message buffer
    const buffer = new Uint8Array(Muse_HW.CommandLength.CMD_LENGTH_START_STREAM);
  
    // Start stream acquisition using set state command
    buffer[0] = Muse_HW.Command.CMD_STATE;
  
    // Set payload length
    buffer[1] = Muse_HW.CommandLength.CMD_LENGTH_START_STREAM - 2;
  
    // Set tx type based on boolean flag value
    buffer[2] = enableDirect
      ? Muse_HW.SystemState.SYS_TX_DIRECT
      : Muse_HW.SystemState.SYS_TX_BUFFERED;
  
    // Set acquisition mode
    buffer[3] = mode;
    buffer[4] = 0;
    buffer[5] = 0;
  
    // Set acquisition frequency
    buffer[6] = frequency;
  
    // Wrap message with header and trailer in the case of USB communication
    // Uncomment and implement if needed
    // if (channel == CommunicationChannel.CHANNEL_USB)
    //     return WrapMessage(buffer);
  
    return buffer; // Return the Uint8Array directly
  }
  
  static Cmd_StartLog(
    mode: Muse_HW.DataMode,
    frequency: Muse_HW.DataFrequency,
  ) {
    // Definition of message buffer
    var buffer = new Uint8Array(Muse_HW.CommandLength.CMD_LENGTH_START_LOG);

    // Start stream acquisition using set state command
    buffer[0] = Muse_HW.Command.CMD_STATE;

    // Set payload length
    buffer[1] = Muse_HW.CommandLength.CMD_LENGTH_START_LOG - 2;

    // Set tx type based on boolean flag value
    buffer[2] = Muse_HW.SystemState.SYS_LOG;

    // Set acquisition mode
    buffer[3] = mode;
    buffer[4] = 0;
    buffer[5] = 0;

    // let tmp = new Uint8Array(4);
    // tmp = BitConverter.GetBytes((UInt32)mode);
    // Array.Copy(tmp, 0, buffer, 3, 3);

    // Set acquisition frequency
    buffer[6] = frequency;

    // Wrap message with header and trailer in the case of USB communication
    // if (channel == CommunicationChannel.CHANNEL_USB)
    //     return WrapMessage(buffer);

    return Array.from(buffer);
  }

  static Cmd_StopAcquisition() {
    // Definition of message buffer
    var buffer = new Uint8Array(
      Muse_HW.CommandLength.CMD_LENGTH_STOP_ACQUISITION,
    );

    // Set stop acquisition command
    buffer[0] = Muse_HW.Command.CMD_STATE;
    buffer[1] = Muse_HW.CommandLength.CMD_LENGTH_STOP_ACQUISITION - 2;

    // Set system state TX
    buffer[2] = Muse_HW.SystemState.SYS_IDLE;

    // Wrap message with header and trailer in the case of USB communication
    // if (channel == CommunicationChannel.CHANNEL_USB)
    // return WrapMessage(buffer);

    return Array.from(buffer);
  }

  static Cmd_Restart(mode: number) {
    if (mode === 0 || mode === 1) {
      var buffer = new Uint8Array(3);

      buffer[0] = Muse_HW.Command.CMD_RESTART;
      buffer[1] = 1;
      buffer[2] = mode;

      return Array.from(buffer);
    }

    // Wrap message with header and trailer in the case of USB communication
    // if (channel == CommunicationChannel.CHANNEL_USB)
    // return WrapMessage(buffer);

    return null;
  }

  static Cmd_GetApplicationInfo() {
    var buffer = new Uint8Array(2);
    buffer[0] = Muse_HW.Command.CMD_APP_INFO + Muse_HW.Constants.READ_BIT_MASK;

    // Wrap message with header and trailer in the case of USB communication
    // if (channel == CommunicationChannel.CHANNEL_USB)
    // return WrapMessage(buffer);

    return Array.from(buffer);
  }

  static Cmd_GetBatteryCharge() {
    const buffer = new Uint8Array(2);
    buffer[0] = Muse_HW.Command.CMD_BATTERY_CHARGE + Muse_HW.Constants.READ_BIT_MASK;
  
    // If needed, wrap the message with a header and trailer for USB communication
    // Uncomment and implement if applicable:
    // if (channel == CommunicationChannel.CHANNEL_USB)
    //   return WrapMessage(buffer);
  
    return buffer; // Return the Uint8Array directly
  }
  

  static Cmd_GetBatteryVoltage() {
    var buffer = new Uint8Array(2);
    buffer[0] =
      Muse_HW.Command.CMD_BATTERY_VOLTAGE + Muse_HW.Constants.READ_BIT_MASK;

    // Wrap message with header and trailer in the case of USB communication
    // if (channel == CommunicationChannel.CHANNEL_USB)
    // return WrapMessage(buffer);

    return Array.from(buffer);
  }

  static Cmd_GetDeviceCheckUp() {
    var buffer = new Uint8Array(2);
    buffer[0] = Muse_HW.Command.CMD_CHECK_UP + Muse_HW.Constants.READ_BIT_MASK;

    // Wrap message with header and trailer in the case of USB communication
    // if (channel == CommunicationChannel.CHANNEL_USB)
    // return WrapMessage(buffer);

    return Array.from(buffer);
  }

  static Cmd_GetFirmwareVersion() {
    var buffer = new Uint8Array(2);
    buffer[0] =
      Muse_HW.Command.CMD_FW_VERSION + Muse_HW.Constants.READ_BIT_MASK;

    // Wrap message with header and trailer in the case of USB communication
    // if (channel == CommunicationChannel.CHANNEL_USB)
    // return WrapMessage(buffer);

    return Array.from(buffer);
  }

  static Cmd_SetTime() {
    var buffer = new Uint8Array(Muse_HW.CommandLength.CMD_LENGTH_SET_TIME);
    buffer[0] = Muse_HW.Command.CMD_TIME;
    buffer[1] = Muse_HW.CommandLength.CMD_LENGTH_SET_TIME - 2;

    // Get current timespan since 1/1/1970
    // TimeSpan timeSpan = DateTime.UtcNow.Subtract(new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc));
    // uint secondsSinceEpoch = (uint)timeSpan.TotalSeconds;

    // Set payload - seconds since epoch (4 bytes)
    // byte[] payload = BitConverter.GetBytes(secondsSinceEpoch);
    // Array.Copy(payload, 0, buffer, 2, (int)CommandLength.CMD_LENGTH_SET_TIME - 2);

    // Wrap message with header and trailer in the case of USB communication
    // if (channel == CommunicationChannel.CHANNEL_USB)
    //     return WrapMessage(buffer);

    return Array.from(buffer);
  }

  static Cmd_GetTime() {
    var buffer = new Uint8Array(2);
    buffer[0] = Muse_HW.Command.CMD_TIME + Muse_HW.Constants.READ_BIT_MASK;

    return Array.from(buffer);
  }

  static Cmd_SetDeviceName(bleName: string) {
    var buffer = new Uint8Array(Muse_HW.CommandLength.CMD_LENGTH_SET_BLE_NAME);

    // Check bleName to be set consistency before proceeding
    if (bleName != '' && bleName.length < 16) {
      buffer[0] =
        Muse_HW.Command.CMD_BLE_NAME + Muse_HW.Constants.READ_BIT_MASK;
      buffer[1] = bleName.length;

      // char[] tmpName = bleName.ToCharArray();
      // for (int i = 0; i < respLen; i++)
      //     buffer[2 + i] = Convert.ToByte(tmpName[i]);
    }

    // Wrap message with header and trailer in the case of USB communication
    // if (channel == CommunicationChannel.CHANNEL_USB)
    // return WrapMessage(buffer);

    return Array.from(buffer);
  }

  static Cmd_GetDeviceName() {
    var buffer = new Uint8Array(2);
    buffer[0] = Muse_HW.Command.CMD_BLE_NAME + Muse_HW.Constants.READ_BIT_MASK;

    // Wrap message with header and trailer in the case of USB communication
    // if (channel == CommunicationChannel.CHANNEL_USB)
    // return WrapMessage(buffer);

    return Array.from(buffer);
  }

  static Cmd_GetDeviceID() {
    var buffer = new Uint8Array(2);
    buffer[0] = Muse_HW.Command.CMD_DEVICE_ID + Muse_HW.Constants.READ_BIT_MASK;

    // Wrap message with header and trailer in the case of USB communication
    // if (channel == CommunicationChannel.CHANNEL_USB)
    // return WrapMessage(buffer);

    return Array.from(buffer);
  }

  static Cmd_SetSensorsFullScale(
    gyrFS: SensorConfigType,
    axlFS: SensorConfigType,
    magFS: SensorConfigType,
    hdrFS: SensorConfigType,
  ) {
    var buffer = new Uint8Array(
      Muse_HW.CommandLength.CMD_LENGTH_SET_SENSORS_FS,
    );
    buffer[0] = Muse_HW.Command.CMD_SENSORS_FS;
    buffer[1] = Muse_HW.CommandLength.CMD_LENGTH_SET_SENSORS_FS - 2;

    let fs_code = gyrFS.key | axlFS.key | magFS.key | hdrFS.key;

    const bytes = Muse_Utils.toBytesUInt32(fs_code);
    let bytes_array = new Uint8Array(bytes);
    let offset = 2;
    for (var i = 0; i < 3; i++) {
      buffer[i + offset] = bytes_array[i];
    }

    return Array.from(buffer);
  }

  static Cmd_GetSensorsFullScale() {
    var buffer = new Uint8Array(
      Muse_HW.CommandLength.CMD_LENGTH_GET_SENSORS_FS,
    );
    buffer[0] =
      Muse_HW.Command.CMD_SENSORS_FS + Muse_HW.Constants.READ_BIT_MASK;

    return Array.from(buffer);
  }

  //// DECODING FUNCTIONS
  static ParseCommandCharacteristic(buffer: Uint8Array, ble_channel: boolean) {
    if (ble_channel) {
      // Manage notification through BLE
      return new CommandResponse(buffer);
    } else {
      // Manage notification through USB
      return new CommandResponse(Muse_Utils.ExtractMessage(buffer));
    }
  }

  static Dec_SystemState(response: CommandResponse) {
    // Decode system state given command response
    if (
      (response.tx & 0x7f) == Muse_HW.Command.CMD_STATE &&
      response.ack == Muse_HW.AcknowledgeType.ACK_SUCCESS
    ) {
      if ((response.tx & Muse_HW.Constants.READ_BIT_MASK) != 0) {
        return response.payload[0];
      }
    }

    return null;
  }

  static Dec_ApplicationInfo(response: CommandResponse) {
    // Decode firmware application info given command response payload
    if (
      (response.tx & 0x7f) == Muse_HW.Command.CMD_APP_INFO &&
      response.ack == Muse_HW.AcknowledgeType.ACK_SUCCESS
    ) {
      if ((response.tx & Muse_HW.Constants.READ_BIT_MASK) != 0) {
      }
    }

    return null;
  }

  static Dec_BatteryCharge(response: CommandResponse) {
    // Decode battery charge (percentage) value given command response
    console.log(response,'checkbatres')

    if (
      (response.tx & 0x7f) == Muse_HW.Command.CMD_BATTERY_CHARGE &&
      response.ack == Muse_HW.AcknowledgeType.ACK_SUCCESS
    ) {
      if ((response.tx & Muse_HW.Constants.READ_BIT_MASK) != 0) {
        return response.payload[0];
      }
    }

    return null;
  }

  static Dec_BatteryVoltage(response: CommandResponse) {
    // Decode battery voltage (mV) value given command response
    if (
      (response.tx & 0x7f) == Muse_HW.Command.CMD_BATTERY_CHARGE &&
      response.ack == Muse_HW.AcknowledgeType.ACK_SUCCESS
    ) {
      if ((response.tx & Muse_HW.Constants.READ_BIT_MASK) != 0) {
        var data = [response.payload[1], response.payload[0]];

        var buf = new ArrayBuffer(2);
        var view = new DataView(buf);
        data.forEach(function (b, i) {
          view.setUint8(i, b);
        });

        return view.getUint16(0, false);
      }
    }

    return null;
  }

  static Dec_CheckUp(response: CommandResponse) {
    // Decode current checkup register value given command response payload
    if (
      (response.tx & 0x7f) == Muse_HW.Command.CMD_CHECK_UP &&
      response.ack == Muse_HW.AcknowledgeType.ACK_SUCCESS
    ) {
      if ((response.tx & Muse_HW.Constants.READ_BIT_MASK) != 0) {
      }
    }

    return null;
  }

  static Dec_FirmwareVersion(response: CommandResponse) {
    // Decode current firmware versions given command response payload
    if (
      (response.tx & 0x7f) == Muse_HW.Command.CMD_FW_VERSION &&
      response.ack == Muse_HW.AcknowledgeType.ACK_SUCCESS
    ) {
      if ((response.tx & Muse_HW.Constants.READ_BIT_MASK) != 0) {
        let fw_versions = [];
        let tmp = '';
        let j = 0;
        for (let i = 0; i < response.payload.length; i++) {
          // Check for end-of-string character
          if (String.fromCharCode(response.payload[i]) != '\0') {
            tmp += String.fromCharCode(response.payload[i]);
          } else {
            fw_versions[j] = tmp;
            tmp = '';
            j++;
          }
        }
        return fw_versions;
        // return (String.fromCharCode(response.payload[0],response.payload[1],response.payload[2],response.payload[3],response.payload[4],response.payload[5]) + "\t" +
        //         String.fromCharCode(response.payload[6],response.payload[7],response.payload[8],response.payload[9],response.payload[10],response.payload[11]));
      }
    }

    return null;
  }

  static Dec_DateTime(response: CommandResponse) {
    // Decode current checkup register value given command response payload
    if (
      (response.tx & 0x7f) == Muse_HW.Command.CMD_TIME &&
      response.ack == Muse_HW.AcknowledgeType.ACK_SUCCESS
    ) {
      if ((response.tx & Muse_HW.Constants.READ_BIT_MASK) != 0) {
        // Timestamp
        var data = [
          response.payload[3],
          response.payload[2],
          response.payload[1],
          response.payload[0],
        ];

        var buf = new ArrayBuffer(4);
        var view = new DataView(buf);
        data.forEach(function (b, i) {
          view.setUint8(i, b);
        });

        var timestamp = view.getUint32(0, false);
        // timestamp += 1580000000 * 1000;
        // var datetime = new Date(timestamp);

        // let tmp = new Date();
        // let secs = tmp.getSeconds();
        // tmp.setSeconds(secs + timestamp);

        return timestamp;
      }
    }

    return null;
  }

  static Dec_DeviceName(response: CommandResponse) {
    // Decode current checkup register value given command response payload
    if (
      (response.tx & 0x7f) == Muse_HW.Command.CMD_BLE_NAME &&
      response.ack == Muse_HW.AcknowledgeType.ACK_SUCCESS
    ) {
      if ((response.tx & Muse_HW.Constants.READ_BIT_MASK) != 0) {
        let ble_name = '';
        for (let i = 0; i < response.payload.length; i++) {
          // Check for end-of-string character
          if (String.fromCharCode(response.payload[i]) != '\0')
            ble_name += String.fromCharCode(response.payload[i]);
        }
        return ble_name;
      }
    }

    return null;
  }

  static Dec_DeviceID(response: CommandResponse) {
    // Decode current device unique identifier given command response payload
    if (
      (response.tx & 0x7f) == Muse_HW.Command.CMD_DEVICE_ID &&
      response.ack == Muse_HW.AcknowledgeType.ACK_SUCCESS
    ) {
      if ((response.tx & Muse_HW.Constants.READ_BIT_MASK) != 0) {
        let dev_id =
          response.payload[0].toString(16).padStart(2, '0') +
          response.payload[1].toString(16).padStart(2, '0') +
          response.payload[2].toString(16).padStart(2, '0') +
          response.payload[3].toString(16).padStart(2, '0');

        return dev_id;
      }
    }

    return null;
  }

  static Dec_DeviceSkills(response: CommandResponse) {
    // Extract hardware skills given the overall skills code
    if (
      (response.tx & 0x7f) == Muse_HW.Command.CMD_DEVICE_SKILLS &&
      response.ack == Muse_HW.AcknowledgeType.ACK_SUCCESS
    ) {
      if ((response.tx & Muse_HW.Constants.READ_BIT_MASK) != 0) {
      }
    }

    return null;
  }

  static Dec_MemoryStatus(response: CommandResponse) {
    // Extract hardware skills given the overall skills code
    if (
      (response.tx & 0x7f) == Muse_HW.Command.CMD_MEM_CONTROL &&
      response.ack == Muse_HW.AcknowledgeType.ACK_SUCCESS
    ) {
      if ((response.tx & Muse_HW.Constants.READ_BIT_MASK) != 0) {
        let mem_status = [];
        // Get available free memory (i.e., percentage value)
        mem_status[0] = response.payload[0];

        // Get number of files currently saved in memory
        mem_status[1] = Muse_Utils.intFromBytes(response.payload.slice(1, 3));

        return mem_status;
      }
    }

    return null;
  }

  static Dec_FileInfo(response: CommandResponse) {
    // Extract hardware skills given the overall skills code
    if (
      (response.tx & 0x7f) == Muse_HW.Command.CMD_MEM_FILE_INFO &&
      response.ack == Muse_HW.AcknowledgeType.ACK_SUCCESS
    ) {
      if ((response.tx & Muse_HW.Constants.READ_BIT_MASK) != 0) {
        // Timestamp
        var data = [
          0,
          0,
          0,
          response.payload[4],
          response.payload[3],
          response.payload[2],
          response.payload[1],
          response.payload[0],
        ];

        var buf = new ArrayBuffer(8);
        var view = new DataView(buf);
        data.forEach(function (b, i) {
          view.setUint8(i, b);
        });

        var timestamp = view.getBigUint64(0, false);
        timestamp += BigInt(1580000000) * BigInt(1000);
        // var datetime = new Date(timestamp);

        // Sensors full scales
        let sensors_config = [];

        // Pad 3-bytes response.payload array with a further byte before converting to UInt32 and extracting configuration codes
        var data = [0, 0, 0, response.payload[5]];

        var buf = new ArrayBuffer(4);
        var view = new DataView(buf);
        data.forEach(function (b, i) {
          view.setUint8(i, b);
        });

        var fs_code = view.getUint32(0, false);

        let gyr_code = fs_code & 0x03;
        let axl_code = fs_code & 0x0c;
        let mag_code = fs_code & 0xc0;
        let hdr_code = fs_code & 0x30;

        sensors_config[0] = Muse_HW.Gyroscope_CFG.get(gyr_code);
        sensors_config[1] = Muse_HW.Accelerometer_CFG.get(axl_code);
        sensors_config[2] = Muse_HW.Magnetometer_CFG.get(mag_code);
        sensors_config[3] = Muse_HW.AccelerometerHDR_CFG.get(hdr_code);

        // Acquisition configuration (mode + frequency)
        let log_config = [];

        // Pad 3-bytes response.payload array with a further byte before converting to UInt32
        var data = [
          0,
          response.payload[8],
          response.payload[7],
          response.payload[6],
        ];

        var buf = new ArrayBuffer(4);
        var view = new DataView(buf);
        data.forEach(function (b, i) {
          view.setUint8(i, b);
        });

        var mode_code = view.getUint32(0, false);
        log_config[0] = mode_code; // mode

        log_config[1] = response.payload[9]; // frequency

        const id = response.payload[12]; //get id from header;

        var data = [response.payload[11], response.payload[10]];

        var buf = new ArrayBuffer(2);
        var view = new DataView(buf);
        data.forEach(function (b, i) {
          view.setUint8(i, b);
        });

        let trainingId : string | number = view.getUint16(0, false);
        if (typeof trainingId !== 'string') {
          trainingId = trainingId.toString();
        }
        const file_info = {
          timestamp,
          sensors_config,
          log_config,
          id,
          trainingId,
        };
        return file_info;
      }
    }

    return null;
  }

  static Dec_SensorFullScales(response: CommandResponse) {
    // Decode current sensors full scales (i.e., gyr / axl / hdr / mag) given command response payload
    if (
      ((response.tx & 0x7f) == Muse_HW.Command.CMD_SENSORS_FS ||
        (response.tx & 0x7f) == Muse_HW.Command.CMD_STATE) &&
      response.ack == Muse_HW.AcknowledgeType.ACK_SUCCESS
    ) {
      if (
        (response.tx & Muse_HW.Constants.READ_BIT_MASK) != 0 ||
        response.tx == Muse_HW.Command.CMD_STATE
      ) {
        let sensors_config = [];

        // Pad 3-bytes response.payload array with a further byte before converting to UInt32 and extracting configuration codes
        var data = [
          0,
          response.payload[2],
          response.payload[1],
          response.payload[0],
        ];

        var buf = new ArrayBuffer(4);
        var view = new DataView(buf);
        data.forEach(function (b, i) {
          view.setUint8(i, b);
        });

        var fs_code = view.getUint32(0, false);

        let gyr_code = fs_code & 0x03;
        let axl_code = fs_code & 0x0c;
        let mag_code = fs_code & 0xc0;
        let hdr_code = fs_code & 0x30;

        sensors_config[0] = Muse_HW.Gyroscope_CFG.get(gyr_code);
        sensors_config[1] = Muse_HW.Accelerometer_CFG.get(axl_code);
        sensors_config[2] = Muse_HW.Magnetometer_CFG.get(mag_code);
        sensors_config[3] = Muse_HW.AccelerometerHDR_CFG.get(hdr_code);

        return sensors_config;
      }
    }

    return null;
  }

  static Dec_ButtonLogConfiguration(response: CommandResponse) {
    // Decode current button log configuration given command response payload
    if (
      (response.tx & 0x7f) == Muse_HW.Command.CMD_BTN_LOG &&
      response.ack == Muse_HW.AcknowledgeType.ACK_SUCCESS
    ) {
      if ((response.tx & Muse_HW.Constants.READ_BIT_MASK) != 0) {
        let log_config = [];

        // Pad 3-bytes response.payload array with a further byte before converting to UInt32
        var data = [
          0,
          response.payload[2],
          response.payload[1],
          response.payload[0],
        ];

        var buf = new ArrayBuffer(4);
        var view = new DataView(buf);
        data.forEach(function (b, i) {
          view.setUint8(i, b);
        });

        var mode_code = view.getUint32(0, false);
        log_config[0] = mode_code; // mode

        log_config[1] = response.payload[3]; // frequency

        return log_config;
      }
    }

    return null;
  }

  static Dec_UserConfiguration(response: CommandResponse) {
    // Decode current user configuration given command response payload
    if (
      (response.tx & 0x7f) == Muse_HW.Command.CMD_USER_CFG &&
      response.ack == Muse_HW.AcknowledgeType.ACK_SUCCESS
    ) {
      if ((response.tx & Muse_HW.Constants.READ_BIT_MASK) != 0) {
        let user_config = [false, false, false];

        var data = [response.payload[1], response.payload[0]];

        var buf = new ArrayBuffer(4);
        var view = new DataView(buf);
        data.forEach(function (b, i) {
          view.setUint8(i, b);
        });

        var user_code = view.getUint16(0, false);

        if (user_code & Muse_HW.UserConfigMask.USER_CFG_MASK_STANDBY)
          user_config[0] = true;

        if (user_code & Muse_HW.UserConfigMask.USER_CFG_MASK_CIRCULAR_MEMORY)
          user_config[1] = true;

        if (user_code & Muse_HW.UserConfigMask.USER_CFG_MASK_USB_STREAM)
          user_config[2] = true;

        return user_config;
      }
    }

    return null;
  }

  static Dec_PPGreadings(_buffer: Uint8Array) {
    // TO BE IMPLEMENTED!!!
  }

  static Dec_TEMPreadings(_buffer: Uint8Array) {
    // TO BE IMPLEMENTED!!!
  }

  //// UTILITIES

  private static intBitsToFloat(i: number) {
    var int8 = new Int8Array(4);
    var int32 = new Int32Array(int8.buffer, 0, 1);
    var float32 = new Float32Array(int8.buffer, 0, 1);

    int32[0] = i;
    return float32[0];
  }

  public static getFullFloat(halfPrecision: number) {
    let fullPrecision = Muse_Utils.toFullPrecision(halfPrecision);
    return fullPrecision;
  }

  private static toFullPrecision(halfPrecision: number) {
    //var int8 = new Int8Array(4);
    //var int32 = new Int32Array(int8.buffer, 0, 1);
    //var float32 = new Float32Array(int8.buffer, 0, 1);

    let mantissa = halfPrecision & 0x03ff;
    let exponent = halfPrecision & 0x7c00;

    if (exponent == 0x7c00) {
      exponent = 0x3fc00;
    } else if (exponent != 0) {
      exponent += 0x1c000;
      if (mantissa == 0 && exponent > 0x1c400) {
        return Muse_Utils.intBitsToFloat(
          ((halfPrecision & 0x8000) << 16) | (exponent << 13) | 0x3ff,
        );
      }
    } else if (mantissa != 0) {
      exponent = 0x1c400;
      do {
        mantissa = mantissa << 1;
        exponent -= 0x400;
      } while ((mantissa & 0x400) == 0);
      mantissa &= 0x3ff;
    }

    return Muse_Utils.intBitsToFloat(
      ((halfPrecision & 0x8000) << 16) | ((exponent | mantissa) << 13),
    );
  }

  public static intFromBytes(x: Uint8Array) {
    // Revert array to manage endianness
    x.reverse();
    // Iterate across array to retrieve corresponding integer value
    var val = 0;
    for (var i = 0; i < x.length; ++i) {
      val += x[i];
      if (i < x.length - 1) {
        val = val << 8;
      }
    }
    return val;
  }

  public static toBytesUInt32(num: number) {
    let arr = new ArrayBuffer(4); // an Int32 takes 4 bytes
    let view = new DataView(arr);
    view.setUint32(0, num, true); // byteOffset = 0; litteEndian = true
    return arr;
  }

  public static SystemStateToString(arg: Muse_HW.SystemState) {
    let system_state_string = '';
    switch (arg) {
      case Muse_HW.SystemState.SYS_ERROR: // = 0xff,
        system_state_string = 'ERROR';
        break;
      case Muse_HW.SystemState.SYS_STARTUP: // = 0x01,
        system_state_string = 'STARTUP';
        break;
      case Muse_HW.SystemState.SYS_IDLE: // = 0x02,
        system_state_string = 'IDLE';
        break;
      case Muse_HW.SystemState.SYS_STANDBY: // = 0x03,
        system_state_string = 'STANDBY';
        break;
      case Muse_HW.SystemState.SYS_LOG: // = 0x04,
        system_state_string = 'LOG';
        break;
      case Muse_HW.SystemState.SYS_READOUT: // = 0x05,
        system_state_string = 'READOUT';
        break;
      case Muse_HW.SystemState.SYS_TX_BUFFERED: // = 0x06,
        system_state_string = 'TX BUF';
        break;
      case Muse_HW.SystemState.SYS_CALIB: // = 0x07,
        system_state_string = 'CALIB';
        break;
      case Muse_HW.SystemState.SYS_TX_DIRECT: // = 0x08
        system_state_string = 'TX DIR';
        break;
      default:
        system_state_string = '';
        break;
    }

    return system_state_string;
  }

  public static DataModeToString(arg: number) {
    let mode_string = [];
    if (arg & 0x0000) {
      // case 0: DATA_MODE_NONE = 0x00
      mode_string.push('NONE');
    }

    if (arg & 0x0001) {
      // case 1: DATA_MODE_GYRO = 0x01
      mode_string.push('GYR');
    }

    if (arg & 0x0002) {
      // case 2: DATA_MODE_AXL = 0x02
      mode_string.push('AXL');
    }

    // if (arg & 0x0003) {
    // case 3: DATA_MODE_IMU = DATA_MODE_AXL | DATA_MODE_GYRO = 0x03
    // mode_string.push("IMU");
    // }

    if (arg & 0x0004) {
      // case 4: DATA_MODE_MAGN = 0x04
      mode_string.push('MAG');
    }

    // if (arg & 0x0007) {
    // case 7: DATA_MODE_9DOF = DATA_MODE_MAGN | DATA_MODE_IMU = 0x07
    // mode_string.push("9DOF");
    // }

    if (arg & 0x0008) {
      mode_string.push('HDR');
    }

    // if (arg & 0x0011) {
    // mode_string.push("IMU|HDR");
    // }

    if (arg & 0x0010) {
      mode_string.push('QUAT');
    }

    // if (arg & 0x0013) {
    // case 19: DATA_MODE_IMU_ORIENTATION = DATA_MODE_ORIENTATION | DATA_MODE_IMU = 0x13
    // mode_string.push("IMU|QUAT");
    // }

    // if (arg & 0x0017) {
    // case 23: DATA_MODE_9DOF_ORIENTATION = DATA_MODE_9DOF | DATA_MODE_ORIENTATION = 0x17
    // mode_string.push("9DOF|QUAT");
    // }

    if (arg & 0x0020) {
      // case 32: DATA_MODE_TIMESTAMP = 0x20
      mode_string.push('TIME');
    }

    if (arg & 0x0040) {
      // case 64: DATA_MODE_TEMP_HUM = 0x40
      mode_string.push('TH');
    }

    if (arg & 0x0080) {
      // case 128: DATA_MODE_TEMP_PRESS = 0x80
      mode_string.push('TP');
    }

    if (arg & 0x0100) {
      // case 256: DATA_MODE_RANGE = 0x0100
      mode_string.push('RANGE');
    }

    if (arg & 0x0200) {
      // case 512: DATA_MODE_MANDOWN=0x0200
      // mode_string.push("TIME");
    }

    if (arg & 0x0400) {
      // case 1024: DATA_MODE_SOUND=0x0400
      mode_string.push('SOUND');
    }

    return mode_string.join(',');
  }

  public static DataFrequencyToString(arg: number) {
    let frequency = 0;
    switch (arg) {
      case Muse_HW.DataFrequency.DATA_FREQ_25Hz: // = 0x01,
        frequency = 25;
        break;
      case Muse_HW.DataFrequency.DATA_FREQ_50Hz: // = 0x02,
        frequency = 50;
        break;
      case Muse_HW.DataFrequency.DATA_FREQ_100Hz: // = 0x04,
        frequency = 100;
        break;
      case Muse_HW.DataFrequency.DATA_FREQ_200Hz: // = 0x08,
        frequency = 200;
        break;
      case Muse_HW.DataFrequency.DATA_FREQ_400Hz: // = 0x10,
        frequency = 400;
        break;
      case Muse_HW.DataFrequency.DATA_FREQ_800Hz: // = 0x20,
        frequency = 800;
        break;
      case Muse_HW.DataFrequency.DATA_FREQ_1600Hz: // = 0x40
        frequency = 1600;
        break;
      default:
        frequency = 0;
        break;
    }

    return frequency;
  }
}

export const toUint16 = (value: number[]) => {
  var data = [value[1], value[0]];
  var buf = new ArrayBuffer(2);
  var view = new DataView(buf);
  data.forEach(function (b, i) {
    view.setUint8(i, b);
  });

  var result = view.getUint16(0);
  return result;
};

export const toUint8 = (value: number) => {
  /*var buf = new ArrayBuffer(1);
  var view = new DataView(buf);
  view.setUint8(0, value);
  var result = view.getUint8(0);*/
  return value;
};

export default Muse_Utils;
