import { Product } from './product.model';

export type ComponentSlot =
  | 'cpu'
  | 'mainboard'
  | 'ram'
  | 'gpu'
  | 'storage'
  | 'psu'
  | 'case'
  | 'cooler';

export type ComponentSelection = Partial<Record<ComponentSlot, Product>>;

export interface CompatibilityIssue {
  slots: ComponentSlot[];
  messageKey:
    | 'configurator.issue.socketMismatch'
    | 'configurator.issue.ramMismatch'
    | 'configurator.issue.formFactorMismatch'
    | 'configurator.issue.coolerSocketMismatch'
    | 'configurator.issue.coolerHeightExceeded'
    | 'configurator.issue.gpuLengthExceeded'
    | 'configurator.issue.psuInsufficient';
}

export interface CompatibilityResult {
  missingSlots: ComponentSlot[];
  issues: CompatibilityIssue[];
  isComplete: boolean;
  isValid: boolean;
}
