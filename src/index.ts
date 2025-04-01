import {server} from './server';

server.listen(8080, process.env.APP_HOST || '192.168.3.5', () => console.log('App Iniciado'));