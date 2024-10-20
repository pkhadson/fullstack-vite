import { IncomingMessage, ServerResponse } from "http";
import { ServiceMap } from "../interfaces/service";
import { IServer } from "..";
import http from "http";

const getJson = (req: IncomingMessage) =>
  new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      try {
        resolve(JSON.parse(data));
      } catch (error) {
        reject(error);
      }
    });
  });

interface UseServerProps {
  services: ServiceMap;
  cors?: string;
  acceptedHeaders?: string;
}

export async function useServer(
  { services, ...props }: UseServerProps,
  req: IncomingMessage & { body?: any },
  res: ServerResponse
) {
  req.body = await getJson(req);
  props.cors ??= "*";
  props.acceptedHeaders ??= "*";

  const serviceName = req.body[0] as keyof typeof services;
  const methodName = req.body[1] as keyof (typeof services)[typeof serviceName];
  const body = req.body[2] as [any];

  res.setHeader("Access-Control-Allow-Origin", props.cors!);

  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "GET, POST");
    res.setHeader("Access-Control-Allow-Headers", props.acceptedHeaders!);
    res.setHeader("Access-Control-Max-Age", "3600");
    res.writeHead(204);
    res.end();
    return;
  }

  if (!services[serviceName]) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Service not found" }));
    return;
  }

  if (!services[serviceName][methodName]) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Method not found" }));
    return;
  }

  try {
    // middleware here
    const method = services[serviceName][methodName] as (...args: any[]) => any;

    const result = await method.call(services[serviceName], ...body);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  } catch (error: any) {
    console.error(error);
    let code = error?.code || 500;

    if (code < 100 || code >= 600) code = 500;

    res.writeHead(code, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({ error: error.message || "Internal Server Error" })
    );
  }
}

export const runServer = (server: IServer) => {
  return http.createServer(server);
};
