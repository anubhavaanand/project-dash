import Database from 'better-sqlite3';
import { Paper } from '../types';
import path from 'path';
import { app } from 'electron';

let db: Database.Database;

export function initializeDatabase(): void {
  const userDataPath = app.getPath('userData');
  const dbPath = path.join(userDataPath, 'research-papers.db');
  
  db = new Database(dbPath);
  
  // Create papers table if it doesn't exist
  db.exec(`
    CREATE TABLE IF NOT EXISTS papers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      authors TEXT NOT NULL,
      journal TEXT,
      year INTEGER,
      status TEXT NOT NULL,
      deadline TEXT,
      notes TEXT,
      tags TEXT,
      url TEXT,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
      updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

export function getAllPapers(): Paper[] {
  const stmt = db.prepare('SELECT * FROM papers ORDER BY updatedAt DESC');
  return stmt.all() as Paper[];
}

export function getPaperById(id: number): Paper | undefined {
  const stmt = db.prepare('SELECT * FROM papers WHERE id = ?');
  return stmt.get(id) as Paper | undefined;
}

export function addPaper(paper: Omit<Paper, 'id'>): Paper {
  const stmt = db.prepare(`
    INSERT INTO papers (title, authors, journal, year, status, deadline, notes, tags, url)
    VALUES (@title, @authors, @journal, @year, @status, @deadline, @notes, @tags, @url)
  `);
  
  const info = stmt.run(paper);
  return { ...paper, id: info.lastInsertRowid as number };
}

export function updatePaper(id: number, paper: Partial<Paper>): void {
  const fields = Object.keys(paper)
    .filter(key => key !== 'id')
    .map(key => `${key} = @${key}`)
    .join(', ');
  
  const stmt = db.prepare(`
    UPDATE papers 
    SET ${fields}, updatedAt = CURRENT_TIMESTAMP
    WHERE id = @id
  `);
  
  stmt.run({ ...paper, id });
}

export function deletePaper(id: number): void {
  const stmt = db.prepare('DELETE FROM papers WHERE id = ?');
  stmt.run(id);
}

export function searchPapers(query: string): Paper[] {
  const stmt = db.prepare(`
    SELECT * FROM papers 
    WHERE title LIKE ? OR authors LIKE ? OR tags LIKE ?
    ORDER BY updatedAt DESC
  `);
  const searchPattern = `%${query}%`;
  return stmt.all(searchPattern, searchPattern, searchPattern) as Paper[];
}

export function filterPapersByStatus(status: string): Paper[] {
  const stmt = db.prepare('SELECT * FROM papers WHERE status = ? ORDER BY updatedAt DESC');
  return stmt.all(status) as Paper[];
}

export function closeDatabase(): void {
  if (db) {
    db.close();
  }
}
