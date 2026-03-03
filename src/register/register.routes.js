import { Router } from "express";
import { login } from "./controller.register.js";

const api = Router();

api.post('/', login);

export default api;