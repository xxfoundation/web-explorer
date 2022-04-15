import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import isToday from 'dayjs/plugin/isToday';

dayjs.extend(utc);
dayjs.extend(localizedFormat);
dayjs.extend(isToday)