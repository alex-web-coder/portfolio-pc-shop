import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { mockApiInterceptor } from '../interceptors/mock-api.interceptor';
import { SearchService } from './search.service';

async function ready(service: SearchService): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 350));
}

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(withInterceptors([mockApiInterceptor]))],
    });
    service = TestBed.inject(SearchService);
    await ready(service);
  });

  it('returns no results for an empty query', () => {
    expect(service.results('', 'de')).toEqual([]);
  });

  it('matches by product name, case-insensitively', () => {
    const results = service.results('geforce rtx 4060', 'de');
    expect(results.some((p) => p.id === 'gpu-3')).toBe(true);
  });

  it('matches by manufacturer', () => {
    const results = service.results('sapphire', 'de');
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((p) => p.manufacturer === 'Sapphire')).toBe(true);
  });

  it('returns no matches for an unrelated query', () => {
    expect(service.results('xyz-does-not-exist', 'de')).toEqual([]);
  });

  it('caps suggestions at 6 even when more products match', () => {
    // "e" matches most product names/manufacturers in the sample data.
    const suggestions = service.suggestions('e', 'de');
    expect(suggestions.length).toBeLessThanOrEqual(6);
  });
});
