
// Application-wide type definitions

// Generic response type for API calls
export interface ApiResponse<T> {
  data?: T;
  success: boolean;
  message?: string;
  error?: string;
}

// Pagination parameters
export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

// Common sort options
export type SortOrder = 'asc' | 'desc';

// User roles
export type UserRole = 'admin' | 'user' | 'team-member';
