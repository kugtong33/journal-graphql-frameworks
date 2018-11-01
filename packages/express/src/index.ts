import Server from './Server';

const server = new Server();
server.start({ port: parseInt(process.env.PORT, 10) });
