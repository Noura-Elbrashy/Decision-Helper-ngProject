import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent {
  options: string[] = ['', ''];
  result: string | null = null;
  isSpinning = false;

  constructor(private cdr: ChangeDetectorRef) {}

  addOption() {
    this.options = [...this.options, ''];
    this.cdr.detectChanges();
  }

  spinWheel() {
    const validOptions = this.options.filter((opt) => opt.trim() !== '');
    if (validOptions.length < 2) {
      alert('Please enter at least two valid options.');
      return;
    }
    this.isSpinning = true;
    this.result = null;
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * validOptions.length);
      this.result = validOptions[randomIndex];
      this.isSpinning = false;
      this.cdr.detectChanges();
    }, 1500); // Simulate spinning for 1.5 seconds
  }

  removeOption(index: number) {
    if (this.options.length > 2) {
      this.options = [...this.options.slice(0, index), ...this.options.slice(index + 1)];
      this.cdr.detectChanges();
    }
  }

  reset() {
    this.options = ['', ''];
    this.result = null;
    this.isSpinning = false;
    this.cdr.detectChanges();
  }

  trackByIndex(index: number): number {
    return index;
  }
}