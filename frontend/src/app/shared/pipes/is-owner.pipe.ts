import { Pipe, PipeTransform } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Pipe({
  name: 'isOwner'
})
export class IsOwnerPipe implements PipeTransform {

  constructor(private authService: AuthenticationService) {}

  transform(userId: string): boolean {
    return this.authService.userId === userId;
  }

}
