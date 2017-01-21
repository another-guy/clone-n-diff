import { Cloner } from '../src/cloner';

describe('Cloner', () => {
    var sut: Cloner = null;

    beforeEach(() => {
        sut = new Cloner();
    });

    describe(`deep copy correct for trivial objects:`, () => {
        [
            null,
            1,
            "some text",
            true,
            false,
            3.14159,
            new Date()
        ].forEach(sourceObject => {
                it(`${sourceObject}`, () => {
                // Act
                var cloned = sut.deepCopy(sourceObject);
                // Assert
                expect(cloned).toEqual(sourceObject);
            });
        });
    });

    describe(`deep copy correct for more complex objects:`, () => {
        [
            [],
            [1, 2, 3],
            {},
            { name: 'Alice' },
            { name: 'Alice', value: [] },
            { name: 'Alice', value: [1, 2, 3] },
            { name: 'Alice', value: {} },
            { name: 'Alice', address: { activity: 'Nowhere Street' } }
        ].forEach(sourceObject => {
            it(`${JSON.stringify(sourceObject)}`, () => {
                // Act
                var cloned = sut.deepCopy(sourceObject);
                // Assert
                expect(cloned).not.toBe(sourceObject);
                expect(cloned).toEqual(sourceObject);
            });
        });
    });
});