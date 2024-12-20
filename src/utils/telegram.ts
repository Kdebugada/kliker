export const initializeTelegram = () => {
  if ((window as any).Telegram?.WebApp) {
    (window as any).Telegram.WebApp.ready();
    (window as any).Telegram.WebApp.expand();
  }
};