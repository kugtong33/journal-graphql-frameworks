

declare module NodeJS  {
  interface Helper extends Object {
    chance: any;
    reqest: any;
  }

  interface Global {
    helper: any;
  }
}