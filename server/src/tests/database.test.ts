import http, { Server } from "http";
import supertest from "supertest";
import fetch from "node-fetch";
import server from "../server";
//@ts-ignore
import db from "../../models";

describe("GET /api/examples", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  let connection: Server;
  let request: supertest.SuperTest<supertest.Test>;
  beforeAll(async function(done) {
    await db.sequelize.sync({ force: true });
    connection = http.createServer(server);
    connection.listen(done);
    request = supertest(connection);
  });

  afterAll(done => {
    connection.close(done);
    db.sequelize.close();
  });

  it("should find all examples", async () => {
    // Add some examples to the db to test with
    await db.Example.bulkCreate(
      [
        { text: "First Example", description: "First Description" },
        { text: "Second Example", description: "Second Description" }
      ],
      { individualHooks: true }
    );
    // Request the route that returns all examples
    const response = await request.get("/api/examples");
    // Run assertions on the response

    expect(response.status).toEqual(200);

    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body).toHaveLength(2);

    expect(response.body[0]).toEqual(
      expect.objectContaining({
        text: "First Example",
        description: "First Description"
      })
    );

    expect(response.body[1]).toEqual(
      expect.objectContaining({
        text: "Second Example",
        description: "Second Description"
      })
    );
  });
});
