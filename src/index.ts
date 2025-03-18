import {server} from './server';

server.listen(process.env.APP_PORT || 8080, () => console.log('App Iniciado'));