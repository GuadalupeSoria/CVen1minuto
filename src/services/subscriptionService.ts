// Servicio para gestionar suscripciones y límites de uso
import { redirectToStripe, STRIPE_SUCCESS_PATH, STRIPE_SUBSCRIPTION_MONTHS } from '../config/stripe'

const STORAGE_KEY = 'cv_downloads';
const TRANSLATIONS_KEY = 'cv_translations';
const OPTIMIZATIONS_KEY = 'cv_optimizations';
const PREMIUM_KEY = 'cv_premium_user';
const ANON_DOWNLOADS_KEY = 'cv_anon_dl';
const ANON_TRANSLATIONS_KEY = 'cv_anon_tr';
const ANON_OPTIMIZATIONS_KEY = 'cv_anon_op';
const MAX_FREE_DOWNLOADS = 1; // Descargas gratis por día (usuarios registrados)
const MAX_FREE_TRANSLATIONS = 1; // Traducciones gratis por día (usuarios registrados)
const MAX_FREE_OPTIMIZATIONS = 1; // Optimizaciones con IA gratis por día (usuarios registrados)

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

  // Activar premium (llamar tras verificar pago de Stripe)
  activatePremium(months: number = STRIPE_SUBSCRIPTION_MONTHS): void {
    const expiresAt = new Date()
    expiresAt.setMonth(expiresAt.getMonth() + months)

    localStorage.setItem(PREMIUM_KEY, JSON.stringify({
      isPremium: true,
      expiresAt: expiresAt.toISOString(),
      activatedAt: new Date().toISOString(),
      source: 'stripe',
    }))
  }

  // Redirigir al usuario al checkout de Stripe (Payment Link)
  // Devuelve false si el Payment Link no está configurado
  redirectToCheckout(email?: string): boolean {
    return redirectToStripe(email)
  }

  // Detecta si el usuario volvió desde Stripe (/payment/success) y redirige al app.
  // Devuelve true si hay que activar premium.
  detectStripeReturn(): boolean {
    if (window.location.pathname === STRIPE_SUCCESS_PATH) {
      // Redirigir al app limpio
      window.history.replaceState({}, '', '/#app')
      return true
    }
    return false
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
  // isLoggedIn: false = anónimo (1 vez total), true = registrado (1 por día)
  canDownload(isLoggedIn = false): { allowed: boolean; remaining: number; isNewDay: boolean } {
    if (this.isPremium()) return { allowed: true, remaining: -1, isNewDay: false };

    if (!isLoggedIn) {
      const used = localStorage.getItem(ANON_DOWNLOADS_KEY) === '1';
      return { allowed: !used, remaining: used ? 0 : 1, isNewDay: false };
    }

    const record = this.getDownloadRecord();
    const isNewDay = this.isNewDay(record.lastDownload);
    if (isNewDay) return { allowed: true, remaining: MAX_FREE_DOWNLOADS - 1, isNewDay: true };
    const allowed = record.count < MAX_FREE_DOWNLOADS;
    return { allowed, remaining: Math.max(0, MAX_FREE_DOWNLOADS - record.count), isNewDay: false };
  }

  // Registrar una descarga
  recordDownload(isLoggedIn = false): void {
    if (this.isPremium()) return;
    if (!isLoggedIn) {
      localStorage.setItem(ANON_DOWNLOADS_KEY, '1');
      return;
    }
    const record = this.getDownloadRecord();
    const isNewDay = this.isNewDay(record.lastDownload);
    if (isNewDay) {
      this.saveDownloadRecord({ count: 1, lastDownload: new Date().toISOString() });
    } else {
      this.saveDownloadRecord({ count: record.count + 1, lastDownload: new Date().toISOString() });
    }
  }

  // Verificar si puede traducir
  canTranslate(isLoggedIn = false): { allowed: boolean; remaining: number; isNewDay: boolean } {
    if (this.isPremium()) return { allowed: true, remaining: -1, isNewDay: false };

    if (!isLoggedIn) {
      const used = localStorage.getItem(ANON_TRANSLATIONS_KEY) === '1';
      return { allowed: !used, remaining: used ? 0 : 1, isNewDay: false };
    }

    const record = this.getActionRecord(TRANSLATIONS_KEY);
    const isNewDay = this.isNewDay(record.lastDownload);
    if (isNewDay) return { allowed: true, remaining: MAX_FREE_TRANSLATIONS - 1, isNewDay: true };
    const allowed = record.count < MAX_FREE_TRANSLATIONS;
    return { allowed, remaining: Math.max(0, MAX_FREE_TRANSLATIONS - record.count), isNewDay: false };
  }

  // Registrar una traducción
  recordTranslation(isLoggedIn = false): void {
    if (this.isPremium()) return;
    if (!isLoggedIn) {
      localStorage.setItem(ANON_TRANSLATIONS_KEY, '1');
      return;
    }
    this.recordAction(TRANSLATIONS_KEY);
  }

  // Verificar si puede optimizar con IA
  canOptimize(isLoggedIn = false): { allowed: boolean; remaining: number; isNewDay: boolean } {
    if (this.isPremium()) return { allowed: true, remaining: -1, isNewDay: false };

    if (!isLoggedIn) {
      const used = localStorage.getItem(ANON_OPTIMIZATIONS_KEY) === '1';
      return { allowed: !used, remaining: used ? 0 : 1, isNewDay: false };
    }

    const record = this.getActionRecord(OPTIMIZATIONS_KEY);
    const isNewDay = this.isNewDay(record.lastDownload);
    if (isNewDay) return { allowed: true, remaining: MAX_FREE_OPTIMIZATIONS - 1, isNewDay: true };
    const allowed = record.count < MAX_FREE_OPTIMIZATIONS;
    return { allowed, remaining: Math.max(0, MAX_FREE_OPTIMIZATIONS - record.count), isNewDay: false };
  }

  // Registrar una optimización
  recordOptimization(isLoggedIn = false): void {
    if (this.isPremium()) return;
    if (!isLoggedIn) {
      localStorage.setItem(ANON_OPTIMIZATIONS_KEY, '1');
      return;
    }
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
