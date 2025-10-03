import React from 'react';
import { Paper } from '../../types';

interface PaperListProps {
  papers: Paper[];
  onSelectPaper: (paper: Paper) => void;
  onDeletePaper: (id: number) => void;
  selectedPaperId?: number;
}

const PaperList: React.FC<PaperListProps> = ({
  papers,
  onSelectPaper,
  onDeletePaper,
  selectedPaperId,
}) => {
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'To Read':
        return '#f0ad4e';
      case 'Reading':
        return '#5bc0de';
      case 'Completed':
        return '#5cb85c';
      case 'On Hold':
        return '#d9534f';
      default:
        return '#999';
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Research Papers</h2>
      {papers.length === 0 ? (
        <div style={styles.emptyState}>
          <p>No papers found. Add your first research paper!</p>
        </div>
      ) : (
        <div style={styles.list}>
          {papers.map((paper) => (
            <div
              key={paper.id}
              style={{
                ...styles.paperItem,
                ...(selectedPaperId === paper.id ? styles.selectedPaper : {}),
              }}
              onClick={() => onSelectPaper(paper)}
            >
              <div style={styles.paperHeader}>
                <h3 style={styles.paperTitle}>{paper.title}</h3>
                <button
                  style={styles.deleteButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (window.confirm('Are you sure you want to delete this paper?')) {
                      onDeletePaper(paper.id!);
                    }
                  }}
                >
                  Delete
                </button>
              </div>
              <p style={styles.paperAuthors}>{paper.authors}</p>
              <div style={styles.paperMeta}>
                <span
                  style={{
                    ...styles.statusBadge,
                    backgroundColor: getStatusColor(paper.status),
                  }}
                >
                  {paper.status}
                </span>
                <span style={styles.year}>{paper.year}</span>
                {paper.deadline && (
                  <span style={styles.deadline}>Deadline: {paper.deadline}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    height: '100%',
    overflow: 'auto',
  },
  header: {
    marginTop: 0,
    marginBottom: '20px',
    color: '#333',
  },
  emptyState: {
    textAlign: 'center',
    padding: '40px',
    color: '#666',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  paperItem: {
    padding: '15px',
    backgroundColor: 'white',
    borderRadius: '6px',
    cursor: 'pointer',
    border: '2px solid transparent',
    transition: 'all 0.2s',
  },
  selectedPaper: {
    border: '2px solid #007bff',
    backgroundColor: '#e7f3ff',
  },
  paperHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  paperTitle: {
    margin: 0,
    marginBottom: '8px',
    fontSize: '16px',
    color: '#333',
  },
  paperAuthors: {
    margin: 0,
    marginBottom: '10px',
    fontSize: '14px',
    color: '#666',
  },
  paperMeta: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    fontSize: '13px',
  },
  statusBadge: {
    padding: '4px 10px',
    borderRadius: '12px',
    color: 'white',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  year: {
    color: '#666',
  },
  deadline: {
    color: '#d9534f',
    fontWeight: 'bold',
  },
  deleteButton: {
    padding: '6px 12px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
  },
};

export default PaperList;
