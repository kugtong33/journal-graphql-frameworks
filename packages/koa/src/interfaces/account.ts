export default interface AccountArgs {
  readonly id: string;
  readonly username: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly password: string;
  readonly newPassword: string;
  readonly oldPassword: string;
  readonly age: number;
}