// @ts-ignore
import { IncomingMessage, ServerResponse } from "http";
import ServicesFactory from "./services-factory";
export * from "./plugin";

export * from "./server";
import isVite from "./utils/is-vite";

export { ServicesFactory, isVite };

export type IServer = (req: IncomingMessage, res: ServerResponse) => void;
