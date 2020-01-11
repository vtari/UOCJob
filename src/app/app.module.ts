import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './shared/core.module';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { rootRouterConfig } from './app-routing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FakeBackendService } from './shared/inmemory-db/fake-backend.service';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { SidebarComponent } from './views/shared/sidebar/sidebar.component';
import { NavBarAdminComponent } from './views/shared/navbar-admin/navbar-admin.component';
import { FooterComponent } from './views/shared/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FrontLayoutComponent } from './layouts/front-layout/front-layout.component';
import { NavbarComponent } from './views/shared/navbar/navbar.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FontSizeDirective } from './shared/directives/fontsize.directive';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    NgbModule,
    SharedModule,
    CoreModule,   
    BrowserModule.withServerTransition({ appId: 'serverApp' }), 
    RouterModule.forRoot(rootRouterConfig, {

      preloadingStrategy: PreloadAllModules,
      useHash: false

    }),
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(FakeBackendService, {
      dataEncapsulation: false
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  declarations: [AppComponent, FrontLayoutComponent, AdminLayoutComponent, SidebarComponent, NavbarComponent, NavBarAdminComponent, FooterComponent, FontSizeDirective],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
