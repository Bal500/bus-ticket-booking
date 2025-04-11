import { Component, Input } from '@angular/core';
import { Route } from '../../models/route';

@Component({
    selector: 'app-search-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {
    @Input() results: Route[] = [];
}
