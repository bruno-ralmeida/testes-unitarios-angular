import { UniqueIdService } from './unique-id.service';

describe(`${UniqueIdService.name}`, () => {
  let service = new UniqueIdService();

  beforeEach(() => {
    service = new UniqueIdService();
  });

  it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name}
    should generate id when called with prefix`, () => {
    const prefix = 'app';
    const id = service.generateUniqueIdWithPrefix(prefix);
    expect(id.startsWith('app-')).toBeTrue();
  });

  it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name}
    should not generate duplicate id when called`, () => {
    const prefix = 'app';
    let ids = new Set<string>();
    for (let i = 0; i < 50; i++) {
      const id = service.generateUniqueIdWithPrefix(prefix);
      ids.add(id);
    }
    expect(ids.size).toBe(50);
  });

  it(`#${UniqueIdService.prototype.getNumberOfGeneratedIds.name}
    should return the number of generated Ids when called`, () => {
    const prefix = 'app';
    for (let i = 0; i < 10; i++) {
      service.generateUniqueIdWithPrefix(prefix);
    }
    expect(service.getNumberOfGeneratedIds()).toBe(10);
  });

  it(`${UniqueIdService.prototype.generateUniqueIdWithPrefix.name}
    should throw when called with empty or invalid id start`, () => {
    const emptyValues = [undefined, null, '', '0'];
    emptyValues.forEach((emptyValue) => {
      expect(() => service.generateUniqueIdWithPrefix(emptyValue))
        .withContext(`Empty value param: ${emptyValue}`)
        .toThrow();
    });
  });
});
