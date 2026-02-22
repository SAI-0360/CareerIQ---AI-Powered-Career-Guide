import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = 'AIzaSyDxdYL2yhRP6k_E2ulD1hjNSXPJ6s2ca_E';

async function test() {
    try {
        console.log('Testing with gemini-1.5-flash on v1...');
        const genAI = new GoogleGenerativeAI(apiKey, { apiVersion: 'v1' });
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await model.generateContent('Say "API works!" and nothing else.');
        console.log('SUCCESS:', result.response.text());
    } catch (err) {
        console.error('v1 + gemini-1.5-flash FAILED:', err.status, err.message?.slice(0, 200));
    }

    try {
        console.log('\nTesting with gemini-2.0-flash on v1beta...');
        const genAI2 = new GoogleGenerativeAI(apiKey);
        const model2 = genAI2.getGenerativeModel({ model: 'gemini-2.0-flash' });
        const result2 = await model2.generateContent('Say "API works!" and nothing else.');
        console.log('SUCCESS:', result2.response.text());
    } catch (err) {
        console.error('v1beta + gemini-2.0-flash FAILED:', err.status, err.message?.slice(0, 200));
    }

    try {
        console.log('\nTesting with gemini-pro on v1...');
        const genAI3 = new GoogleGenerativeAI(apiKey, { apiVersion: 'v1' });
        const model3 = genAI3.getGenerativeModel({ model: 'gemini-pro' });
        const result3 = await model3.generateContent('Say "API works!" and nothing else.');
        console.log('SUCCESS:', result3.response.text());
    } catch (err) {
        console.error('v1 + gemini-pro FAILED:', err.status, err.message?.slice(0, 200));
    }
}

test();
