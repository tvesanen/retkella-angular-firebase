import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const trails = [
      { id: 1, name:'Puikkari', lat: 61.5784, lon: 24.119066 },
      { id: 2, name: 'Laipanmaa', lat: 61.426865, lon: 24.569464 },
      { id: 3, name: 'Isojärvi', lat: 61.6745139, lon: 24.99991 },
      { id: 4, name: 'Seitseminen', lat: 61.913, lon: 23.381599 }
    ];
    return {trails};
  }
}
