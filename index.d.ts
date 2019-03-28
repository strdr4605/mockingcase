
// Type definitions for mockingcase 1.3
// Project: https://github.com/strdr4605/mockingcase
// Definitions by: Dragoș Străinu https://github.com/strdr4605

declare module 'mockingcase' {

  interface Options {
    random?: boolean,
    onlyLetters?: boolean,
    firstUpper?: boolean
  }

  export = mockingcase;
  function mockingcase(input: string | string[], options?: Options): string;

  namespace mockingcase {
    type MockingCase = (input: string, options?: Options) => string & {
      log: (input: string, options?: Options) => void,
      overrideString: () => MockingCase
    }
    export function log(input: string | string[], options?: Options): void;
    export function overrideString(): MockingCase;
  }
}
