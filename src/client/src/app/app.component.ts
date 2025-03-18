import { Component } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd} from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs'
import { NavComponent } from './components/nav/nav.component'
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';

  isHomePage: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isHomePage = event.urlAfterRedirects === '/';
    });
  }
}
