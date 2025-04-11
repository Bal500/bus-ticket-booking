import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { TicketCardComponent } from './components/ticket-card/ticket-card.component';
import { FormatPricePipe } from './pipes/format-price.pipe';

@NgModule({
    declarations: [
        AppComponent,
        LandingPageComponent,
        SearchResultsComponent,
        TicketCardComponent,
        FormatPricePipe
    ],
    imports: [
        BrowserModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
