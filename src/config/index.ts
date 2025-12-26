interface serverInterface {
  port: number;
  prefix: string;
}

export const configs: serverInterface = {
  port: Number(process.env.PORT),
  prefix: String(process.env.PREFIX),
};

export * from './database';
export * from './helmet.config';
