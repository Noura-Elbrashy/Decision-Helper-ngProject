// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// interface Evaluation {
//   [option: string]: {
//     [factor: string]: number;
//   };
// }

// interface Scores {
//   [option: string]: number;
// }

// @Component({
//   selector: 'app-decision-helper',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './decision-helper.component.html',
//   styleUrls: ['./decision-helper.component.css']
// })
// export class DecisionHelperComponent {
//   options: string[] = [];
//   factors: string[] = [];
//   evaluations: Evaluation = {};
//   currentStep: number = 1;

//   optionInput: string = '';
//   factorInput: string = '';

//   // Results
//   winner: string = '';
//   scores: Scores = {};
//   winnerPercentage: number = 0;

//   addOption(): void {
//     const value = this.optionInput.trim();

//     if (value && !this.options.includes(value)) {
//       this.options.push(value);
//       this.optionInput = '';
//     }
//   }

//   removeOption(index: number): void {
//     this.options.splice(index, 1);
//   }

//   addFactor(): void {
//     const value = this.factorInput.trim();

//     if (value && !this.factors.includes(value)) {
//       this.factors.push(value);
//       this.factorInput = '';
//     }
//   }

//   removeFactor(index: number): void {
//     this.factors.splice(index, 1);
//   }

//   goToStep2(): void {
//     if (this.options.length < 2) {
//       alert('At least two options must be added!');
//       return;
//     }

//     this.currentStep = 2;
//   }

//   goToStep3(): void {
//     if (this.factors.length < 2) {
//       alert('At least two options must be added!');
//       return;
//     }

//     this.currentStep = 3;
//     this.initializeEvaluations();
//   }

//   initializeEvaluations(): void {
//     this.options.forEach(option => {
//       if (!this.evaluations[option]) {
//         this.evaluations[option] = {};
//       }
//       this.factors.forEach(factor => {
//         if (!this.evaluations[option][factor]) {
//           this.evaluations[option][factor] = 5;
//         }
//       });
//     });
//   }

//   updateRating(option: string, factor: string, value: number): void {
//     if (!this.evaluations[option]) {
//       this.evaluations[option] = {};
//     }
//     this.evaluations[option][factor] = value;
//   }

//   calculateResults(): void {
//     this.scores = {};

//     this.options.forEach(option => {
//       this.scores[option] = 0;
//       this.factors.forEach(factor => {
//         if (this.evaluations[option] && this.evaluations[option][factor]) {
//           this.scores[option] += this.evaluations[option][factor];
//         }
//       });
//     });

//     this.winner = Object.keys(this.scores).reduce((a, b) =>
//       this.scores[a] > this.scores[b] ? a : b
//     );

//     const maxScore = Math.max(...Object.values(this.scores));
//     this.winnerPercentage = Number(((this.scores[this.winner] / maxScore) * 100).toFixed(1));

//     this.currentStep = 4;
//   }

//   getProgressPercentage(): number {
//     return (this.currentStep / 4) * 100;
//   }

//   isStepActive(step: number): boolean {
//     return step <= this.currentStep;
//   }

//   getSortedScores(): [string, number][] {
//     return Object.entries(this.scores)
//       .sort(([,a], [,b]) => b - a);
//   }

//   getMaxPossibleScore(): number {
//     return this.factors.length * 10;
//   }

//   resetApp(): void {
//     this.options = [];
//     this.factors = [];
//     this.evaluations = {};
//     this.currentStep = 1;
//     this.optionInput = '';
//     this.factorInput = '';
//     this.winner = '';
//     this.scores = {};
//     this.winnerPercentage = 0;
//   }

//   onEnterKeyOption(event: KeyboardEvent): void {
//     if (event.key === 'Enter') {
//       this.addOption();
//     }
//   }

//   onEnterKeyFactor(event: KeyboardEvent): void {
//     if (event.key === 'Enter') {
//       this.addFactor();
//     }
//   }
// }
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Evaluation {
  [option: string]: {
    [factor: string]: number;
  };
}

interface Scores {
  [option: string]: number;
}

interface Translations {
  [key: string]: {
    en: string;
    ar: string;
  };
}

@Component({
  selector: 'app-decision-helper',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './decision-helper.component.html',
  styleUrls: ['./decision-helper.component.css']
})
export class DecisionHelperComponent {
  options: string[] = [];
  factors: string[] = [];
  evaluations: Evaluation = {};
  currentStep: number = 1;

  optionInput: string = '';
  factorInput: string = '';

  // Results
  winner: string = '';
  scores: Scores = {};
  winnerPercentage: number = 0;

  // Language support
  currentLanguage: 'en' | 'ar' = 'en';

  // Translations
  translations: Translations = {
    title: {
      en: 'Decision Helper',
      ar: 'مساعد القرارات'
    },
    subtitle: {
      en: 'Let us help you make the best decision in a logical and informed way.',
      ar: 'دعنا نساعدك في اتخاذ أفضل قرار بطريقة منطقية ومدروسة.'
    },
    addOptions: {
      en: 'Add options',
      ar: 'إضافة الخيارات'
    },
    identifyFactors: {
      en: 'Identify factors',
      ar: 'تحديد العوامل'
    },
    evaluation: {
      en: 'Evaluation',
      ar: 'التقييم'
    },
    results: {
      en: 'Results',
      ar: 'النتائج'
    },
    addYourOptions: {
      en: 'Add your available options',
      ar: 'أضف الخيارات المتاحة لديك'
    },
    writeOption: {
      en: 'Write the option (eg: buy a laptop, travel, learn a new language)',
      ar: 'اكتب الخيار (مثل: شراء لابتوب، السفر، تعلم لغة جديدة)'
    },
    optionPlaceholder: {
      en: 'Write your choice here...',
      ar: 'اكتب خيارك هنا...'
    },
    addOption: {
      en: 'Add option',
      ar: 'إضافة خيار'
    },
    nextIdentifyingFactors: {
      en: 'Next: Identifying factors',
      ar: 'التالي: تحديد العوامل'
    },
    identifyImportantFactors: {
      en: 'Identify the factors that are important in your decision.',
      ar: 'حدد العوامل المهمة في قرارك.'
    },
    addFactor: {
      en: 'Add a factor (e.g., cost, time, enjoyment, benefit)',
      ar: 'أضف عامل (مثل: التكلفة، الوقت، المتعة، الفائدة)'
    },
    factorPlaceholder: {
      en: 'Such as: cost, time, quality...',
      ar: 'مثل: التكلفة، الوقت، الجودة...'
    },
    addFactorBtn: {
      en: 'Add a factor',
      ar: 'إضافة عامل'
    },
    nextStartEvaluation: {
      en: 'Next: Start Evaluation',
      ar: 'التالي: بدء التقييم'
    },
    rateEachOption: {
      en: 'Rate each option on each factor (from 1 to 10)',
      ar: 'قيم كل خيار لكل عامل (من 1 إلى 10)'
    },
    calculateResults: {
      en: 'Calculate the results',
      ar: 'حساب النتائج'
    },
    bestOption: {
      en: 'The best option:',
      ar: 'أفضل خيار:'
    },
    pointsFrom: {
      en: 'Points from',
      ar: 'نقطة من'
    },
    newDecision: {
      en: 'New Decision',
      ar: 'قرار جديد'
    },
    atLeastTwoOptions: {
      en: 'At least two options must be added!',
      ar: 'يجب إضافة خيارين على الأقل!'
    },
    atLeastTwoFactors: {
      en: 'At least two factors must be added!',
      ar: 'يجب إضافة عاملين على الأقل!'
    }
  };

  // Get translation method
  getText(key: string): string {
    return this.translations[key]?.[this.currentLanguage] || key;
  }

  // Toggle language
  toggleLanguage(): void {
    this.currentLanguage = this.currentLanguage === 'en' ? 'ar' : 'en';
    // Update document direction
    document.documentElement.dir = this.currentLanguage === 'ar' ? 'rtl' : 'ltr';
  }

  addOption(): void {
    const value = this.optionInput.trim();

    if (value && !this.options.includes(value)) {
      this.options.push(value);
      this.optionInput = '';
    }
  }

  removeOption(index: number): void {
    this.options.splice(index, 1);
  }

  addFactor(): void {
    const value = this.factorInput.trim();

    if (value && !this.factors.includes(value)) {
      this.factors.push(value);
      this.factorInput = '';
    }
  }

  removeFactor(index: number): void {
    this.factors.splice(index, 1);
  }

  goToStep2(): void {
    if (this.options.length < 2) {
      alert(this.getText('atLeastTwoOptions'));
      return;
    }

    this.currentStep = 2;
  }

  goToStep3(): void {
    if (this.factors.length < 2) {
      alert(this.getText('atLeastTwoFactors'));
      return;
    }

    this.currentStep = 3;
    this.initializeEvaluations();
  }

  initializeEvaluations(): void {
    this.options.forEach(option => {
      if (!this.evaluations[option]) {
        this.evaluations[option] = {};
      }
      this.factors.forEach(factor => {
        if (!this.evaluations[option][factor]) {
          this.evaluations[option][factor] = 5;
        }
      });
    });
  }

  updateRating(option: string, factor: string, value: number): void {
    if (!this.evaluations[option]) {
      this.evaluations[option] = {};
    }
    this.evaluations[option][factor] = value;
  }

  calculateResults(): void {
    this.scores = {};

    this.options.forEach(option => {
      this.scores[option] = 0;
      this.factors.forEach(factor => {
        if (this.evaluations[option] && this.evaluations[option][factor]) {
          this.scores[option] += this.evaluations[option][factor];
        }
      });
    });

    this.winner = Object.keys(this.scores).reduce((a, b) =>
      this.scores[a] > this.scores[b] ? a : b
    );

    const maxScore = Math.max(...Object.values(this.scores));
    this.winnerPercentage = Number(((this.scores[this.winner] / maxScore) * 100).toFixed(1));

    this.currentStep = 4;
  }

  getProgressPercentage(): number {
    return (this.currentStep / 4) * 100;
  }

  isStepActive(step: number): boolean {
    return step <= this.currentStep;
  }

  getSortedScores(): [string, number][] {
    return Object.entries(this.scores)
      .sort(([,a], [,b]) => b - a);
  }

  getMaxPossibleScore(): number {
    return this.factors.length * 10;
  }

  resetApp(): void {
    this.options = [];
    this.factors = [];
    this.evaluations = {};
    this.currentStep = 1;
    this.optionInput = '';
    this.factorInput = '';
    this.winner = '';
    this.scores = {};
    this.winnerPercentage = 0;
  }

  onEnterKeyOption(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.addOption();
    }
  }

  onEnterKeyFactor(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.addFactor();
    }
  }
}
