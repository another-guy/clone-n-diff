import { Differ } from '../src/differ';

describe('Differ', () => {
    var sut: Differ = null;

    beforeEach(() => {
        sut = new Differ();
    });

    describe('for simple object', () => {
        var simpleObject1: SimpleObject;
        var simpleObject2: SimpleObject;
        beforeEach(() => {
            simpleObject1 = createSimpleObjects();
            simpleObject2 = createSimpleObjects();
        });

        it('returns equal to itself', () => {
            // Act
            var areEqual = sut.areObjectsEqual(simpleObject1, simpleObject1);
            // Assert
            expect(areEqual).toBeTruthy();
        });

        it('returns not equal to null', () => {
            // Act
            var areEqual = sut.areObjectsEqual(simpleObject1, null);
            // Assert
            expect(areEqual).toBeFalsy();
        });

        it('returns not equal to undefined', () => {
            // Act
            var areEqual = sut.areObjectsEqual(simpleObject1, undefined);
            // Assert
            expect(areEqual).toBeFalsy();
        });

        it('returns null is not equal to object', () => {
            // Act
            var areEqual = sut.areObjectsEqual(simpleObject1, null);
            // Assert
            expect(areEqual).toBeFalsy();
        });

        it('returns undefined is not equal to object', () => {
            // Act
            var areEqual = sut.areObjectsEqual(simpleObject1, undefined);
            // Assert
            expect(areEqual).toBeFalsy();
        });

        it('returns equal to another simple object', () => {
            // Act
            var areEqual = sut.areObjectsEqual(simpleObject1, simpleObject2);
            // Assert
            expect(areEqual).toBeTruthy();
        });

        it('returns not equal to another object if their keys dont match', () => {
            simpleObject2 = <SimpleObject>{
                string: 'TestString',
                boolean: true
            };
            // Act
            var areEqual = sut.areObjectsEqual(simpleObject1, simpleObject2);
            // Assert
            expect(areEqual).toBeFalsy();
        });

        it('returns not equal to another object if their keys are not equal', () => {
            simpleObject2.string = 'Changed!';
            // Act
            var areEqual = sut.areObjectsEqual(simpleObject1, simpleObject2);
            // Assert
            expect(areEqual).toBeFalsy();
        });
    });

    describe('for complex object', () => {
        var complexObject1: ComplexObject;
        var complexObject2: ComplexObject;
        beforeEach(() => {
            complexObject1 = createComplexObject();
            complexObject2 = createComplexObject();
        });

        it('returns equal to itself', () => {
            // Act
            var areEqual = sut.areObjectsEqual(complexObject1, complexObject1);
            // Assert
            expect(areEqual).toBeTruthy();
        });

        it('returns equal to another complex object', () => {
            // Act
            var areEqual = sut.areObjectsEqual(complexObject1, complexObject2);
            // Assert
            expect(areEqual).toBeTruthy();
        });
        
        it('returns not equal to another object if their keys dont match on level 1', () => {
            complexObject2 = <ComplexObject>{
                number: -42
            };
            // Act
            var areEqual = sut.areObjectsEqual(complexObject1, complexObject2);
            // Assert
            expect(areEqual).toBeFalsy();
        });

        it('returns not equal to another object if their keys dont match on level 2', () => {
            complexObject2 = <ComplexObject>{
                number: 2,
                simpleObject: <SimpleObject>{
                    boolean: true
                }
            };
            // Act
            var areEqual = sut.areObjectsEqual(complexObject1, complexObject2);
            // Assert
            expect(areEqual).toBeFalsy();
        });

        it('returns not equal to another object if their keys are not equal on level 1', () => {
            complexObject2.number += 100;
            // Act
            var areEqual = sut.areObjectsEqual(complexObject1, complexObject2);
            // Assert
            expect(areEqual).toBeFalsy();
        });

        it('returns not equal to another object if their keys are not equal on level 2', () => {
            complexObject2.simpleObject.number += 100;
            // Act
            var areEqual = sut.areObjectsEqual(complexObject1, complexObject2);
            // Assert
            expect(areEqual).toBeFalsy();
        });
    });

    describe('for a simple object with array', () => {
        var objectWithArray1: SimpleObjectWithNumericArray;
        var objectWithArray2: SimpleObjectWithNumericArray;
        beforeEach(() => {
            objectWithArray1 = createSimpleObjectWithNumericArray();
            objectWithArray2 = createSimpleObjectWithNumericArray();
        });

        it('returns equal to itself', () => {
            // Act
            var areEqual = sut.areObjectsEqual(objectWithArray1, objectWithArray1);
            // Assert
            expect(areEqual).toBeTruthy();
        });

        it('returns equal to another simple object with array', () => {
            // Act
            var areEqual = sut.areObjectsEqual(objectWithArray1, objectWithArray2);
            // Assert
            expect(areEqual).toBeTruthy();
        });

        it('returns not equal to another simple object without array', () => {
            objectWithArray2 = <SimpleObjectWithNumericArray>{
            };
            // Act
            var areEqual = sut.areObjectsEqual(objectWithArray1, objectWithArray2);
            // Assert
            expect(areEqual).toBeFalsy();
        });

        it('returns not equal to another simple object with different array', () => {
            objectWithArray2.array.push(42);
            // Act
            var areEqual = sut.areObjectsEqual(objectWithArray1, objectWithArray2);
            // Assert
            expect(areEqual).toBeFalsy();
        });
    });

    describe('for a simple object with array', () => {
        var complexObjectWithArray1: ComplexObjectWithNumericArray;
        var complexObjectWithArray2: ComplexObjectWithNumericArray;
        beforeEach(() => {
            complexObjectWithArray1 = createComplexObjectWithNumericArray();
            complexObjectWithArray2 = createComplexObjectWithNumericArray();
        });

        it('returns equal to itself', () => {
            // Act
            var areEqual = sut.areObjectsEqual(complexObjectWithArray1, complexObjectWithArray1);
            // Assert
            expect(areEqual).toBeTruthy();
        });

        it('returns equal to another simple object with array', () => {
            // Act
            var areEqual = sut.areObjectsEqual(complexObjectWithArray1, complexObjectWithArray2);
            // Assert
            expect(areEqual).toBeTruthy();
        });

        it('returns not equal to another simple object without array', () => {
            complexObjectWithArray2 = <ComplexObjectWithNumericArray>{
                number: 42,
                simpleObject: <SimpleObjectWithNumericArray>{
                }
            };
            // Act
            var areEqual = sut.areObjectsEqual(complexObjectWithArray1, complexObjectWithArray2);
            // Assert
            expect(areEqual).toBeFalsy();
        });

        it('returns not equal to another simple object with different array', () => {
            complexObjectWithArray2 = <ComplexObjectWithNumericArray>{
                number: 42,
                simpleObject: <SimpleObjectWithNumericArray>{
                    array: [9, 10, 11]
                }
            };
            // Act
            var areEqual = sut.areObjectsEqual(complexObjectWithArray1, complexObjectWithArray2);
            // Assert
            expect(areEqual).toBeFalsy();
        });
    });

    describe('for non object parameters', () => {
        [
            ['alpha', 'alpha'],
            [42, 42],
            [true, true],
            [false, false],
            [[1, 2, 3], [1, 2, 3]]
        ].forEach(pair => {
            var o1 = pair[0];
            var o2 = pair[1];
            it(`returns equal for ${o1} and ${o2}`, () => {
                var areEqual = sut.areObjectsEqual(o1, o2);
                expect(areEqual).toBeTruthy();
            })
        });

        [
            ['alpha', 'omega'],
            [-42, 42],
            [true, false],
            [false, true],
            [[1, 2, 3], [42]],
            [[1, 2, 3], [3, 2, 1]]
        ].forEach(pair => {
            var o1 = pair[0];
            var o2 = pair[1];
            it(`returns not equal for ${o1} and ${o2}`, () => {
                var areEqual = sut.areObjectsEqual(o1, o2);
                expect(areEqual).toBeFalsy();
            })
        });
    });

    describe('level rules', () => {
        it('level = 0, objects same on level = 0', () => {
            var o1 = createComplexObject();
            var o2 = createComplexObject();

            expect(sut.areObjectsEqual(o1, o2, 0)).toBeTruthy();
        });

        it('level = 0, objects different on level = 0', () => {
            var o1 = createComplexObject();
            var o2 = createComplexObject();
            o2.number += 100;

            expect(sut.areObjectsEqual(o1, o2, 0)).toBeFalsy();
        });

        it('level = 1, objects same on level = 1', () => {
            var o1 = createComplexObject();
            var o2 = createComplexObject();

            expect(sut.areObjectsEqual(o1, o2, 1)).toBeTruthy();
        });

        it('level = 1, objects different on level = 1', () => {
            var o1 = createComplexObject();
            var o2 = createComplexObject();
            o2.simpleObject.number += 100;

            expect(sut.areObjectsEqual(o1, o2, 1)).toBeFalsy();
        });

        it('level = not provided, objects same on level = 0', () => {
            var o1 = createComplexObject();
            var o2 = createComplexObject();

            expect(sut.areObjectsEqual(o1, o2)).toBeTruthy();
        });

        it('level = not provided, objects different on level = 0', () => {
            var o1 = createComplexObject();
            var o2 = createComplexObject();
            o2.number += 100;

            expect(sut.areObjectsEqual(o1, o2)).toBeFalsy();
        });

        it('level = not provided, objects different on level = 1', () => {
            var o1 = createComplexObject();
            var o2 = createComplexObject();
            o2.simpleObject.number += 100;

            expect(sut.areObjectsEqual(o1, o2)).toBeFalsy();
        });


        it('special case', () => {
            var o1 = {
                EmployeeId: '001',
                Name: 'Magic User',
                Cars: {
                    Make: 'FavCars',
                    Year: '2016'
                }
            };
            var o2 = {
                EmployeeId: '001',
                Name: 'Magic User',
                Cars: {
                    Make: 'FavCars',
                    Year: '2017'
                }
            };

            expect(sut.areObjectsEqual(o1, o2, 0)).toBeTruthy();
        });
    });

    function createSimpleObjects(): SimpleObject {
        return <SimpleObject>{
            number: 42,
            string: 'TestString',
            boolean: true
        };
    }

    function createComplexObject(): ComplexObject {
        return <ComplexObject>{
            number: 42,
            simpleObject: createSimpleObjects()
        };
    }

    function createSimpleObjectWithNumericArray(): SimpleObjectWithNumericArray {
        return <SimpleObjectWithNumericArray>{
            array: [ 1, 2, 3 ]
        };
    }

    function createComplexObjectWithNumericArray(): ComplexObjectWithNumericArray {
        return <ComplexObjectWithNumericArray>{
            number: 42,
            simpleObject: createSimpleObjectWithNumericArray()
        };
    }
});

class SimpleObject {
    public number: number;
    public string: string;
    public boolean: boolean;
}

class ComplexObject {
    public number: number;
    public simpleObject: SimpleObject;
}

class SimpleObjectWithNumericArray {
    public array: number[];
}

class ComplexObjectWithNumericArray {
    public number: number;
    public simpleObject: SimpleObjectWithNumericArray;
}