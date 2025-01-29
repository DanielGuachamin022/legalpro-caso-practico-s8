const Usuario = require('../models/usuarioModel');
const Perfil = require('../models/perfilModel');
const bcrypt = require('bcrypt');

const UserService = {
  // Busca al usuario por correo y contraseña
  findUserWithProfile: async (email, password) => {
    // Busca al usuario con su perfil asociado
    const user = await Usuario.findOne({
      where: { correousuario: email, estadousuario: true },
      include: {
        model: Perfil,
        where: { estadoperfil: true }, // Solo perfiles activos
      },
    });

    if (!user) {
      throw new Error('Usuario no encontrado o desactivado');
    }

    // Verifica la contraseña usando bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.contraseniausuario);
    // console.log(!isPasswordValid)
    if (isPasswordValid) {
      throw new Error('Contraseña incorrecta');
    }

    return user; // Retorna el usuario con el perfil asociado
  },
};

module.exports = UserService;
