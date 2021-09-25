import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  currentPath: string

  constructor(private routerPath: Router, private router: ActivatedRoute) {}
  ngOnInit() {
    this.currentPath = this.routerPath.url.split("/")[1]
  }

  goTo(menu: string) {
    const userId = parseInt(this.router.snapshot.params.userId);
    console.log(userId);
    const token = this.router.snapshot.params.userToken;

    switch (menu) {
      case 'logIn':
        this.routerPath.navigate([`/`]);
        break;
      case 'album':
        this.routerPath.navigate([`/albumes/${userId}/${token}`]);
        break;
      case 'cancion':
        this.routerPath.navigate([`/canciones/${userId}/${token}`]);
        break;
      case 'acerca':
        this.routerPath.navigate([`/acerca_de/${userId}/${token}`]);
        break;
      default:
        this.routerPath.navigate([menu]);
    }
  }
}
