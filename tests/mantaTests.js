const mocha = require('mocha'),
      chai = require('chai'),
      assert = require('assert'),
      expect = chai.expect;

const fs = require('fs'),
      client = require('../manta/mantaClient'),
      crypto = require('crypto'),
      MemoryStream = require('memorystream'),
      muploader = require('../manta/mantaFileUploader');


describe('Create a client object', () => {
    it('client should be an object', () => {
        expect(client).to.be.an('object');
    });
});

describe('Client should connect to Manta and retrieve information', () => {
    it('client should return info about the stor object', (done) => {
        client.info('~~/stor', {}, (err, info) => {
            expect(info).to.be.an('object');
            expect(info.name).to.equal('stor');
            expect(info.extension).to.equal('directory');
            done();
        });
    });
});

describe('Client should upoad a test file to Manta', () => {
    it('client should upload testvideo.mp4 to server', (done) => {
        muploader('./video/testvideo.mp4', (res) => {
            expect(res).to.equal(true);
            done();
        });
    });
});