import mocha, { before } from "mocha";
import chai, { expect, should, assert } from "chai";
import { API_URL, createUser } from "./test.utils.js";
import axios from "axios";
import { response } from "express";

let user;

describe(" Users Controller", () => {
  beforeEach(async () => {
    user = await createUser();
  });
  describe("GET Users endpoint /users", () => {
    it("should return an array of users", async () => {
      const response = await axios.get(`${API_URL}/users`);
      expect(response.data).to.be.an("array");
    });
  });

  describe("GET a User by email endpoint /users/:email", () => {
    it("should return an object representing User data which has property 'age'", async () => {
      const response = await axios.get(`${API_URL}/users/anasone@gmail.com`);
      expect(response.data).to.be.an("object");
      expect(response.status).to.be.equal(200);
      expect(response.data).to.have.property("age");
      expect(response.data).to.have.property("name");
      expect(response.data.email).to.be.equal("anasone@gmail.com");
    });
  });

  describe("POST a new User object endpoint /users/new", () => {
    const payload = {
      name: "Anas",
      email: "anasone@gmail.com",
      age: 1,
    };

    it("should return an object representing the User and has a field '_id'", async () => {
      const response = await axios.post(`${API_URL}/users/new`, payload);

      expect(response.status).to.be.equal(201);
      expect(response.data).to.be.an("object");
      expect(response.data).to.haveOwnProperty("_id");
    });
  });

  describe("PUT update a User data endpoint /users/:email", () => {
    const payload = {
      //email: "kennies0@gmail.com",
      age: 20,
    };

    it("should return a number which represent the count of affected records", async () => {
      const response = await axios.put(
        `${API_URL}/users/kennie@gmail.com`,
        payload
      );

      expect(response.status).to.be.equal(200);
      expect(response.data)
        .to.be.an("object")
        .to.have.property("message")
        .to.equal("User records has been successfully updated");
    });
  });

  describe("DELETE a User data endpoint /users/:email", () => {
    it("should return a number which represent the count of affected records", async () => {
      const response = await axios.delete(`${API_URL}/users/${user.email}`);

      expect(response.status).to.be.equal(200);
      expect(response.data)
        .to.be.an("object")
        .to.have.property("message")
        .to.equal("User records have been successfully removed");
    });
  });
});

// describe("Check equality of two numbers", () => {
//   it("Numbers should match", () => {
//     let first = 10;
//     let second = 10;

//     expect(first).to.be.equal(second);
//   });

//   it("Numbers should not match", () => {
//     let first = 10;
//     let second = 100;

//     expect(first).not.be.equal(second);
//   });
// });
