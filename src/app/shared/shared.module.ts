import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormatTimeCancionPipePipe } from './pipes/format-time-cancion-pipe.pipe';
import { showError } from './pipes/showError/showError.pipe';
import { showSuccess } from './pipes/showSuccess/showSuccess.pipe';
import { showWarning } from './pipes/showWarning/showWarning.pipe';

@NgModule({
  providers: [DecimalPipe, showError, showSuccess, showWarning],
  declarations: [
    FormatTimeCancionPipePipe,
    showError,
    showSuccess,
    showWarning,
  ],
  imports: [CommonModule],
  exports: [FormatTimeCancionPipePipe, showError, showSuccess, showWarning],
})
export class SharedModule {}
