import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roleDisplayName'
})
export class RoleDisplayNamePipe implements PipeTransform {

  transform(role: string): string {
    return role.replace('ROLE_', '');
  }

}
