import { ComponentSelection, ComponentSlot, CompatibilityIssue, CompatibilityResult } from '../models/pc-configuration.model';
import { Product } from '../models/product.model';

export const REQUIRED_SLOTS: ComponentSlot[] = [
  'cpu',
  'mainboard',
  'ram',
  'gpu',
  'storage',
  'psu',
  'case',
  'cooler',
];

// PSU headroom check is intentionally simplified: sum of CPU + GPU TDP plus a
// fixed reserve for the rest of the system, compared against the PSU's rated
// wattage. Real PSU sizing also depends on transient spikes and efficiency
// curves, which this demo does not model.
const PSU_RESERVE_WATTS = 100;

const CASE_FORM_FACTOR_RANK: Record<string, number> = { 'Mini-ITX': 0, 'Micro-ATX': 1, ATX: 2 };

export function checkCompatibility(selection: ComponentSelection): CompatibilityResult {
  const missingSlots = REQUIRED_SLOTS.filter((slot) => !selection[slot]);
  const issues: CompatibilityIssue[] = [];

  const { cpu, mainboard, ram, gpu, psu, case: pcCase, cooler } = selection;

  const cpuSocket = specValue(cpu, 'socket');
  const boardSocket = specValue(mainboard, 'socket');
  if (cpuSocket && boardSocket && cpuSocket !== boardSocket) {
    issues.push({ slots: ['cpu', 'mainboard'], messageKey: 'configurator.issue.socketMismatch' });
  }

  const ramDdrGeneration = specValue(ram, 'ddrType')?.match(/^DDR\d+/)?.[0];
  const boardDdrGeneration = specValue(mainboard, 'ddrType');
  if (ramDdrGeneration && boardDdrGeneration && ramDdrGeneration !== boardDdrGeneration) {
    issues.push({ slots: ['ram', 'mainboard'], messageKey: 'configurator.issue.ramMismatch' });
  }

  const boardFormFactor = specValue(mainboard, 'formFactor');
  const caseFormFactor = specValue(pcCase, 'formFactor');
  if (boardFormFactor && caseFormFactor) {
    const boardRank = CASE_FORM_FACTOR_RANK[boardFormFactor] ?? 0;
    const caseRank = CASE_FORM_FACTOR_RANK[caseFormFactor] ?? 0;
    if (boardRank > caseRank) {
      issues.push({ slots: ['mainboard', 'case'], messageKey: 'configurator.issue.formFactorMismatch' });
    }
  }

  const coolerSockets = specValue(cooler, 'socket');
  if (coolerSockets && cpuSocket) {
    const supported = coolerSockets.split(',').map((s) => s.trim());
    if (!supported.includes(cpuSocket)) {
      issues.push({ slots: ['cooler', 'cpu'], messageKey: 'configurator.issue.coolerSocketMismatch' });
    }
  }

  const coolerHeight = numericValue(specValue(cooler, 'coolerHeight'));
  const maxCoolerHeight = numericValue(specValue(pcCase, 'maxCoolerHeight'));
  if (!Number.isNaN(coolerHeight) && !Number.isNaN(maxCoolerHeight) && coolerHeight > maxCoolerHeight) {
    issues.push({ slots: ['cooler', 'case'], messageKey: 'configurator.issue.coolerHeightExceeded' });
  }

  const gpuLength = numericValue(specValue(gpu, 'length'));
  const maxGpuLength = numericValue(specValue(pcCase, 'maxGpuLength'));
  if (!Number.isNaN(gpuLength) && !Number.isNaN(maxGpuLength) && gpuLength > maxGpuLength) {
    issues.push({ slots: ['gpu', 'case'], messageKey: 'configurator.issue.gpuLengthExceeded' });
  }

  if (psu && (cpu || gpu)) {
    const cpuTdp = numericValue(specValue(cpu, 'tdp'));
    const gpuTdp = numericValue(specValue(gpu, 'tdp'));
    const requiredWatts =
      (Number.isNaN(cpuTdp) ? 0 : cpuTdp) + (Number.isNaN(gpuTdp) ? 0 : gpuTdp) + PSU_RESERVE_WATTS;
    const psuWatts = numericValue(specValue(psu, 'wattage'));
    if (!Number.isNaN(psuWatts) && psuWatts < requiredWatts) {
      issues.push({ slots: ['psu'], messageKey: 'configurator.issue.psuInsufficient' });
    }
  }

  const isComplete = missingSlots.length === 0;
  return { missingSlots, issues, isComplete, isValid: isComplete && issues.length === 0 };
}

export function calculateConfigurationTotalCents(selection: ComponentSelection): number {
  return REQUIRED_SLOTS.reduce((sum, slot) => sum + (selection[slot]?.priceCents ?? 0), 0);
}

function specValue(product: Product | undefined, key: string): string | undefined {
  return product?.specs.find((s) => s.key === key)?.value;
}

function numericValue(value: string | undefined): number {
  return value ? parseFloat(value) : NaN;
}
