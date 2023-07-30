
// local one

export const API_URL_LOCAL = "http://192.168.0.101:3033"

// personal host
// export const API_URL_LOCAL = "http://172.20.10.13:3033"

// live one
export const API_URL_LIVE = "https://adnans-todo-backend.onrender.com"

// isLive
export const isLive = false;


export function generateUniqueID() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 32;
    let id = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      id += characters.charAt(randomIndex);
    }
  
    return id;
}