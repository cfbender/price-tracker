import http, { Server } from "http";
import server from "../server";
//@ts-ignore
import db from "../../models";

describe("GET /api/examples", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  let connection: Server;
  beforeEach(async function() {
    connection = await server.listen(5000);
    return db.sequelize.sync({ force: true });
  });

  it("should find all examples", function(done) {
    // Add some examples to the db to test with
    db.Example.bulkCreate([
      { text: "First Example", description: "First Description" },
      { text: "Second Example", description: "Second Description" }
    ]).then(function() {
      // Request the route that returns all examples
      server.get("/api/examples").end(function(err: any, res: any) {
        const responseStatus = res.status;
        const responseBody = res.body;

        // Run assertions on the response

        expect(err).not.toBeNull();

        expect(responseStatus).toEqual(200);

        expect(Array.isArray(responseBody)).toBeTruthy();
        expect(responseBody).toHaveLength(2);

        expect(responseBody[0]).toEqual(
          expect.objectContaining({
            text: "First Example",
            description: "First Description"
          })
        );

        expect(responseBody[1]).toEqual(
          expect.objectContaining({
            text: "Second Example",
            description: "Second Description"
          })
        );

        // The `done` function is used to end any asynchronous tests
        connection.close();
        done();
      });
    });
  });
});
