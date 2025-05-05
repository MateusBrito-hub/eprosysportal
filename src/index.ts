import {server} from './server';

server.listen(8080, process.env.APP_HOST || 'localhost', () => console.log('App Iniciado'));