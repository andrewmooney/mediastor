/*eslint-disable*/

const mocha = require('mocha'),
    chai = require('chai'),
    chaiHttp = require('chai-http'),
    assert = require('assert'),
    expect = chai.expect,
    server = require('../app'),
    mongoose = require('mongoose'),
    Video = require('../models/video');

chai.use(chaiHttp);

beforeEach((done) => {
    Video.remove({ name: "Test Video" }, (err) => {
        if (err) throw err;
    });
    Video.remove({ name: "Test Video Updated" }, (err) => {
        if (err) throw err;
        done();
    });
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
        });
    });
});

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
 * PUT request.
 * Update video.
 */
describe('PATCH video', () => {
    it('Should update video metadata', (done) => {
        let data = {
            "type": "video",
            "name": "Test Video",
            "description": "Testing patch",
            "createdAt": ""
        }
        data.createdAt = new Date();

        let data2 = {
            "type": "video",
            "name": "Test Video Updated",
            "description": "Testing patch",
            "createdAt": ""
        }
        data2.createdAt = new Date();

        const video = new Video(data);
        video.save((err, video) => {
            chai.request(server)
                .patch('/videos/' + video.id)
                .send(data2)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.message.ok).to.equal(1);
                    done();
                });
        });
    });
});
/**
 * DELETE request.
 * Delete Video.
 */

describe('DELETE video', () => {
    it('Should delete video metadata', (done) => {
        let data = {
            "type": "video",
            "name": "Test Video",
            "description": "Testing patch",
            "createdAt": ""
        }
        data.createdAt = new Date();

        const video = new Video(data);
        video.save((err, video) => {
            chai.request(server)
                .delete('/videos/' + video.id)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.message).to.equal("Video removed from database");
                    done();
                });
        });
    });
});