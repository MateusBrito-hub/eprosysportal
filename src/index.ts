import {server} from './server';

server.listen(Number(process.env.APP_PORT) || 8080, process.env.APP_HOST || 'http://192.168.0.111', () => console.log('App Iniciado'));