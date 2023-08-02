import { API_URL_LIVE, API_URL_LOCAL, isLive } from "../api";

export const getUrl =(remUrl:string) => `${isLive ? API_URL_LIVE : API_URL_LOCAL}${remUrl}`

export function formatDateAndTime(dateObj: Date): [string, string] {
    const optionsDate: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    };
  
    const optionsTime: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
    };
  
    const dateFormatter = new Intl.DateTimeFormat('en-US', optionsDate);
    const timeFormatter = new Intl.DateTimeFormat('en-US', optionsTime);
  
    const formattedDate = dateFormatter.format(dateObj);
    const formattedTime = timeFormatter.format(dateObj);
  
    return [formattedDate, formattedTime];
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