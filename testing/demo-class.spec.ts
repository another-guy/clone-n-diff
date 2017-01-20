import { Demo } from '../src/demo-class'

describe('ABC', () =>
    it ('should be ok', () => {
        expect(1).toBe(1);
    })
);

describe(Demo.name, () => {
    it ('should demo smth', () => {
        var demo = new Demo();

        var testValue = demo.testValue;

        expect(testValue).toBe('werwer');
    });
});