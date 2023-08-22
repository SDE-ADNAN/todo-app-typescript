import { API_URL_LIVE, API_URL_LOCAL, isLive } from "../api";

export const getUrl =(remUrl:string) => `${isLive ? API_URL_LIVE : API_URL_LOCAL}${remUrl}`

export function formatDateAndTime(dateObj: Date): [string,string] {
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString('default', { month: 'short' });
  const year = dateObj.getFullYear().toString().slice(-2);

  let daySuffix;
  if (day === 1 || day === 21 || day === 31) {
    daySuffix = 'st';
  } else if (day === 2 || day === 22) {
    daySuffix = 'nd';
  } else if (day === 3 || day === 23) {
    daySuffix = 'rd';
  } else {
    daySuffix = 'th';
  }

  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const timeOfDay = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = (hours % 12) || 12; // Convert to 12-hour format

  const formattedTime = `${formattedHours}:${minutes.toString().padStart(2, '0')} ${timeOfDay}`;

  // return `${day}${daySuffix} ${month} ${year} - ${formattedTime}`;
  return [`${day}${daySuffix} ${month} ${year}`,`${formattedTime}`]

}

export const isDarkModeFromLocalStorage = () => {
  const localStorageDarkMode = localStorage.getItem('darkMode')

  if (localStorageDarkMode != null && localStorageDarkMode === 'True') {
      return true;
  } else {
      return false;
  }
}


export const includeDarkClass =(scssClass:string,darkMode:boolean)=>{
  return `${scssClass} ${darkMode?'dark':'light'}`
}
const Todos = {
    getUrl:getUrl,
    formatDateAndTime:formatDateAndTime
}

export default Todos;