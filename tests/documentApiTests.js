const mocha = require('mocha'),
    chai = require('chai'),
    chaiHttp = require('chai-http'),
    assert = require('assert'),
    expect = chai.expect,
    server = require('../app'),
    mongoose = require('mongoose'),
    Doc = require('../models/document');

chai.use(chaiHttp);

beforeEach((done) => {
    Doc.remove({ name: "Test Doc" }, (err) => {
        if (err) throw err;
    });
    Doc.remove({ name: "Test Doc Updated" }, (err) => {
        if (err) throw err;
        done();
    });
});


/**
 * Get request.
 * Returns all documents.
 */
describe('/GET documents', () => {
    it('Should get all documents', (done) => {
        chai.request(server)
            .get('/documents')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('array');
                done();
            });
    });
});

/**
 * Get request.
 * Returns document based on ID.
 */
describe('/GET documents', () => {
    it('Should get document based on id', (done) => {
        let data = {
            "type": "document",
            "name": "Test Doc",
            "description": "Testing post",
            "createdAt": ""
        }
        data.createdAt = new Date();
        const document = new Doc(data);
        document.save((err, document) => {
            if (err) throw err;
            chai.request(server)
                .get('/documents/' + document.id)
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
 * New document.
 */
describe('POST documents', () => {
    it('Should add new document metadata', (done) => {
        let data = {
            "type": "document",
            "name": "Test Doc",
            "description": "Testing post",
            "createdAt": ""
        }
        data.createdAt = new Date();
        chai.request(server)
            .post('/documents')
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
 * Update document.
 */
describe('PATCH document', () => {
    it('Should update document metadata', (done) => {
        let data = {
            "type": "document",
            "name": "Test Doc",
            "description": "Testing patch",
            "createdAt": ""
        }
        data.createdAt = new Date();

        let data2 = {
            "type": "document",
            "name": "Test Doc Updated",
            "description": "Testing patch",
            "createdAt": ""
        }
        data2.createdAt = new Date();

        const document = new Doc(data);
        document.save((err, document) => {
            chai.request(server)
                .patch('/documents/' + document.id)
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
 * Delete Doc.
 */

describe('DELETE document', () => {
    it('Should delete document metadata', (done) => {
        let data = {
            "type": "document",
            "name": "Test Doc",
            "description": "Testing patch",
            "createdAt": ""
        }
        data.createdAt = new Date();

        const document = new Doc(data);
        document.save((err, document) => {
            chai.request(server)
                .delete('/documents/' + document.id)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.message).to.equal("Document removed from database");
                    done();
                });
        });
    });
});