import { Component, OnInit } from '@angular/core';
import { ROUTES, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProfileService } from 'src/app/shared/services/profile.service';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    badge: string;
    badgeClass: string;
    isExternalLink: boolean;
    submenu: RouteInfo[];
}

export const ROUTESDASHBOARD: RouteInfo[] = [
    { path: 'dashboard', title: 'Dashboard', icon: 'fa-dashboard', class: 'has-sub', badge: '2', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false, submenu:[] },
    { path: 'profile', title: 'Datos de perfil', icon: 'fa-user', class: 'has-sub', badge: '2', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false, submenu:[] },
    {path: 'favorites', title: 'Favoritas', icon: 'fa-star', class: 'has-sub', badge: '2', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false, submenu: []},
    {path: 'offers', title: 'Ofertas de trabajo', icon: 'fa-search', class: 'has-sub', badge: '2', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false, submenu: []}



];


@Component({
    selector: 'sidebar-app',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    public role: string;
    public href: string;
    public showSubMenu: boolean;
    public showActive: boolean;
   
    currentUser: any;
    currentUserSubscription: Subscription;

    constructor(private profileService: ProfileService, private router: Router) {
        this.href = "";
        this.showSubMenu = false;
        this.showActive = false;

    }

    ngOnInit() {
        this.href = this.router.url;
        this.menuItems = ROUTESDASHBOARD.filter(menuItem => menuItem);
       

    }

    
}
