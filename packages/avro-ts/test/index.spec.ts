import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { avroTs } from '../src';
import { RecordType } from '../src/types';

const avscFiles = readdirSync(join(__dirname, 'avro'));

describe('Avro ts test', () => {
  it.each(avscFiles)('Should convert %s successfully', file => {
    const avro: RecordType = JSON.parse(String(readFileSync(join(__dirname, 'avro', file))));
    const ts = avroTs(avro, { 'timestamp-millis': 'string', date: 'string' });
    expect(ts).toMatchSnapshot();
    writeFileSync(join(__dirname, '__generated__', file + '.ts'), ts);
  });
});
