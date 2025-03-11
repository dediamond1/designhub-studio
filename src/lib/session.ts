
/**
 * Session storage wrapper
 * This implementation uses browser's sessionStorage for UI demo purposes only
 */

// Type for session data structure
export interface SessionData {
  user?: any;
  isLoggedIn?: boolean;
  [key: string]: any;
}

// In-memory fallback storage when sessionStorage is not available
const memoryStorage: Record<string, string> = {};

export const sessionStorage = {
  /**
   * Get an item from session storage
   */
  getItem(key: string): string | null {
    try {
      // Try browser's sessionStorage first
      if (typeof window !== 'undefined' && window.sessionStorage) {
        return window.sessionStorage.getItem(key);
      }
    } catch (error) {
      console.error('Error accessing sessionStorage:', error);
    }
    
    // Fallback to memory storage
    return memoryStorage[key] || null;
  },
  
  /**
   * Set an item in session storage
   */
  setItem(key: string, value: string): void {
    try {
      // Try browser's sessionStorage first
      if (typeof window !== 'undefined' && window.sessionStorage) {
        window.sessionStorage.setItem(key, value);
        return;
      }
    } catch (error) {
      console.error('Error setting sessionStorage item:', error);
    }
    
    // Fallback to memory storage
    memoryStorage[key] = value;
  },
  
  /**
   * Remove an item from session storage
   */
  removeItem(key: string): void {
    try {
      // Try browser's sessionStorage first
      if (typeof window !== 'undefined' && window.sessionStorage) {
        window.sessionStorage.removeItem(key);
        return;
      }
    } catch (error) {
      console.error('Error removing sessionStorage item:', error);
    }
    
    // Fallback to memory storage
    delete memoryStorage[key];
  },
  
  /**
   * Clear all items from session storage
   */
  clear(): void {
    try {
      // Try browser's sessionStorage first
      if (typeof window !== 'undefined' && window.sessionStorage) {
        window.sessionStorage.clear();
        return;
      }
    } catch (error) {
      console.error('Error clearing sessionStorage:', error);
    }
    
    // Fallback to memory storage
    Object.keys(memoryStorage).forEach(key => {
      delete memoryStorage[key];
    });
  },
  
  /**
   * Get parsed object from session storage
   */
  getObject<T>(key: string): T | null {
    const value = this.getItem(key);
    if (!value) return null;
    
    try {
      return JSON.parse(value) as T;
    } catch (error) {
      console.error(`Error parsing session value for key "${key}":`, error);
      return null;
    }
  },
  
  /**
   * Store object in session storage as JSON
   */
  setObject<T>(key: string, value: T): void {
    try {
      const jsonValue = JSON.stringify(value);
      this.setItem(key, jsonValue);
    } catch (error) {
      console.error(`Error stringifying value for key "${key}":`, error);
    }
  }
};
