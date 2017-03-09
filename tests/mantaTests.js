/*eslint-disable*/

const mocha = require('mocha'),
      chai = require('chai'),
      assert = require('assert'),
      expect = chai.expect;

const fs = require('fs'),
      client = require('../manta/mantaClient'),
      crypto = require('crypto'),
      MemoryStream = require('memorystream'),
      muploader = require('../manta/mantaFileUploader'),
      videoUpload = {
          _id : "abc123",
          filename : "testVideo",
          originalname : "testvideo.mp4" ,
          path : "./tests/video/testvideo.mp4"
      },
      documentUpload = {
          _id : "abc234",
          filename : "testDocument",
          originalname : "testDoc.txt" ,
          path : "./tests/docs/testDoc.txt"
      },
      imageUpload = {
          _id : "abc345",
          filename : "testImage",
          originalname : "testImage.jpg" ,
          path : "./tests/images/testImage.jpg"
      };


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

describe('Client should upoad a video test file to Manta', () => {
    it('client should upload testvideo.mp4 to server', (done) => {
        muploader(videoUpload, (res, uploadPath) => {
            expect(res).to.equal(true);
            expect(uploadPath).to.equal('~~/public/videos/abc123.mp4');
            done();
        });
    });
});

describe('Client should upoad a document test file to Manta', () => {
    it('client should upload testDoc.tst to server', (done) => {
        muploader(documentUpload, (res, uploadPath) => {
            expect(res).to.equal(true);
            expect(uploadPath).to.equal('~~/public/documents/abc234.txt');
            done();
        });
    });
});

describe('Client should upoad a image test file to Manta', () => {
    it('client should upload testImage.jpg to server', (done) => {
        muploader(imageUpload, (res, uploadPath) => {
            expect(res).to.equal(true);
            expect(uploadPath).to.equal('~~/public/images/abc345.jpg');
            done();
        });
    });
});