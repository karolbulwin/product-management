import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarComponent } from './star/star.component';
import { MaterialModule } from './material/material.module';
import { ConvertToSpacesPipe } from './convert-to-spaces.pipe';

@NgModule({
  declarations: [StarComponent, ConvertToSpacesPipe],
  imports: [CommonModule],
  exports: [CommonModule, StarComponent, MaterialModule, ConvertToSpacesPipe]
})
export class SharedModule {}
