import { IncomingMessage, ServerResponse } from "http";
import { PluginOption } from "vite";
import { ServiceMap } from "./interfaces/service";
import PROXY from "./proxy";

export interface FullstackOptions {
  // services: ServiceMap;
  server: (req: IncomingMessage, res: ServerResponse) => void;
  cors?: string;
  acceptedHeaders?: string;
}

export function Fullstack(props: FullstackOptions): PluginOption {
  return {
    name: "fullstack-vite",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use(
        async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
          if (req.url?.startsWith("/api")) {
            // @ts-ignore
            // useServer(props, req as IncomingMessage, res);
            props.server(req, res);
          } else {
            next();
          }
        }
      );
    },
    transform(code, id) {
      if (id.endsWith("src/main.ts")) {
        code = `${code};\n\n${PROXY}`;
        return {
          code,
          map: null,
        };
      }

      if (id.endsWith(".service.ts")) {
        const name = code.match(/export default (\w+)/)?.[1];

        return {
          code: `export default window.___fullstack.proxy('${name}')`, // Substitua com o conteúdo que deseja
          map: null, // Para que o Vite não precise gerar um sourcemap para isso
        };
      }
    },
  };
}
