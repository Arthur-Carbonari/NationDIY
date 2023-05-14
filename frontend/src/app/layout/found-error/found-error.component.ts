import { Component, OnInit } from '@angular/core';
import { gsap, Linear } from 'gsap';

@Component({
  selector: 'app-found-error',
  templateUrl: './found-error.component.html',
  styleUrls: ['./found-error.component.scss']
})
export class FoundErrorComponent implements OnInit {
// gsap used to allow vanilla JS to run animations in Angular throught the module
  ngOnInit(): void {
    let t1 = gsap.timeline();
    let t2 = gsap.timeline();
    let t3 = gsap.timeline();

    t1.to(".cog1",
      {
        transformOrigin: "50% 50%",
        rotation: "+=360",
        repeat: -1,
        ease: Linear.easeNone,
        duration: 8
      });

    t2.to(".cog2",
      {
        transformOrigin: "50% 50%",
        rotation: "-=360",
        repeat: -1,
        ease: Linear.easeNone,
        duration: 8
      });

    t3.fromTo(".wrong-para",
      {
        opacity: 0
      },
      {
        opacity: 1,
        duration: 1,
        stagger: {
          repeat: -1,
          yoyo: true
        }
      });
  }

}
