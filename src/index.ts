import {server} from './server';

server.listen(8080, process.env.APP_HOST || '192.168.0.115', () => console.log('App Iniciado'));