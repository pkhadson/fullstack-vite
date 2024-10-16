import { Service } from "./interfaces/service";
import isVite from "./utils/is-vite";

interface ServicesFactoryProps {
  services: Service[];
}

export default class ServicesFactory {
  private services: Service[];

  constructor(props: ServicesFactoryProps) {
    this.services = props.services;
  }
}
