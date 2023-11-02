import { resolve } from "path";

export const getFullPath = (path: string): string =>
  resolve(process.cwd(), path);
