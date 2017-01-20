export class Differ {

    public areObjectsEqual<T>(object1: T, object2: T, numberOfLevelsToCompare: number = -1): boolean {
        var remainingLevelsToCompare = (numberOfLevelsToCompare >= 0) ? numberOfLevelsToCompare + 1 : Number.MAX_VALUE;
        return this.areObjectsEqualImpl(object1, object2, remainingLevelsToCompare);
    }

    public areObjectsEqualImpl<T>(object1: T, object2: T, remainingLevelsToCompare: number): boolean {
        if (this.isInstanceOfPrimitiveType(object1))
            return this.referencesEqual(object1, object2);

        if (this.referencesEqual(object1, object2)) return true;

        if (this.objectsHaveSameFieldSets(object1, object2) === false) return false;
        
        if (this.objectHaveEqualValues(object1, object2, remainingLevelsToCompare) === false) return false;

        return true;
    }

    private isInstanceOfPrimitiveType(object: any): boolean {
        return typeof object !== 'object';
    }

    private referencesEqual<T>(object1: T, object2: T): boolean {
        return object1 === object2;
    }
    
    private objectsHaveSameFieldSets<T>(object1: T, object2: T): boolean {
        var object1keys = this.getObjectKeys(object1);
        var object2keys = this.getObjectKeys(object2);

        if (object1keys.length !== object2keys.length) return false;

        for (var keyIndexInObject1 = 0; keyIndexInObject1 < object1keys.length; keyIndexInObject1++) {
            var keyFromObject1 = object1keys[keyIndexInObject1];

            var keyIndexInObject2 = object2keys.indexOf(keyFromObject1);
            if (keyIndexInObject2 >= 0)
                object2keys.splice(keyIndexInObject2, 1);
            else
                return false;
        };

        return true;
    }

    private objectHaveEqualValues<T>(objectT1: T, objectT2: T, remainingLevelsToCompare: number): boolean {
        var o1 = <any>objectT1;
        var o2 = <any>objectT2;

        if (remainingLevelsToCompare <= 0) {
            return true;
        }
        
        var object1keys = this.getObjectKeys(o1);

        for (var index = 0; index < object1keys.length; index++) {
            var key = object1keys[index];

            var valueFrom1 = o1[key];
            var valueFrom2 = o2[key];
            if (this.areObjectsEqualImpl(valueFrom1, valueFrom2, remainingLevelsToCompare - 1) === false)
                return false;
        }
        
        return true;
    }
    
    private getObjectKeys(object: any): string[] {
        if (object === null || object === undefined)
            return [];
        return Object.keys(object);
    }
}