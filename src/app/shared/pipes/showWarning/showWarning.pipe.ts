// Dependencies
import { Pipe, PipeTransform } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Pipe({
  name: 'showWarningPipe',
})
export class showWarning implements PipeTransform {
  ngOnInit(): void {}
  constructor(private toastr: ToastrService) {}
  transform(warning: string): any {
    return this.toastr.warning(warning, $localize`Error de autenticación`);
  }
}
