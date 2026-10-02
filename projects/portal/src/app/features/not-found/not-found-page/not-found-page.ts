import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Button } from '@/ui';

@Component({
  selector: 'app-not-found-page',
  imports: [RouterLink, Button],
  templateUrl: './not-found-page.html',
  host: { class: 'flex flex-1 items-center justify-center px-6 py-16 sm:py-24' },
})
export class NotFoundPage {}
