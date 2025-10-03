import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import {
  initializeDatabase,
  getAllPapers,
  getPaperById,
  addPaper,
  updatePaper,
  deletePaper,
  searchPapers,
  filterPapersByStatus,
  closeDatabase,
} from './database';
import { Paper } from '../types';

let mainWindow: BrowserWindow | null = null;

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadFile(path.join(__dirname, '../../public/index.html'));

  // Open DevTools in development
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// App lifecycle
app.on('ready', () => {
  initializeDatabase();
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    closeDatabase();
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

app.on('before-quit', () => {
  closeDatabase();
});

// IPC handlers for database operations
ipcMain.handle('get-all-papers', async (): Promise<Paper[]> => {
  return getAllPapers();
});

ipcMain.handle('get-paper', async (event, id: number): Promise<Paper | undefined> => {
  return getPaperById(id);
});

ipcMain.handle('add-paper', async (event, paper: Omit<Paper, 'id'>): Promise<Paper> => {
  return addPaper(paper);
});

ipcMain.handle('update-paper', async (event, id: number, paper: Partial<Paper>): Promise<void> => {
  updatePaper(id, paper);
});

ipcMain.handle('delete-paper', async (event, id: number): Promise<void> => {
  deletePaper(id);
});

ipcMain.handle('search-papers', async (event, query: string): Promise<Paper[]> => {
  return searchPapers(query);
});

ipcMain.handle('filter-papers', async (event, status: string): Promise<Paper[]> => {
  return filterPapersByStatus(status);
});
