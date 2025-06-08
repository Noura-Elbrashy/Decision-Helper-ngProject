// import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
// import { Router, NavigationEnd } from '@angular/router';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})



export class HomeComponent {
  constructor(private router: Router) {}

  goToManual() {
    this.router.navigate(['/manual']);
  }
}
