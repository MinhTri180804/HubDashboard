import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'todoCreatedPipe',
})
export class TodoCreatedPipePipe implements PipeTransform {
  transform(value: number): string {
    const DAY_MS = 24 * 60 * 60 * 1000;
    const now = new Date();
    const createdDate = new Date(value);

    const startOfNow = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    ).getTime();

    const startOfCreatedDate = new Date(
      createdDate.getFullYear(),
      createdDate.getMonth(),
      createdDate.getDate()
    ).getTime();

    const diffDay = Math.floor((startOfNow - startOfCreatedDate) / DAY_MS);

    if (diffDay === 0) return 'Today';
    if (diffDay === 1) return 'Yesterday';
    if (diffDay === 2) return '2 days ago';
    return Intl.DateTimeFormat('vi-VN', {
      dateStyle: 'medium',
    }).format(createdDate);
  }
}
