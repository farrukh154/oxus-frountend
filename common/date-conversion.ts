import { useDayjs } from '#dayjs'
import {getCurrentLocale} from '~/common/localization-utils'

const dayjs = useDayjs()

export const LONG_DATE_FORMAT: string = 'DD.MM.YYYY';

export function tryDateStringToDate(dateString: string | undefined): boolean {
  if (typeof dateString !== 'string') {
    return false
  }
  const [D, M, Y] = dateString.split('.')
  return dayjs(`${M}.${D}.${Y}`).format(LONG_DATE_FORMAT) === dateString;
}

export function dateToDateString(date): string | boolean {
  if (date.isValid()) {
    return date.format(LONG_DATE_FORMAT);
  }
  return false
}

export function dateStringToIsoDateString(dateString: string) {
  const [D, M, Y] = dateString.split('.')
  const date = new Date(`${Y}-${M}-${D}`)
  return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0, 10)
}


export function getDateFromISOString(dateString: string): string {
  const date = new Date(dateString);
  let formattedDate: string;
  if (dateString.includes('T')) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    formattedDate = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()} ${hours}:${minutes}`;
  } else {
    formattedDate = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
  }
  return formattedDate;
}

export function getDateTimeStringFromISOString(dateTimeString:string) {
  const dateTime = new Date(dateTimeString)
  return new Intl.DateTimeFormat(getCurrentLocale().value, {
    dateStyle: 'short',
    timeStyle: 'long',
  }).format(dateTime)
}