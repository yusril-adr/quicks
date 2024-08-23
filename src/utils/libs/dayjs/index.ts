import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';
import isToday from 'dayjs/plugin/isToday';

dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.extend(isToday);

export default dayjs.utc;
