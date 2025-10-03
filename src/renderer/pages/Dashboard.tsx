import React, { useState, useEffect } from 'react';
import { Paper, PaperStatus } from '../../types';
import PaperList from '../components/PaperList';
import PaperDetails from '../components/PaperDetails';
import AddPaperForm from '../components/AddPaperForm';

const { ipcRenderer } = window.require('electron');

type View = 'list' | 'add' | 'details';

const Dashboard: React.FC = () => {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
  const [currentView, setCurrentView] = useState<View>('list');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadPapers();
  }, []);

  const loadPapers = async () => {
    setLoading(true);
    try {
      const allPapers = await ipcRenderer.invoke('get-all-papers');
      setPapers(allPapers);
    } catch (error) {
      console.error('Error loading papers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPaper = async (paper: Omit<Paper, 'id'>) => {
    try {
      await ipcRenderer.invoke('add-paper', paper);
      await loadPapers();
      setCurrentView('list');
    } catch (error) {
      console.error('Error adding paper:', error);
      alert('Failed to add paper');
    }
  };

  const handleUpdatePaper = async (id: number, updates: Partial<Paper>) => {
    try {
      await ipcRenderer.invoke('update-paper', id, updates);
      await loadPapers();
      // Update selected paper if it's the one being updated
      if (selectedPaper?.id === id) {
        setSelectedPaper({ ...selectedPaper, ...updates });
      }
    } catch (error) {
      console.error('Error updating paper:', error);
      alert('Failed to update paper');
    }
  };

  const handleDeletePaper = async (id: number) => {
    try {
      await ipcRenderer.invoke('delete-paper', id);
      await loadPapers();
      if (selectedPaper?.id === id) {
        setSelectedPaper(null);
        setCurrentView('list');
      }
    } catch (error) {
      console.error('Error deleting paper:', error);
      alert('Failed to delete paper');
    }
  };

  const handleSelectPaper = (paper: Paper) => {
    setSelectedPaper(paper);
    setCurrentView('details');
  };

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      try {
        const results = await ipcRenderer.invoke('search-papers', searchQuery);
        setPapers(results);
      } catch (error) {
        console.error('Error searching papers:', error);
      }
    } else {
      loadPapers();
    }
  };

  const handleFilter = async (status: string) => {
    setFilterStatus(status);
    if (status === 'all') {
      loadPapers();
    } else {
      try {
        const filtered = await ipcRenderer.invoke('filter-papers', status);
        setPapers(filtered);
      } catch (error) {
        console.error('Error filtering papers:', error);
      }
    }
  };

  const getFilteredPapers = () => {
    if (filterStatus === 'all') {
      return papers;
    }
    return papers.filter((paper) => paper.status === filterStatus);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Personal Research Paper Dashboard</h1>
        <div style={styles.headerActions}>
          <button
            style={styles.addButton}
            onClick={() => setCurrentView('add')}
          >
            + Add Paper
          </button>
        </div>
      </header>

      <div style={styles.controls}>
        <div style={styles.searchContainer}>
          <input
            style={styles.searchInput}
            type="text"
            placeholder="Search papers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button style={styles.searchButton} onClick={handleSearch}>
            Search
          </button>
          {searchQuery && (
            <button
              style={styles.clearButton}
              onClick={() => {
                setSearchQuery('');
                loadPapers();
              }}
            >
              Clear
            </button>
          )}
        </div>

        <div style={styles.filterContainer}>
          <label style={styles.filterLabel}>Filter by status:</label>
          <select
            style={styles.filterSelect}
            value={filterStatus}
            onChange={(e) => handleFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value={PaperStatus.TO_READ}>To Read</option>
            <option value={PaperStatus.READING}>Reading</option>
            <option value={PaperStatus.COMPLETED}>Completed</option>
            <option value={PaperStatus.ON_HOLD}>On Hold</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div style={styles.loading}>Loading papers...</div>
      ) : (
        <div style={styles.content}>
          <div style={styles.leftPanel}>
            <PaperList
              papers={getFilteredPapers()}
              onSelectPaper={handleSelectPaper}
              onDeletePaper={handleDeletePaper}
              selectedPaperId={selectedPaper?.id}
            />
          </div>

          <div style={styles.rightPanel}>
            {currentView === 'add' && (
              <AddPaperForm
                onAdd={handleAddPaper}
                onCancel={() => setCurrentView('list')}
              />
            )}
            {currentView === 'details' && (
              <PaperDetails
                paper={selectedPaper}
                onUpdate={handleUpdatePaper}
                onClose={() => {
                  setSelectedPaper(null);
                  setCurrentView('list');
                }}
              />
            )}
            {currentView === 'list' && !selectedPaper && (
              <div style={styles.emptyState}>
                <h2>Welcome to Research Paper Dashboard</h2>
                <p>Select a paper from the list or add a new one to get started.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#e9ecef',
  },
  header: {
    backgroundColor: '#343a40',
    color: 'white',
    padding: '20px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  title: {
    margin: 0,
    fontSize: '24px',
  },
  headerActions: {
    display: 'flex',
    gap: '10px',
  },
  addButton: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  controls: {
    padding: '20px 30px',
    backgroundColor: 'white',
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
    borderBottom: '1px solid #dee2e6',
  },
  searchContainer: {
    display: 'flex',
    gap: '10px',
    flex: 1,
  },
  searchInput: {
    flex: 1,
    padding: '10px',
    border: '1px solid #ced4da',
    borderRadius: '4px',
    fontSize: '14px',
  },
  searchButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  clearButton: {
    padding: '10px 20px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  filterContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  filterLabel: {
    fontSize: '14px',
    color: '#495057',
    fontWeight: 'bold',
  },
  filterSelect: {
    padding: '10px',
    border: '1px solid #ced4da',
    borderRadius: '4px',
    fontSize: '14px',
  },
  content: {
    flex: 1,
    display: 'flex',
    padding: '20px',
    gap: '20px',
    overflow: 'hidden',
  },
  leftPanel: {
    flex: 1,
    minWidth: '400px',
    overflow: 'auto',
  },
  rightPanel: {
    flex: 1,
    minWidth: '400px',
    overflow: 'auto',
  },
  loading: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '18px',
    color: '#666',
  },
  emptyState: {
    padding: '60px',
    textAlign: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default Dashboard;
