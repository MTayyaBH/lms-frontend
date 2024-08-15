declare module 'crypto-js' {
    const AES: {
      encrypt(message: string, key: string): {
        toString(): string;
      };
      decrypt(encryptedMessage: string, key: string): {
        toString(encoding: any): string;
      };
    };
    const enc: {
      Utf8: any;
    };
  }
  