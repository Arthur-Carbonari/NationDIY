import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Directive({
  selector: '[appIsOwner]'
})

/**
 *  The purpose of this directive is to show or hide content based on whether the current user is the owner of the content or not.

The directive has an input parameter named appIsOwner which is used to pass the ID of the owner to the directive. The TemplateRef and ViewContainerRef are injected into the constructor, and AuthenticationService is also injected for checking the current user ID. 
 */ 
export class IsOwnerDirective implements OnInit {
  @Input('appIsOwner') id!: string;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {    
    const currentUserId = this.authService.userId;
    if (currentUserId && currentUserId === this.id) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }
}
