import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'sortPipe'
})

export class SortPipe implements PipeTransform {

    transform(array: Array<string>, key: string): Array<string> {

        if (key === undefined || key == '' || array === undefined) {
            return array;
        }

        let arr = key.split("-");
        let keyString = arr[0];   // string or column name to sort(name or age or date)
        let sortOrder = arr[1];   // asc or desc order
        let dataType = arr[2];   // asc or desc order
        let byVal = 1;

        array.sort((a: any, b: any) => {

            if (dataType === 'date') {

                let left = Number(new Date(a[keyString]));
                let right = Number(new Date(b[keyString]));

                return (sortOrder === "asc") ? right - left : left - right;
            }
            else if (dataType === 'string') {

                if (this.isNumeric(a[keyString]) || this.isNumeric(b[keyString])) {
                   a[keyString] = String(a[keyString]);
                   b[keyString] = String(b[keyString]);
                }


                if (a[keyString].toLowerCase() < b[keyString].toLowerCase()) {
                    return (sortOrder === "asc") ? -1 * byVal : 1 * byVal;
                } else if (a[keyString] > b[keyString]) {
                    return (sortOrder === "asc") ? 1 * byVal : -1 * byVal;
                } else {
                    return 0;
                }
            }
            else if (dataType === 'number') {
                return (sortOrder === "asc") ? a[keyString] - b[keyString] : b[keyString] - a[keyString];
            }

        });

        return array;

    }

    isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

}