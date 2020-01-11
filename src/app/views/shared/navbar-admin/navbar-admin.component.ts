import { Component, OnInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Location} from '@angular/common';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { ROUTESDASHBOARD } from '../sidebar/sidebar.component';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { Store } from '@ngrx/store';
import { AppStore } from 'src/app/shared/states/store.interface';
import { getProfile } from 'src/app/shared/states/user';


@Component({
    selector: 'app-navbar-admin',
    templateUrl: 'navbar-admin.component.html'
})

export class NavBarAdminComponent implements OnInit{
 
    private listTitles: any[];
    location: Location;
    private nativeElement: Node;
    private toggleButton: Element;
    private sidebarVisible: boolean;

    public isCollapsed = true;
    @ViewChild("app-navbar-admin",{static:false}) button;
    user$: Observable<User>;
    

    constructor(location:Location, private renderer : Renderer, private element : ElementRef, private router: Router, private profileService: ProfileService, private store$: Store<AppStore>) {
        this.location = location;
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
        this.user$ = this.store$.select(getProfile);  
       
    }

    ngOnInit(){
        this.listTitles = ROUTESDASHBOARD.filter(listTitle => listTitle);
        var navbar : HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        this.router.events.subscribe((event) => {
          this.sidebarClose();
       });

      
    }
    getTitle(){
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 1 );
      }
      for(var item = 0; item < this.listTitles.length; item++){
          if(this.listTitles[item].path === titlee){
              return this.listTitles[item].title;
          }
      }
      return 'Dashboard';
    }

   
    
    sidebarToggle() {
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
      }
      sidebarOpen() {
          const toggleButton = this.toggleButton;
          const html = document.getElementsByTagName('html')[0];
          const mainPanel =  <HTMLElement>document.getElementsByClassName('main-panel')[0];
          setTimeout(function(){
              toggleButton.classList.add('toggled');
          }, 500);

          html.classList.add('nav-open');
          if (window.innerWidth < 991) {
            mainPanel.style.position = 'fixed';
          }
          this.sidebarVisible = true;
      };
      sidebarClose() {
          const html = document.getElementsByTagName('html')[0];
          const mainPanel =  <HTMLElement>document.getElementsByClassName('main-panel')[0];
          if (window.innerWidth < 991) {
            setTimeout(function(){
              mainPanel.style.position = '';
            }, 500);
          }
          this.toggleButton.classList.remove('toggled');
          this.sidebarVisible = false;
          html.classList.remove('nav-open');
      };
     
      logOut(){            
        this.profileService.logout();
        this.router.navigate(['/']);
      }

}
