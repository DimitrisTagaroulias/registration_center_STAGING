"usestrict";
import { Server as Socket_Server } from "socket.io";

class WebSocket {
  constructor(server, client_Port) {
    this.server = server;
    this.client_Port = client_Port;
    this.socket_options = {
      cors: {
        origin: [`http://localhost:${client_Port}`],
      },
    };
    this.io = new Socket_Server(server, this.socket_options);
  }
}
export { WebSocket };
