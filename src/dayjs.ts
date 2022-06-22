import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import localizedFormat from 'dayjs/plugin/localizedFormat';

// eslint-disable-next-line no-console
console.log('EXTENDING');

dayjs.extend(utc);
dayjs.extend(localizedFormat);
