export function sendNotification(): void {
    const message = 'Form Submission Success';
    const type: 'success' | 'error' | 'info' = 'info';
    const event = new CustomEvent('notification', {
        detail: { message, type }
    });
    window.dispatchEvent(event);
}