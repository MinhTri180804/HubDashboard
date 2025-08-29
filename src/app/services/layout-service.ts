import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private _isOpen = signal<boolean>(true);
  public readonly isOpen = computed(() => this._isOpen());

  onToggle() {
    this._isOpen.update((previous) => !previous);
  }
}
