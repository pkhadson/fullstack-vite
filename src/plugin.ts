import { IncomingMessage, ServerResponse } from "http";
import { PluginOption } from "vite";
import PROXY from "./proxy";
import isVite from "./utils/is-vite";

export interface FullstackOptions {
  server: (req: IncomingMessage, res: ServerResponse) => void;
  cors?: string;
  apiUrl?: string;
}

export function Fullstack(props: FullstackOptions): PluginOption {
  props.apiUrl ??= isVite() ? "/api" : "http://localhost:3000";
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
        code = `${code};\n\n${PROXY};window.___fullstack.apiUrl = '${props.apiUrl}';`;
        return {
          code,
          map: null,
        };
      }

      if (id.endsWith(".service.ts")) {
        const name = code.match(/export default (\w+)/)?.[1];

        return {
          code: `export default new Proxy(
            {},
            {
              get: function (target, prop) {
                return async (...a) => {
                  if (!window.___fullstack?.callFetch) await new Promise(r => setTimeout(r, 100));
                  return await window.___fullstack.callFetch('${name}', prop, a);
                };
              },
            }\n  );`,
          map: null,
        };
      }
    },
  };
}
