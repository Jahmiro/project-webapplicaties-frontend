import { include as p } from "named-urls";

const paths = {
  root: p("/", {
    home: p("/", {}),
    login: p("/login", {}),
    windspeed: p("/windspeed", {}),
    airpressure: p("/airpressure", {}),
    station: p("/station/:id", {}),
  }),
};

export default paths;
