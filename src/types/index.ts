// Type definitions for the Research Paper Dashboard

export interface Paper {
  id?: number;
  title: string;
  authors: string;
  journal: string;
  year: number;
  status: PaperStatus;
  deadline?: string;
  notes?: string;
  tags?: string;
  url?: string;
  createdAt?: string;
  updatedAt?: string;
}

export enum PaperStatus {
  TO_READ = 'To Read',
  READING = 'Reading',
  COMPLETED = 'Completed',
  ON_HOLD = 'On Hold',
}

export interface FilterOptions {
  status?: PaperStatus;
  searchQuery?: string;
  tags?: string[];
}

export interface DatabaseConfig {
  filename: string;
}
