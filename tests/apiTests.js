const mocha = require('mocha'),
    chai = require('chai'),
    chaiHttp = require('chai-http'),
    assert = require('assert'),
    expect = chai.expect,
    server = require('../app'),
    mongoose = require('mongoose'),
    Video = require('../models/video');

chai.use(chaiHttp);
let vidId = '0';

/**
 * 
 * Post request.
 * New video.
 */
describe('POST videos', () => {
    it('Should add new video metadata', (done) => {
        let data = {
            "type": "video",
            "name": "Test Video",
            "description": "Testing post",
            "createdAt": ""
        }
        data.createdAt = new Date();
        chai.request(server)
            .post('/videos')
            .send(data)
            .end((err, res) => {
                expect(res.status).to.equal(201);
                expect(res.body).to.be.an('object');
                done();
            })
    })
});

/**
 * Get request.
 * Returns all videos.
 */
describe('/GET videos', () => {
    it('Should get all videos', (done) => {
        chai.request(server)
            .get('/videos')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('array');
                done();
            });
    });
});

/**
 * Get request.
 * Returns video based on ID.
 */
describe('/GET videos', () => {
    it('Should get video based on id', (done) => {
        let data = {
            "type": "video",
            "name": "Test Video",
            "description": "Testing post",
            "createdAt": ""
        }
        data.createdAt = new Date();
        const video = new Video(data);
        video.save((err, video) => {
            if (err) throw err;
            chai.request(server)
                .get('/videos/' + video.id)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    done();
                });
        })
    });
});

/**
 * PUT request.
 * Update video.
 */

/**
 * DELETE request.
 * Delete Video.
 */