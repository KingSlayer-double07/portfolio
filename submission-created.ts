export function sendNotification(
    message: string = 'Form Submission Success',
    type: 'success' | 'error' | 'info' = 'info',
    details?: Record<string, unknown>
): void {
    const event = new CustomEvent('notification', {
        detail: { message, type, details },
    });
    window.dispatchEvent(event);
}