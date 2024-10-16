export const SERVER_TS = `import { useServer, runServer, type IServer, isVite } from 'fullstack-vite'
import services from './services'
import type { IncomingMessage, ServerResponse } from 'http'

export const server: IServer = (req: IncomingMessage, res: ServerResponse) => {
  useServer(
    {
      services
    },
    req,
    res
  )
}

if (!isVite())
  runServer(server).listen(3000, () => console.log('Server listening on http://localhost:3000'))
`;

export const HELLO_SERVICE_TS = `class HelloService {
  async hello() {
    return { hello: 'World!' }
  }
}

const helloService = new HelloService()
export default helloService
`;

export const INDEX_TS = `import helloService from './hello.service'

const services = {
  helloService
}

export default services`;

export const VITE_CONFIG_TS_IMPORT = `import { Fullstack } from 'fullstack-vite'
import { server } from './src/server'`;

export const VITE_CONFIG_TS_SERVER = `plugins: [
  Fullstack({
    server
  })
]`;
