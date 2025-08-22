import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DialogCreateTaskState {
  private _isOpen = signal<boolean>(false);

  readonly isOpen = computed(() => this._isOpen());

  public open() {
    this._isOpen.set(true);
  }

  public close() {
    this._isOpen.set(false);
  }

  public toggle() {
    this._isOpen.update((prev) => !prev);
  }

  public isOpenChange(value: boolean) {
    this._isOpen.set(value);
  }
}
