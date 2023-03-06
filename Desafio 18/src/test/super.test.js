import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import { config } from '../config/config.js'
import { app } from '../../index.js';

before((done) => {
    mongoose.connect(config.DATABASE.mongo.dburl, { dbName: config.DATABASE.mongo.dbName, useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Connected with MongoDB.');
            done();
        })
        .catch((error) => {
            console.log('Error to connect with MongoDB:', error);
            done(error);
        });
});

after((done) => {
    mongoose.connection.close()
        .then(() => {
            console.log('Disconected MongoDB.');
            done();
        })
        .catch((error) => {
            console.log('Error to disconect MongoDB:', error);
            done(error);
        });
});


describe('Test de API de productos', () => {
    let id = '63f133be06809230a35a2afa'


    it('Debe devolver una lista de productos', async () => {
        const res = await request(app).get('/products');
        expect(res.statusCode).to.equal(200);

    });

    it('Debe crear un nuevo producto', async () => {
        const productExample = {
            title: 'super test',
            description: 'test con super test',
            code: 1111,
            price: 130000,
            thumbnail: 'https://images.fravega.com/f300/d7ca24bf5639a7db78c31aa9fa963be8.jpg.webp',
            stock: 10
        }

        const res = await request(app)
            .post('/products/create')
            .send(productExample)
        expect(res.statusCode).to.equal(302);
    });

    it('Debe devolver un producto existente', async () => {
        const res = await request(app).get(`/products/${id}`);
        expect(res.statusCode).to.equal(200);
    });

    it('Debe eliminar un producto existente', async () => {
        const res = await request(app).delete(`/products/${id}`);
        expect(res.statusCode).to.equal(200);
    });
});