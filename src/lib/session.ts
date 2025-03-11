
/**
 * Simple session storage wrapper
 * This implementation uses browser's sessionStorage
 */

export const sessionStorage = {
  /**
   * Get an item from session storage
   */
  getItem(key: string): string | null {
    try {
      return window.sessionStorage.getItem(key);
    } catch (error) {
      console.error('Error accessing sessionStorage:', error);
      return null;
    }
  },
  
  /**
   * Set an item in session storage
   */
  setItem(key: string, value: string): void {
    try {
      window.sessionStorage.setItem(key, value);
    } catch (error) {
      console.error('Error setting sessionStorage item:', error);
    }
  },
  
  /**
   * Remove an item from session storage
   */
  removeItem(key: string): void {
    try {
      window.sessionStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing sessionStorage item:', error);
    }
  },
  
  /**
   * Clear all items from session storage
   */
  clear(): void {
    try {
      window.sessionStorage.clear();
    } catch (error) {
      console.error('Error clearing sessionStorage:', error);
    }
  }
};
