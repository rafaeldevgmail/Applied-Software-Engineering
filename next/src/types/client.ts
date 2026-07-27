export interface Client {
  id: number;
  userId: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: string;
  notes?: string;
}
