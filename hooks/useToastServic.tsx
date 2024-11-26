import { toast, ExternalToast } from 'sonner';
import { useTranslations } from 'next-intl';

interface ToastOptions extends ExternalToast {
    translationKey?: string;
    translationValues?: Record<string, string>;
}

export const useToast = () => {
    const t = useTranslations();

    const defaultOptions: ToastOptions = {
        position: 'top-right',
        duration: 4000,
        richColors: true,
    };

    const getMessage = (message: string, options?: ToastOptions) => {
        if (options?.translationKey) {
            return t(options.translationKey, options.translationValues || {});
        }
        return message;
    };

    return {
        success: (message: string, options: ToastOptions = {}) => {
            const finalMessage = getMessage(message, options);
            toast.success(finalMessage, { ...defaultOptions, ...options });
        },
        error: (message: string, options: ToastOptions = {}) => {
            const finalMessage = getMessage(message, options);
            toast.error(finalMessage, { ...defaultOptions, ...options });
        },
        warning: (message: string, options: ToastOptions = {}) => {
            const finalMessage = getMessage(message, options);
            toast.warning(finalMessage, { ...defaultOptions, ...options });
        },
        info: (message: string, options: ToastOptions = {}) => {
            const finalMessage = getMessage(message, options);
            toast.info(finalMessage, { ...defaultOptions, ...options });
        },
    };
};