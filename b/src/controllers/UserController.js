export class UserController {
  constructor(userService) {
    this.userService = userService
    this.signUp = this.signUp.bind(this)
    this.login = this.login.bind(this)
    this.authUser = this.authUser.bind(this)
  }

  async login({ body }, res) {
    const { username, password } = body;
    console.log(username, password)
    try {
      const loginResult = (await this.userService.login(username, password));
      console.log(loginResult)
      const { token, id } = loginResult
      res.status(200).json({ token: token, username, id });
    } catch (err) {
      const { message } = err
      res.status(500).json({ message });
    }
  }

  async signUp(req, res) {
    const { username, password } = req.body;
    try {
      const addUserMessage = await this.userService.signUp(username, password);
      res.status(200).json({ message: addUserMessage });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }

  async authUser(req, res) {
    const { username } = req
    try {
    const { name, id } = (await this.userService.getDatasForAuth(username))
    res.status(200).json({ name, id })
    } catch (e) {
      res.status(500).json({ message: e})
    }
  }

}