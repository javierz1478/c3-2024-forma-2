import request from 'supertest'
import { server, app } from '../../../src/index'

describe('Tests historicos', () => {
    
    it ('Test 1: string de largo 2 e igual a ac', async() =>{
        const input = 'ac'
        const input2 = 'AC'
        const responseLowerCase= await request(app.callback()).get('/api/history/'+input)
        const responseUpperCase= await request(app.callback()).get('/api/history/'+input2)
        expect(responseLowerCase.status).toBe(200)
        expect(typeof responseLowerCase.body).toBe('object')
        responseLowerCase.body.forEach(event => {
            expect(Number(event.date)).toBeLessThanOrEqual(0)
        });
        expect(responseUpperCase.status).toBe(200);
        expect(typeof responseUpperCase.body).toBe('object')
        responseUpperCase.body.forEach(event => {
            expect(Number(event.date)).toBeLessThanOrEqual(0)
        });
    })

    it ('Test 2: string de largo 2 e igual a dc', async() =>{
        const input = 'dc'
        const input2 = 'DC'
        const responseLowerCase= await request(app.callback()).get('/api/history/'+input)
        const responseUpperCase= await request(app.callback()).get('/api/history/'+input2)
        expect(responseLowerCase.status).toBe(200);
        expect(typeof responseLowerCase.body).toBe('object')
        responseLowerCase.body.forEach(event => {
            expect(Number(event.date)).toBeGreaterThan(0)
        });
        expect(responseUpperCase.status).toBe(200);
        expect(typeof responseUpperCase.body).toBe('object')
        responseUpperCase.body.forEach(event => {
            expect(Number(event.date)).toBeGreaterThan(0)
        });


        
    })

    it ('Test 3: string de largo 2 con caracteres alfanumericos', async() =>{
        const input = 'd9'
        const input2 = 'D9'
        const responseLowerCase= await request(app.callback()).get('/api/history/'+input)
        const responseUpperCase= await request(app.callback()).get('/api/history/'+input2)
        expect(responseLowerCase.status).toBe(400)
        expect(responseUpperCase.status).toBe(400)
        expect(responseLowerCase.body).toHaveProperty('message')
        expect(responseUpperCase.body).toHaveProperty('message')
        responseLowerCase.body.forEach(event => {
            expect(event.message).toBe('Solo se aceptan caracteres no numéricos')
        });
        responseUpperCase.body.forEach(event => {
            expect(event.message).toBe('Solo se aceptan caracteres no numéricos')
        });

    });


    
    it ('Test 4: string de largo distinto a 2', async() =>{
        const input1 = '123'
        const input2 = 'a'
        const input3 = ''
        const response1= await request(app.callback()).get('/api/history/'+input1)
        const response2= await request(app.callback()).get('/api/history/'+input2)
        const response3= await request(app.callback()).get('/api/history/'+input3)

        expect(response1.status).toBe(400)
        expect(typeof response1.body).toBe('object')
        expect(response1.body).toHaveProperty('message')
        expect(response1.body.message).toBe('El input debe ser ac o dc')

        
        expect(response2.status).toBe(400)
        expect(typeof response2.body).toBe('object')
        expect(response2.body).toHaveProperty('message')
        expect(response2.body.message).toBe('El input debe ser ac o dc')

        
        expect(response3.status).toBe(400)
        expect(typeof response3.body).toBe('object')
        expect(response3.body).toHaveProperty('message')
        expect(response3.body.message).toBe('El input debe ser ac o dc')

    });


});