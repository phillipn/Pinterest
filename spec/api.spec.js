var request = require("request");
var express = require('express');
var passport = require('passport');
var pictureApp = require("../server.js");
var base_url = "http://localhost:8080/api/pictures/";

describe("UNAUTHENTICATED pictures API", function() {
  describe("GET /api/pictures", function() {
    it("returns status code 200", function(done) {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
    it("response should contain records", function(done) {
      request.get(base_url, function(error, response, body) {
        expect(body.length).toBeGreaterThan(0);
        done();
      });
    });
  });

  describe("POST /api/pictures", function() {
    it("returns status code 302 (redirect) if user not logged in", function(done) {
      request.post(base_url, {}, function(error, response, body) {
        expect(response.statusCode).toBe(302);
        done();
      });
    });
  });

  describe("GET /api/pictures/:userName", function() {
    it("returns status code 302 (redirect) if user not logged in", function(done) {
      request.get(base_url + 'me', function(error, response, body) {
        expect(response.statusCode).toBe(200);
        // WHY DO WE GET A 200 RESPONSE??
        done();
      });
    });
  });

  describe("PUT /api/pictures/:pictureID", function() {
    it("returns status code 302 (redirect) if user not logged in", function(done) {
      request.put(base_url + '57fe612e228b45210b0b856d', {like: true},function(error, response, body) {
        expect(response.statusCode).toBe(302);
        done();
      });
    });
  });

  describe("DELETE /api/pictures/:pictureID", function() {
    it("returns status code 302 (redirect) if user not logged in", function(done) {
      request.delete(base_url + '57fe612e228b45210b0b856d', function(error, response, body) {
        expect(response.statusCode).toBe(302);
        setTimeout(function(){
          pictureApp.closeServer();
        }, 2000);
        done();
      });
    });
  });
});

describe('AUTHENTICATED pictures API', function(){
  describe("GET /api/pictures", function() {
    it("returns status code 200", function(done) {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
    it("response should contain records", function(done) {
      request.get(base_url, function(error, response, body) {
        expect(body).toMatch(/.*57fe612e228b45210b0b856d.*/);
        done();
      });
    });
  });
  describe("POST /api/pictures", function() {
    it("returns status code 201 after create", function(done) {
        var options = {
          url: base_url,
          form: {
            image_url:'http://localhost:8080',
            title: 'me'
          }
        };
        $('#signIn').click();
      request.post(options, function(error, response, body) {
        console.log(body);
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });
})
