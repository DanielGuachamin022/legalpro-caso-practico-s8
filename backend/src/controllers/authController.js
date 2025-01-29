const UserService = require('../services/userService');

const AuthController = {
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      // Llama al servicio para buscar el usuario con su perfil
      const user = await UserService.findUserWithProfile(email, password);

      // Responde con los datos del usuario y su perfil
      res.status(200).json({
        id: user.idusuario,
        name: user.nombreusuario,
        email: user.correousuario,
        profile: user.Perfil.nombreperfil, // Obtiene el nombre del perfil
      });
    } catch (error) {
      // Maneja errores (usuario no encontrado o contraseña incorrecta)
      res.status(401).json({ message: error.message });
    }
  },
};

module.exports = AuthController;
