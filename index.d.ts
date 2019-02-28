// Type definitions for mockingcase 1.2
// Project: https://github.com/strdr4605/mockingcase
// Definitions by: Dragoș Străinu https://github.com/strdr4605

declare module 'mockingcase' {
  export = mockingcase;
  function mockingcase(input: string|Array<string>, options?: { random?: boolean }): string;
  namespace mockingcase {
    export function log(input: string|Array<string>, options?: { random?: boolean }): void;
  }
}
