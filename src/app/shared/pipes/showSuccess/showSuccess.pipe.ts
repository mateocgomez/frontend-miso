// Dependencies
import { Pipe, PipeTransform } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Pipe({
  name: 'showSuccessPipe',
})
export class showSuccess implements PipeTransform {
  ngOnInit(): void {}
  constructor(private toastr: ToastrService) {}
  transform(title: string, successMessage?: string): any {
    return this.toastr.success(
      $localize`${title}`,
      successMessage && $localize`${successMessage}`
    );
  }
}