// Dependencies
import { Pipe, PipeTransform } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Pipe({
  name: 'showErrorPipe',
})
export class showError implements PipeTransform {
  ngOnInit(): void {}
  constructor(private toastr: ToastrService) {}
  transform(error: string): any {
    return this.toastr.error(error, $localize`Error de autenticación`);
  }
}
