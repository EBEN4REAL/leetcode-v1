import { useEffect, useState } from "react";

function useAppTheme() {
  const [appTheme, setTheme] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const mode = window.localStorage.theme;
      return mode;
    }
  });



  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
  }, []);

  useEffect(() => {
      if(appTheme === 'light') {
        document.documentElement.classList.remove('dark')
        localStorage.theme = 'light'
      }else {
        document.documentElement.classList.add('dark')
        localStorage.theme = 'dark'
      }
  }, [appTheme]);


  return {
    appTheme,
    setTheme,
  };
}

export default useAppTheme;
