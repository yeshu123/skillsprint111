// import { Component, OnInit } from '@angular/core';
// import { faHome } from '@fortawesome/free-solid-svg-icons';
// import { Router } from '@angular/router';

// import { faUser } from '@fortawesome/free-solid-svg-icons';
// import { faListUl } from '@fortawesome/free-solid-svg-icons';
// import { ApiService } from '../shared/api.service';

// @Component({
//   selector: 'app-associate-header',
//   templateUrl: './associate-header.component.html',
//   styleUrls: ['./associate-header.component.css']
// })
// export class AssociateHeaderComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }




import { Component, OnInit } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faListUl } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-associate-header',
  templateUrl: './associate-header.component.html',
  styleUrls: ['./associate-header.component.css'],
})
export class AssociateHeaderComponent implements OnInit {
  faHome = faHome;
  faUser = faUser;
  faListUl = faListUl;
  collapsed = true;
  name: any;

  constructor(private router: Router, private api: ApiService) {}
  // isResourceOrSmepage() {
  //   const currentRoute = this.router.url;
  //   return currentRoute == '/resource' || currentRoute == '/SME';
  // }

  ngOnInit(): void {
    let name = sessionStorage.getItem('currentUser');
    console.log(name);
    // this.api.getUsers().subscribe({
    //   next: (data: any[]) => {
    //     this.name = data[1].name;
    //   },
    //   error: (error) => {
    //     console.log(error);
    //   },
    // });
  }
}

