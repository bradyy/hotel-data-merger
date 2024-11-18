"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
class Utils {
    static removeWhitespace(str) {
        return str.replace(/\s/g, '');
    }
    static parseCoords(coords) {
        if (typeof coords === 'string') {
            return parseFloat(coords);
        }
        if (typeof coords === 'number') {
            return coords;
        }
        if (coords === null) {
            return null;
        }
    }
    static trimString(str) {
        return str ? str.trim() : '';
    }
    static splitCamelCase(str) {
        // Handle empty/null cases
        if (!str)
            return '';
        // Split camelCase/PascalCase into words
        const result = str
            // Insert space before capitals, keeping consecutive capitals together
            .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
            // Handle remaining capitals
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            // Convert to lowercase and trim extra spaces
            .toLowerCase()
            .trim();
        return result;
    }
    static removeWhitespaceArray(arr) {
        return arr.map((str) => this.removeWhitespace(str));
    }
    static createUniqueArray(arr1, arr2) {
        return [...new Set([...arr1, ...arr2])];
    }
    static getLongerString(str1, str2) {
        if (str1 && str2)
            return str1.length > str2.length ? str1 : str2;
        else
            return str1 || str2 || '';
    }
}
exports.Utils = Utils;
