import chai, { expect, should, assert } from "chai";
import { API_URL, createUser } from "./test.utils.js";
import axios from "axios";
describe("Create User endpoint ", () => {
  describe("POST to create a new User with correct fields, endpoint: /users/new", () => {
    it("should return an object representing the User and has a field '_id'", async () => {
      const payload = {
        name: "Anas",
        email: "anasone@gmail.com",
        age: 1,
      };
      const response = await axios.post(`${API_URL}/users/new`, payload);
      expect(response.status).to.be.equal(201);
      expect(response.data).to.be.an("object");
      expect(response.data).to.have.property("_id");
    });
  });

  describe("POST to create a new User with incorrect fields, endpoint: /users/new", () => {
    it("should not return a new user object", async () => {
      try {
        const payload = {
          //name: "Anas",
          email: "anasone@gmail.com",
          age: 1,
        };

        const response = await axios.post(`${API_URL}/users/new`, payload);
        expect(response.status).not.to.be.equal(201);
      } catch (error) {
        if (error.response) {
          expect(error.response.status).not.to.be.equal(201);
          expect(error.response).to.be.an("object");
          expect(error.response)
            .to.have.property("data")
            .to.have.property("message")
            .to.include("ValidationError");
        }
      }
    });
  });
});
