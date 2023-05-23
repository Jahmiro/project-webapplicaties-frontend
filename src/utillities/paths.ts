import { include as p } from "named-urls";

const paths = {
  root: p("/", {
    home: p("/", {}),
    login: p("/login", {}),
  }),
};

export default paths;
