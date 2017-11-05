import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterArray',
    pure: true
})
export class FilterArrayPipe implements PipeTransform {
    transform(items: any[], args: any): any {
        const discarded = ['_id', '__v', 'guid']
        const filter = args.toString();
        const filteredItem = [];
        if (filter !== undefined && filter.length !== null) {
            if (filter.length === 0 || items.length === 0) {
                return items;
            } else {
                if (filter) {
                    items.filter(item => {
                        for (const x in item) {
                            if (item[x].toString().toLocaleLowerCase().indexOf(filter) !== -1 && discarded.indexOf(x)<=-1) {
                                filteredItem.push(item);
                                break;
                            }
                        }
                    });
                    return filteredItem;
                } else {
                    return items;
                }
            }
        }
    }
}
