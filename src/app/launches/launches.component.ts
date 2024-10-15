import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { LaunchesGQL } from '../services/spacexGraphql.service';

@Component({
  selector: 'app-launches',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './launches.component.html',
  styleUrls: ['./launches.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LaunchesComponent {
  private launchesService = inject(LaunchesGQL);
  
  launches = toSignal(
    this.launchesService.fetch({limit: 20}).pipe(
      map(res => {
        console.log('Response from API:', res.data.launches); 
        return res.data.launches || [];
      })
    )
  );

  constructor() {}
}
