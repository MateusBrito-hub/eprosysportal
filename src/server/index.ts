import express from 'express';
import cors  from 'cors';
import 'dotenv/config';
import './shared/services/TranslationsYup';
import { router } from './router';
import compression from 'compression';

const server = express();

server.use(cors());
server.use(express.json());
server.use(compression())
server.use(router);

export {server};