import { Component, signal, inject, input, forwardRef } from '@angular/core';
import { TagsTodoService } from '../../services/tags-todo-service';
import { MatIcon } from '@angular/material/icon';
import { TagInfo } from '../../types/tag';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-multi-select-tag-component',
  imports: [MatIcon],
  templateUrl: './multi-select-tag-component.html',
  styleUrl: './multi-select-tag-component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectTagComponent),
      multi: true,
    },
  ],
})
export class MultiSelectTagComponent implements ControlValueAccessor {
  private _onChange: (tags: TagInfo[]) => void = () => {};
  private _onTouched: () => void = () => {};
  private _tagsService = inject(TagsTodoService);

  isOpen = signal(false);
  selectedTags = signal<TagInfo[]>([]);

  tagsData = this._tagsService.tags.value;

  constructor() {}

  writeValue(obj: TagInfo[]): void {
    this.selectedTags.set(obj);
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  onToggleShowOptions() {
    this.isOpen.update((prev) => !prev);
  }

  onRemoveSelectedTag(event: MouseEvent, tagId: string) {
    event.stopPropagation();
    this._onTouched();

    this.selectedTags.update((prev) => prev.filter((tag) => tag._id !== tagId));
    this._onChange(this.selectedTags());
  }

  onToggleSelectTag(event: MouseEvent, tag: TagInfo) {
    event.stopPropagation();
    this._onTouched();

    let dataUpdate: TagInfo[];
    const hasExistSelectedTags = this.selectedTags().some(
      (selectedTag) => selectedTag._id === tag._id
    );

    if (hasExistSelectedTags) {
      dataUpdate = this.selectedTags().filter(
        (selectedTag) => selectedTag._id !== tag._id
      );
    } else {
      dataUpdate = [...this.selectedTags(), tag];
    }
    this.selectedTags.set(dataUpdate);
    this._onChange(this.selectedTags());
  }
}
