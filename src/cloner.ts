export class Cloner {
    
    public deepCopy<T>(sourceObject: T): T {
        if (sourceObject === null) return null;

        if (this.isDate(sourceObject)) return this.copyDate(sourceObject);
        if (this.isInstanceOfPrimitiveType(sourceObject)) return sourceObject;

        return this.recursiveFieldwiseCopy(sourceObject);
    }

    private isDate(object: any): boolean {
        return object instanceof Date;
    }

    private isInstanceOfPrimitiveType(object: any): boolean {
        return typeof object !== 'object';
    }

    private copyDate(object: any): any {
        return new Date(<Date>object);
    }

    private recursiveFieldwiseCopy<T>(sourceObject: T): T {
        var clonedObject = sourceObject.constructor();
        for (var key in sourceObject)
            if (sourceObject.hasOwnProperty(key))
                clonedObject[key] = this.deepCopy(sourceObject[key]);
        return <T>clonedObject;
    }
}