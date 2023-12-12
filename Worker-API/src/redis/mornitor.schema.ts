import { Schema } from 'redis-om';
import client from './redis.client';
import { Repository } from 'redis-om';

const mornitorSchema = new Schema('mornitor', {
    id: { type: 'number' },
    status: { type: 'string' },
    schedule_id: { type: 'number' },
    createdAt: { type: 'date' },
    updateAt: { type: 'date' },
});
export const mornitorRepository = new Repository(mornitorSchema, client);
console.log('Done creating mornitor redis');
//   employeeRepository.createIndex();
