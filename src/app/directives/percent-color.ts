import {
  AfterViewInit,
  computed,
  Directive,
  ElementRef,
  inject,
  input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appPercentColor]',
})
export class PercentColor implements AfterViewInit, OnChanges {
  percent = input.required<number>();

  private _hostElement = inject<ElementRef<HTMLElement>>(ElementRef);
  private _renderer2 = inject(Renderer2);
  private _color = computed(() => {
    if (this.percent() >= 0 && this.percent() < 30) return '#ff6060';
    if (this.percent() >= 30 && this.percent() <= 50) return '#ff9f0c';

    return '#3cd2a5';
  });

  constructor() {}

  ngAfterViewInit(): void {
    this._updateProgressBarColor();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['percent']) {
      this._updateProgressBarColor();
    }
  }

  private _updateProgressBarColor() {
    const progressLinear = this._hostElement.nativeElement.querySelector(
      '.mdc-linear-progress__bar-inner'
    );

    this._renderer2.setStyle(progressLinear, 'border-color', this._color());
  }
}
