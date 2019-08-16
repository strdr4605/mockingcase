// Type definitions for mockingcase 1.8
// Project: https://github.com/strdr4605/mockingcase
// Definitions by: Dragoș Străinu https://github.com/strdr4605

declare module "mockingcase" {
  interface Options {
    random?: boolean;
    onlyLetters?: boolean;
    firstUpper?: boolean;
  }

  export = mockingcase;
  function mockingcase(input: string | string[], options?: Options): string;

  namespace mockingcase {
    type MockingCase = (
      input: string,
      options?: Options
    ) => string & {
      log: (input: string, options?: Options) => void;
      config: (defaultOptions: Options) => MockingCase;
      overrideString: () => MockingCase;
      overrideConsole: () => MockingCase;
    };
    export function log(input: string | string[], options?: Options): void;
    export function config(defaultOptions: Options): void;
    export function overrideString(): MockingCase;
    export function overrideConsole(): MockingCase;
  }
}
