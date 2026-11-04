export type OverlayCloseGuard = () => boolean | Promise<boolean>;

export interface OverlayRegistration {
  id: string;
  onClose: () => void;
  closeGuard?: OverlayCloseGuard;
}

class OverlayService {
  private stack: OverlayRegistration[] = [];
  private listeners: (() => void)[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.stack.length > 0) {
          this.handleTopMostClose();
        }
      });
    }
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  public subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  public register(registration: OverlayRegistration) {
    // Prevent duplicate registrations
    if (!this.stack.some((item) => item.id === registration.id)) {
      this.stack.push(registration);
      this.notify();
    }
  }

  public unregister(id: string) {
    this.stack = this.stack.filter((item) => item.id !== id);
    this.notify();
  }

  public async handleTopMostClose() {
    if (this.stack.length === 0) return;
    const topMost = this.stack[this.stack.length - 1];

    if (topMost.closeGuard) {
      const canClose = await topMost.closeGuard();
      if (!canClose) return; // Abort close if guard returns false
    }

    topMost.onClose();
    this.unregister(topMost.id);
  }
}

export const overlayService = new OverlayService();