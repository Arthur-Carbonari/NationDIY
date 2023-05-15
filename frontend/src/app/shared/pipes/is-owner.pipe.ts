import { Pipe, PipeTransform } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

/**
 * takes a userId parameter of type string and returns a boolean value indicating whether the user with that userId is the current user.

The pipe depends on the AuthenticationService, which is a service that provides authentication-related functionality. The transform method of the pipe compares the userId parameter with the userId property of the current user, obtained from the AuthenticationService.

*/

@Pipe({
  name: 'isOwner'
})
export class IsOwnerPipe implements PipeTransform {

  constructor(private authService: AuthenticationService) {}

  transform(userId: string): boolean {
    return this.authService.userId === userId;
  }

}
