/* eslint-disable no-magic-numbers */
export function displayDate(date, calendarType) {
  const MonthName = {
    gregorian: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'اكتوبر', 'نوفمبر', 'ديسمبر'],
    hijri: ['المحرّم', 'صفر', 'ربيع الأول', 'ربيع الثاني', 'جمادى الاول', 'جمادى الآخر', 'رجب', 'شعبان', 'رمضان', 'شوّال', 'ذو القعدة', 'ذو الحجة'],
  };

  const year = date.split('-', 1).pop();
  const month = parseInt(date.split('-', 2).pop()) - 1;
  const day = date
    .split('-', 3)
    .pop()
    .replace(/(T\d{2}:\d{2}:\d{2})Z$/, '');
  return {
    day,
    year,
    month: MonthName[calendarType][month],
  };
}
