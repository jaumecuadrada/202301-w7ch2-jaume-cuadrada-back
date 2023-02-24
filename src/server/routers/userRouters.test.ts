import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import connectDataBase from "../../database/connectDataBase";
import request from "supertest";
import { app } from "..";
import User from "../../database/models/User";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();

  await connectDataBase(server.getUri());
});

afterAll(async () => {
  await server.stop();
  await mongoose.connection.close();
});

describe("Given a POST /users/login endpoint", () => {
  beforeEach(async () => {
    await User.create({
      username: "Jaume",
      password: "Jaume1234",
      email: "jaume1234@gmail.com",
    });
  });

  describe("When a request is recieved with username 'Jaume' and password 'Jaume1234'", () => {
    test("Then it should respond with status code '200'", async () => {
      await request(app)
        .post("/users/login")
        .send({
          username: "Jaume",
          password: "Jaume1234",
        })
        .expect(200);
    });
  });
});
