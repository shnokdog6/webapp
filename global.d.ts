export {};

declare global {
    interface Window {
        Telegram: Telegram;
    }
    const WebApp = window.Telegram.WebApp;
}

