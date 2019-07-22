import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  {
    path: 'welcome',
    component: WelcomeComponent,
    data: { animation: 'HomePage' }
  },
  {
    path: 'about',
    component: AboutComponent,
    data: { animation: 'AboutPage' }
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: { animation: 'ContactPage' }
  },
  { path: 'pageNotFound', component: PageNotFoundComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
