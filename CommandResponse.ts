/* eslint-disable prettier/prettier */
import Muse_HW from './Muse_HW';

class CommandResponse {
  rx = Muse_HW.Command.CMD_NONE;
  tx = Muse_HW.Command.CMD_NONE;
  len = 0;
  ack = Muse_HW.AcknowledgeType.ACK_NONE;
  payload = new Uint8Array();

  constructor(buffer: Uint8Array | null) {
    console.log(buffer,'check buffer value')
    if (buffer != null) {
      this.rx = buffer[0];
      this.tx = buffer[2];

      this.len = buffer[1];
      this.ack = buffer[3];

      this.payload = new Uint8Array(this.len - 2);
      this.payload = buffer.slice(4, buffer.length);
    } else {
      this.rx = 0;
      this.tx = 0;

      this.len = 0;
      this.ack = 0;

      this.payload = new Uint8Array();
    }
  }
}
export default CommandResponse;
