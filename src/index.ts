import "reflect-metadata";
import { startServer } from "./server";
import { connect } from "./config/typeOrm";

const main = async () => {
  connect();
  const PORT = 3000 || 30001;
  const app = await startServer();
  app.listen(PORT);
  console.log("Server running on -> http://localhost:3000/graphql");
};

main();
