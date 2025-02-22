export class userDtoRequest {
  username: string;
  email: string;
  password: string;
  role: string;

  constructor(
    password: string,
    username: string,
    email: string,
    role: string
  ) {
    this.username = username;
    this.email = email;
    this.role = role;
    this.password = password;
  }
}
