import { DatePipe } from '@angular/common';
import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { Logo } from '@/ui';

import { MaterialIcon } from './shared/material-icon/material-icon';

@Component({
  selector: 'app-root',
  imports: [DatePipe, Logo, MaterialIcon, RouterLink, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
  host: { class: 'flex flex-col min-h-screen' },
})
export class App {
  protected readonly now = signal(new Date());
  protected readonly timestamp = computed(() => this.now().toISOString());

  constructor() {
    const clock = setInterval(() => this.now.set(new Date()), 1000);
    inject(DestroyRef).onDestroy(() => clearInterval(clock));
  }
}
