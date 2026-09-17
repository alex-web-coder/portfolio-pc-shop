import { PRODUCTS } from '../interceptors/mock-api.data';
import { ComponentSelection } from '../models/pc-configuration.model';
import { calculateConfigurationTotalCents, checkCompatibility } from './pc-compatibility';

function byId(id: string) {
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) throw new Error(`test fixture missing product ${id}`);
  return product;
}

describe('checkCompatibility', () => {
  it('reports all slots missing for an empty selection', () => {
    const result = checkCompatibility({});
    expect(result.missingSlots).toHaveLength(8);
    expect(result.isComplete).toBe(false);
    expect(result.isValid).toBe(false);
  });

  it('accepts a fully valid budget build (build #1)', () => {
    const selection: ComponentSelection = {
      cpu: byId('cpu-2'),
      mainboard: byId('mb-4'),
      ram: byId('ram-2'),
      gpu: byId('gpu-3'),
      storage: byId('ssd-1'),
      psu: byId('psu-2'),
      case: byId('case-4'),
      cooler: byId('cooler-3'),
    };
    const result = checkCompatibility(selection);
    expect(result.issues).toEqual([]);
    expect(result.isComplete).toBe(true);
    expect(result.isValid).toBe(true);
  });

  it('accepts a fully valid high-end build (build #2)', () => {
    const selection: ComponentSelection = {
      cpu: byId('cpu-5'),
      mainboard: byId('mb-5'),
      ram: byId('ram-3'),
      gpu: byId('gpu-5'),
      storage: byId('ssd-2'),
      psu: byId('psu-4'),
      case: byId('case-5'),
      cooler: byId('cooler-4'),
    };
    const result = checkCompatibility(selection);
    expect(result.issues).toEqual([]);
    expect(result.isValid).toBe(true);
  });

  it('flags a CPU/mainboard socket mismatch', () => {
    const result = checkCompatibility({ cpu: byId('cpu-4'), mainboard: byId('mb-1') });
    expect(result.issues).toContainEqual(
      expect.objectContaining({ messageKey: 'configurator.issue.socketMismatch' }),
    );
  });

  it('flags a RAM/mainboard DDR generation mismatch', () => {
    const result = checkCompatibility({ mainboard: byId('mb-6'), ram: byId('ram-1') });
    expect(result.issues).toContainEqual(
      expect.objectContaining({ messageKey: 'configurator.issue.ramMismatch' }),
    );
  });

  it('flags a mainboard/case form-factor mismatch', () => {
    const result = checkCompatibility({ mainboard: byId('mb-1'), case: byId('case-3') });
    expect(result.issues).toContainEqual(
      expect.objectContaining({ messageKey: 'configurator.issue.formFactorMismatch' }),
    );
  });

  it('flags a cooler/socket mismatch', () => {
    const result = checkCompatibility({ cooler: byId('cooler-3'), cpu: byId('cpu-5') });
    expect(result.issues).toContainEqual(
      expect.objectContaining({ messageKey: 'configurator.issue.coolerSocketMismatch' }),
    );
  });

  it('flags a cooler that is too tall for the case', () => {
    const result = checkCompatibility({ case: byId('case-3'), cooler: byId('cooler-4') });
    expect(result.issues).toContainEqual(
      expect.objectContaining({ messageKey: 'configurator.issue.coolerHeightExceeded' }),
    );
  });

  it('flags a GPU that is too long for the case', () => {
    const result = checkCompatibility({ case: byId('case-3'), gpu: byId('gpu-4') });
    expect(result.issues).toContainEqual(
      expect.objectContaining({ messageKey: 'configurator.issue.gpuLengthExceeded' }),
    );
  });

  it('flags an underpowered PSU', () => {
    const result = checkCompatibility({ psu: byId('psu-5'), cpu: byId('cpu-3'), gpu: byId('gpu-4') });
    expect(result.issues).toContainEqual(
      expect.objectContaining({ messageKey: 'configurator.issue.psuInsufficient' }),
    );
  });
});

describe('calculateConfigurationTotalCents', () => {
  it('sums the price of every selected slot', () => {
    const selection: ComponentSelection = { cpu: byId('cpu-2'), gpu: byId('gpu-3') };
    expect(calculateConfigurationTotalCents(selection)).toBe(
      byId('cpu-2').priceCents + byId('gpu-3').priceCents,
    );
  });

  it('returns 0 for an empty selection', () => {
    expect(calculateConfigurationTotalCents({})).toBe(0);
  });
});
