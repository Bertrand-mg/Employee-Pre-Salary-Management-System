import express, { Router } from 'express';
import departmentRoute from './department.route';

const mainRoute: Router = express.Router();

mainRoute.use('/departments', departmentRoute);

export default mainRoute;
