// Servicio para gestionar suscripciones y límites de uso

const STORAGE_KEY = 'cv_downloads';
const TRANSLATIONS_KEY = 'cv_translations';
const OPTIMIZATIONS_KEY = 'cv_optimizations';
const PREMIUM_KEY = 'cv_premium_user';
const MAX_FREE_DOWNLOADS = 1; // Descargas gratis por día
const MAX_FREE_TRANSLATIONS = 1; // Traducciones gratis por día
const MAX_FREE_OPTIMIZATIONS = 1; // Optimizaciones con IA gratis por día

interface DownloadRecord {
  count: number;
  lastDownload: string; // ISO date
}

class SubscriptionService {
  // Verificar si el usuario es premium
  isPremium(): boolean {
    const premium = localStorage.getItem(PREMIUM_KEY);
    if (!premium) return false;
    
    try {
      const data = JSON.parse(premium);
      // Verificar si la suscripción no ha expirado
      if (data.expiresAt) {
        return new Date(data.expiresAt) > new Date();
      }
      return data.isPremium === true;
    } catch {
      return false;
    }
  }

  // Activar premium (simulado - en producción sería con pago real)
  activatePremium(months: number = 1): void {
    const expiresAt = new Date();
    expiresAt.setMonth(expiresAt.getMonth() + months);
    
    localStorage.setItem(PREMIUM_KEY, JSON.stringify({
      isPremium: true,
      expiresAt: expiresAt.toISOString(),
      activatedAt: new Date().toISOString()
    }));
  }

  // Obtener información de descargas
  private getDownloadRecord(): DownloadRecord {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return { count: 0, lastDownload: new Date().toISOString() };
    }
    
    try {
      return JSON.parse(stored);
    } catch {
      return { count: 0, lastDownload: new Date().toISOString() };
    }
  }

  // Guardar información de descargas
  private saveDownloadRecord(record: DownloadRecord): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  }

  // Verificar si es un nuevo día
  private isNewDay(lastDate: string): boolean {
    const last = new Date(lastDate);
    const today = new Date();
    
    return (
      last.getDate() !== today.getDate() ||
      last.getMonth() !== today.getMonth() ||
      last.getFullYear() !== today.getFullYear()
    );
  }

  // Verificar si puede descargar
  canDownload(): { allowed: boolean; remaining: number; isNewDay: boolean } {
    // Premium puede descargar ilimitado
    if (this.isPremium()) {
      return { allowed: true, remaining: -1, isNewDay: false }; // -1 = ilimitado
    }

    const record = this.getDownloadRecord();
    const isNewDay = this.isNewDay(record.lastDownload);

    // Si es un nuevo día, resetear contador
    if (isNewDay) {
      return { allowed: true, remaining: MAX_FREE_DOWNLOADS - 1, isNewDay: true };
    }

    // Verificar si alcanzó el límite
    const allowed = record.count < MAX_FREE_DOWNLOADS;
    const remaining = Math.max(0, MAX_FREE_DOWNLOADS - record.count);

    return { allowed, remaining, isNewDay: false };
  }

  // Registrar una descarga
  recordDownload(): void {
    if (this.isPremium()) {
      return; // Premium no tiene límites
    }

    const record = this.getDownloadRecord();
    const isNewDay = this.isNewDay(record.lastDownload);

    if (isNewDay) {
      // Nuevo día, resetear contador
      this.saveDownloadRecord({
        count: 1,
        lastDownload: new Date().toISOString()
      });
    } else {
      // Mismo día, incrementar contador
      this.saveDownloadRecord({
        count: record.count + 1,
        lastDownload: new Date().toISOString()
      });
    }
  }

  // Verificar si puede traducir
  canTranslate(): { allowed: boolean; remaining: number; isNewDay: boolean } {
    if (this.isPremium()) {
      return { allowed: true, remaining: -1, isNewDay: false };
    }

    const record = this.getActionRecord(TRANSLATIONS_KEY);
    const isNewDay = this.isNewDay(record.lastDownload);

    if (isNewDay) {
      return { allowed: true, remaining: MAX_FREE_TRANSLATIONS - 1, isNewDay: true };
    }

    const allowed = record.count < MAX_FREE_TRANSLATIONS;
    const remaining = Math.max(0, MAX_FREE_TRANSLATIONS - record.count);

    return { allowed, remaining, isNewDay: false };
  }

  // Registrar una traducción
  recordTranslation(): void {
    if (this.isPremium()) return;
    this.recordAction(TRANSLATIONS_KEY);
  }

  // Verificar si puede optimizar con IA
  canOptimize(): { allowed: boolean; remaining: number; isNewDay: boolean } {
    if (this.isPremium()) {
      return { allowed: true, remaining: -1, isNewDay: false };
    }

    const record = this.getActionRecord(OPTIMIZATIONS_KEY);
    const isNewDay = this.isNewDay(record.lastDownload);

    if (isNewDay) {
      return { allowed: true, remaining: MAX_FREE_OPTIMIZATIONS - 1, isNewDay: true };
    }

    const allowed = record.count < MAX_FREE_OPTIMIZATIONS;
    const remaining = Math.max(0, MAX_FREE_OPTIMIZATIONS - record.count);

    return { allowed, remaining, isNewDay: false };
  }

  // Registrar una optimización
  recordOptimization(): void {
    if (this.isPremium()) return;
    this.recordAction(OPTIMIZATIONS_KEY);
  }

  // Método genérico para obtener registro de acción
  private getActionRecord(key: string): DownloadRecord {
    const stored = localStorage.getItem(key);
    if (!stored) {
      return { count: 0, lastDownload: new Date().toISOString() };
    }
    
    try {
      return JSON.parse(stored);
    } catch {
      return { count: 0, lastDownload: new Date().toISOString() };
    }
  }

  // Método genérico para registrar acción
  private recordAction(key: string): void {
    const record = this.getActionRecord(key);
    const isNewDay = this.isNewDay(record.lastDownload);

    if (isNewDay) {
      localStorage.setItem(key, JSON.stringify({
        count: 1,
        lastDownload: new Date().toISOString()
      }));
    } else {
      localStorage.setItem(key, JSON.stringify({
        count: record.count + 1,
        lastDownload: new Date().toISOString()
      }));
    }
  }

  // Obtener información de la suscripción
  getSubscriptionInfo(): { isPremium: boolean; expiresAt?: string } {
    const premium = localStorage.getItem(PREMIUM_KEY);
    if (!premium) return { isPremium: false };
    
    try {
      const data = JSON.parse(premium);
      return {
        isPremium: this.isPremium(),
        expiresAt: data.expiresAt
      };
    } catch {
      return { isPremium: false };
    }
  }

  // Cancelar premium (para testing)
  cancelPremium(): void {
    localStorage.removeItem(PREMIUM_KEY);
  }
}

export const subscriptionService = new SubscriptionService();
export default subscriptionService;
