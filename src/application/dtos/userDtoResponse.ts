export class userDtoResponse {
  id?: string;
  username: string;
  email: string;
  role: string;

  constructor(
    id: string | undefined,
    username: string,
    email: string,
    role: string) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.role = role;
  }
}
