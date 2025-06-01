import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
<<<<<<< HEAD

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
=======
import { NavBarComponent } from "./navigation/navigation.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
>>>>>>> 44e5a34 (add final)
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Travel-ManageMent';
}
