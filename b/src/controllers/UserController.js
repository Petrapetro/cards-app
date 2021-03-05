export class UserController {
  constructor(userService, authService) {
    this.userService = userService
    this.authService = authService
  }

  async login({ body }, res) {
    const { username, password } = body;
    try {
      validateInputsByLogin({ username, password });
      const loginResult = await this.authService.authenticate(username, password);
      if (loginResult.message) {
        throw Error(loginResult.message);
      }
      res.status(200).json({ token: loginResult, username });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }

  async signUp(req, res) {
    const { username, password } = req.body;
    try {
      validateInputsByRegister({ username, password })
      if (await this.userRepo.existsByUsername(username)) {
        throw Error("User is already taken.")
      }
      const hash = await this.authService.getHashedPassword(password);
      const addUserMessage = await this.userService.add({ username, hash });
      res.status(200).json({ message: addUserMessage });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }

}