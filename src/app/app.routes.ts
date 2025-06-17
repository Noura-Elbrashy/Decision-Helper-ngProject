import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { DecisionHelperComponent } from './decision-helper/decision-helper.component';
import { SpinnerComponent } from './spinner/spinner.component';

export const routes: Routes = [

      { path: '', component: HomeComponent, },
  { path: 'chatbot', component: ChatbotComponent },
  { path: 'manual', component: DecisionHelperComponent },
  { path: 'spinner', component: SpinnerComponent },
  { path: '', redirectTo: '/decision-helper', pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];
bootstrapApplication(HomeComponent, {
  providers: [
    provideRouter(routes)
  ]
});

