export interface User {
  id: number;
  name: string;
  email: string;
  notes?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  role?: string;
  // para buscas futuras, ex nome/email
  search?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
