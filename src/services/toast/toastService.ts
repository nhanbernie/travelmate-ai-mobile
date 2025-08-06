import Toast from 'react-native-toast-message';

export interface ToastConfig {
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
  duration?: number;
  position?: 'top' | 'bottom';
  visibilityTime?: number;
  autoHide?: boolean;
  topOffset?: number;
  bottomOffset?: number;
}

export class ToastService {
  private static instance: ToastService;
  private activeToasts: Set<string> = new Set();
  private toastQueue: ToastConfig[] = [];
  private isProcessing = false;

  public static getInstance(): ToastService {
    if (!ToastService.instance) {
      ToastService.instance = new ToastService();
    }
    return ToastService.instance;
  }

  // private generateToastId(config: ToastConfig): string {
  //   return `${config.type}-${config.title}-${Date.now()}`;
  // }

  private async processQueue() {
    if (this.isProcessing || this.toastQueue.length === 0) return;

    this.isProcessing = true;
    const config = this.toastQueue.shift();

    if (config) {
      // const toastId = this.generateToastId(config);

      // Avoid duplicate toasts
      if (!this.activeToasts.has(`${config.type}-${config.title}`)) {
        this.activeToasts.add(`${config.type}-${config.title}`);

        Toast.show({
          type: config.type,
          text1: config.title,
          text2: config.message,
          position: config.position || 'top',
          visibilityTime: config.visibilityTime || 4000,
          autoHide: config.autoHide !== false,
          topOffset: config.topOffset || 60,
          bottomOffset: config.bottomOffset || 40,
          onHide: () => {
            this.activeToasts.delete(`${config.type}-${config.title}`);
            // Process next toast after this one hides
            setTimeout(() => {
              this.isProcessing = false;
              this.processQueue();
            }, 100);
          },
        });
      } else {
        // Skip duplicate, process next
        this.isProcessing = false;
        this.processQueue();
      }
    }
  }

  public show(config: ToastConfig) {
    this.toastQueue.push(config);
    this.processQueue();
  }

  public success(
    title: string,
    message?: string,
    options?: Partial<ToastConfig>
  ) {
    this.show({
      type: 'success',
      title,
      message,
      ...options,
    });
  }

  public error(
    title: string,
    message?: string,
    options?: Partial<ToastConfig>
  ) {
    this.show({
      type: 'error',
      title,
      message,
      ...options,
    });
  }

  public info(title: string, message?: string, options?: Partial<ToastConfig>) {
    this.show({
      type: 'info',
      title,
      message,
      ...options,
    });
  }

  public warning(
    title: string,
    message?: string,
    options?: Partial<ToastConfig>
  ) {
    this.show({
      type: 'warning',
      title,
      message,
      ...options,
    });
  }

  public hide() {
    Toast.hide();
  }

  public clear() {
    this.toastQueue = [];
    this.activeToasts.clear();
    Toast.hide();
  }
}

// Export singleton instance
export const toastService = ToastService.getInstance();

// Export convenience functions
export const showToast = {
  success: (title: string, message?: string, options?: Partial<ToastConfig>) =>
    toastService.success(title, message, options),
  error: (title: string, message?: string, options?: Partial<ToastConfig>) =>
    toastService.error(title, message, options),
  info: (title: string, message?: string, options?: Partial<ToastConfig>) =>
    toastService.info(title, message, options),
  warning: (title: string, message?: string, options?: Partial<ToastConfig>) =>
    toastService.warning(title, message, options),
};
