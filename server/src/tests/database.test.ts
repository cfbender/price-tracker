import http, { Server } from "http";
import fetch from "node-fetch";
import server from "../server";
//@ts-ignore
import db from "../../models";

describe("GET /api/examples", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  let connection: Server;
  beforeAll(async function(done) {
    await db.sequelize.sync({ force: true });
    connection = http.createServer(server);
    connection.listen(5000, done);
    return;
  });

  afterAll(done => {
    connection.close(done);
  });

  it("should find all examples", async function() {
    // Add some examples to the db to test with
    await db.Example.bulkCreate(
      [
        { text: "First Example", description: "First Description" },
        { text: "Second Example", description: "Second Description" }
      ],
      { individualHooks: true }
    );
    // Request the route that returns all examples
    const response = await fetch("http://localhost:5000/api/examples", {
      method: "GET"
    });

    const json = await response.json();
    const responseStatus = response.status;

    // Run assertions on the response

    expect(responseStatus).toEqual(200);

    expect(Array.isArray(json)).toBeTruthy();
    expect(json).toHaveLength(2);

    expect(json[0]).toEqual(
      expect.objectContaining({
        text: "First Example",
        description: "First Description"
      })
    );

    expect(json[1]).toEqual(
      expect.objectContaining({
        text: "Second Example",
        description: "Second Description"
      })
    );
  });
});
