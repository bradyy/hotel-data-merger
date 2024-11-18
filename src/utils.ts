export class Utils {
    static removeWhitespace(str: string) {
        return str.replace(/\s/g, '')
    }

    static parseCoords(coords: any) {
        if (typeof coords === 'string') {
            return parseFloat(coords)
        }

        if (typeof coords === 'number') {
            return coords
        }

        if (coords === null) {
            return null
        }
    }

    static trimString(str: string) {
        return str ? str.trim() : ''
    }

    static splitCamelCase(str: string): string {
        if (!str) return '';

        const result = str
            .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .toLowerCase()
            .trim();

        return result;
    }

    static removeWhitespaceArray(arr: string[]) {
        return arr.map((str) => this.removeWhitespace(str))
    }

    static createUniqueArray(arr1: any[], arr2: any[]): any[] {
        return [...new Set([...arr1, ...arr2])]
    }

    static getLongerString(str1?: string, str2?: string): string {
        if (str1 && str2)
            return str1.length > str2.length ? str1 : str2
        else
            return str1 || str2 || ''
    }
}