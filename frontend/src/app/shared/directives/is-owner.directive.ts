import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Directive({
  selector: '[appIsOwner]'
})
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
