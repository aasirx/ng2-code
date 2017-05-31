import { Pipe, PipeTransform } from '@angular/core';
import { siteType } from './site-types';

@Pipe({
  name: 'searchSiteFilter'
})
export class MultiSelectSearchSiteFilter implements PipeTransform {
  transform(options: Array<siteType>, args: string): Array<siteType> {
    const matchPredicate = (option: siteType) => option.sitename.toLowerCase().indexOf((args || '').toLowerCase()) > -1;
    return options.filter((option: siteType) => {
      let str = matchPredicate(option)
      return str;
    });
  }
}
