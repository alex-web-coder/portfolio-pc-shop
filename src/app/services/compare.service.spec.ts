import { TestBed } from '@angular/core/testing';
import { CompareService } from './compare.service';

describe('CompareService', () => {
  let service: CompareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompareService);
  });

  it('starts empty', () => {
    expect(service.ids()).toEqual([]);
    expect(service.count()).toBe(0);
    expect(service.isFull()).toBe(false);
  });

  it('adds a product id on toggle', () => {
    service.toggle('gpu-1');
    expect(service.ids()).toEqual(['gpu-1']);
    expect(service.isSelected('gpu-1')).toBe(true);
  });

  it('removes a product id on a second toggle', () => {
    service.toggle('gpu-1');
    service.toggle('gpu-1');
    expect(service.ids()).toEqual([]);
    expect(service.isSelected('gpu-1')).toBe(false);
  });

  it('caps at 3 selected products, ignoring further toggles', () => {
    service.toggle('gpu-1');
    service.toggle('gpu-2');
    service.toggle('gpu-3');
    expect(service.isFull()).toBe(true);

    service.toggle('gpu-4');
    expect(service.ids()).toEqual(['gpu-1', 'gpu-2', 'gpu-3']);
  });

  it('remove() drops a specific id regardless of order', () => {
    service.toggle('gpu-1');
    service.toggle('gpu-2');
    service.remove('gpu-1');
    expect(service.ids()).toEqual(['gpu-2']);
  });

  it('clear() empties the selection', () => {
    service.toggle('gpu-1');
    service.toggle('gpu-2');
    service.clear();
    expect(service.ids()).toEqual([]);
  });
});
