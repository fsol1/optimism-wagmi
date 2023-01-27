declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ALCHEMY_KEY: string;
    }
  }
}

export {};
