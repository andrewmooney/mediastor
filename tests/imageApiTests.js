/*eslint-disable*/

const mocha = require('mocha'),
    chai = require('chai'),
    chaiHttp = require('chai-http'),
    assert = require('assert'),
    expect = chai.expect,
    server = require('../app'),
    mongoose = require('mongoose'),
    Image = require('../models/image');

chai.use(chaiHttp);

beforeEach((done) => {
    Image.remove({ name: "Test Image" }, (err) => {
        if (err) throw err;
    });
    Image.remove({ name: "Test Image Updated" }, (err) => {
        if (err) throw err;
        done();
    });
});


/**
 * Get request.
 * Returns all images.
 */
describe('/GET images', () => {
    it('Should get all images', (done) => {
        chai.request(server)
            .get('/images')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('array');
                done();
            });
    });
});

/**
 * Get request.
 * Returns image based on ID.
 */
describe('/GET images', () => {
    it('Should get image based on id', (done) => {
        let data = {
            "type": "image",
            "name": "Test Image",
            "description": "Testing post",
            "createdAt": ""
        }
        data.createdAt = new Date();
        const image = new Image(data);
        image.save((err, image) => {
            if (err) throw err;
            chai.request(server)
                .get('/images/' + image.id)
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
 * New image.
 */
describe('POST images', () => {
    it('Should add new image metadata', (done) => {
        let data = {
            "type": "image",
            "name": "Test Image",
            "description": "Testing post",
            "createdAt": ""
        }
        data.createdAt = new Date();
        chai.request(server)
            .post('/images')
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
 * Update image.
 */
describe('PATCH image', () => {
    it('Should update image metadata', (done) => {
        let data = {
            "type": "image",
            "name": "Test Image",
            "description": "Testing patch",
            "createdAt": ""
        }
        data.createdAt = new Date();

        let data2 = {
            "type": "image",
            "name": "Test Image Updated",
            "description": "Testing patch",
            "createdAt": ""
        }
        data2.createdAt = new Date();

        const image = new Image(data);
        image.save((err, image) => {
            chai.request(server)
                .patch('/images/' + image.id)
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
 * Delete Image.
 */

describe('DELETE image', () => {
    it('Should delete image metadata', (done) => {
        let data = {
            "type": "image",
            "name": "Test Image",
            "description": "Testing patch",
            "createdAt": ""
        }
        data.createdAt = new Date();

        const image = new Image(data);
        image.save((err, image) => {
            chai.request(server)
                .delete('/images/' + image.id)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.message).to.equal("Image removed from database");
                    done();
                });
        });
    });
});