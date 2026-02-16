`use strict`;

import { Schema, model } from "mongoose";

const userSchema = new Schema({
    user_name: {
        type: String,
        required: [true, "El nombre de usuario es obligatorio"],
        trim: true,
        lowercase: true,
    },
    name: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        trim: true,
        lowercase: true,
    },
    last_name: {
        type: String,
        required: [true, "El apellido es obligatorio"],
        trim: true,
        lowercase: true,
    },
    phone: {
        type: String,
        required: [true, "El telefono es obligatorio"],
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "El correo es obligatorio"],
        trim: true,
        lowercase: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
    date_of_birth: {
        type: Date,
        required: [true, "La fecha de nacimiento es obligatoria"],
        trim: true,
        lowercase: true,
    },
});

export default model('Users', userSchema);
