import express from 'express';
import cors  from 'cors';
import 'dotenv/config';
import './shared/services/TranslationsYup';
import { router } from './router';

const server = express();

server.use(cors());
server.use(express.json());
server.use(router);

export {server};