export class Cloner {
    
    public deepCopy<T>(sourceObject: T): T {
        if (sourceObject === null) return null;

        if (this.isInstanceOfPrimitiveType(sourceObject)) return sourceObject;

        return this.recursiveFieldwiseCopy(sourceObject);
    }

    private isInstanceOfPrimitiveType(object: any): boolean {
        return typeof object !== 'object';
    }

    private recursiveFieldwiseCopy<T>(sourceObject: T): T {
        var clonedObject = sourceObject.constructor();
        for (var key in sourceObject)
            if (sourceObject.hasOwnProperty(key))
                clonedObject[key] = this.deepCopy(sourceObject[key]);
        return <T>clonedObject;
    }
}