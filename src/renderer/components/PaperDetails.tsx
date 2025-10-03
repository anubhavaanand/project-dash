import React, { useState, useEffect } from 'react';
import { Paper, PaperStatus } from '../../types';

interface PaperDetailsProps {
  paper: Paper | null;
  onUpdate: (id: number, updates: Partial<Paper>) => void;
  onClose: () => void;
}

const PaperDetails: React.FC<PaperDetailsProps> = ({ paper, onUpdate, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPaper, setEditedPaper] = useState<Partial<Paper>>({});

  useEffect(() => {
    if (paper) {
      setEditedPaper(paper);
      setIsEditing(false);
    }
  }, [paper]);

  if (!paper) {
    return (
      <div style={styles.container}>
        <div style={styles.emptyState}>
          <p>Select a paper to view details</p>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    if (paper.id) {
      onUpdate(paper.id, editedPaper);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedPaper(paper);
    setIsEditing(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Paper Details</h2>
        <div style={styles.actions}>
          {isEditing ? (
            <>
              <button style={styles.saveButton} onClick={handleSave}>
                Save
              </button>
              <button style={styles.cancelButton} onClick={handleCancel}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <button style={styles.editButton} onClick={() => setIsEditing(true)}>
                Edit
              </button>
              <button style={styles.closeButton} onClick={onClose}>
                Close
              </button>
            </>
          )}
        </div>
      </div>

      <div style={styles.content}>
        <div style={styles.field}>
          <label style={styles.label}>Title:</label>
          {isEditing ? (
            <input
              style={styles.input}
              value={editedPaper.title || ''}
              onChange={(e) => setEditedPaper({ ...editedPaper, title: e.target.value })}
            />
          ) : (
            <p style={styles.value}>{paper.title}</p>
          )}
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Authors:</label>
          {isEditing ? (
            <input
              style={styles.input}
              value={editedPaper.authors || ''}
              onChange={(e) => setEditedPaper({ ...editedPaper, authors: e.target.value })}
            />
          ) : (
            <p style={styles.value}>{paper.authors}</p>
          )}
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Journal:</label>
          {isEditing ? (
            <input
              style={styles.input}
              value={editedPaper.journal || ''}
              onChange={(e) => setEditedPaper({ ...editedPaper, journal: e.target.value })}
            />
          ) : (
            <p style={styles.value}>{paper.journal || 'N/A'}</p>
          )}
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Year:</label>
          {isEditing ? (
            <input
              style={styles.input}
              type="number"
              value={editedPaper.year || ''}
              onChange={(e) => setEditedPaper({ ...editedPaper, year: parseInt(e.target.value) })}
            />
          ) : (
            <p style={styles.value}>{paper.year}</p>
          )}
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Status:</label>
          {isEditing ? (
            <select
              style={styles.select}
              value={editedPaper.status || ''}
              onChange={(e) => setEditedPaper({ ...editedPaper, status: e.target.value as PaperStatus })}
            >
              <option value={PaperStatus.TO_READ}>To Read</option>
              <option value={PaperStatus.READING}>Reading</option>
              <option value={PaperStatus.COMPLETED}>Completed</option>
              <option value={PaperStatus.ON_HOLD}>On Hold</option>
            </select>
          ) : (
            <p style={styles.value}>{paper.status}</p>
          )}
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Deadline:</label>
          {isEditing ? (
            <input
              style={styles.input}
              type="date"
              value={editedPaper.deadline || ''}
              onChange={(e) => setEditedPaper({ ...editedPaper, deadline: e.target.value })}
            />
          ) : (
            <p style={styles.value}>{paper.deadline || 'N/A'}</p>
          )}
        </div>

        <div style={styles.field}>
          <label style={styles.label}>URL:</label>
          {isEditing ? (
            <input
              style={styles.input}
              value={editedPaper.url || ''}
              onChange={(e) => setEditedPaper({ ...editedPaper, url: e.target.value })}
            />
          ) : (
            <p style={styles.value}>
              {paper.url ? (
                <a href={paper.url} target="_blank" rel="noopener noreferrer">
                  {paper.url}
                </a>
              ) : (
                'N/A'
              )}
            </p>
          )}
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Tags:</label>
          {isEditing ? (
            <input
              style={styles.input}
              value={editedPaper.tags || ''}
              onChange={(e) => setEditedPaper({ ...editedPaper, tags: e.target.value })}
              placeholder="Comma-separated tags"
            />
          ) : (
            <p style={styles.value}>{paper.tags || 'N/A'}</p>
          )}
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Notes:</label>
          {isEditing ? (
            <textarea
              style={styles.textarea}
              value={editedPaper.notes || ''}
              onChange={(e) => setEditedPaper({ ...editedPaper, notes: e.target.value })}
              rows={6}
            />
          ) : (
            <p style={styles.value}>{paper.notes || 'N/A'}</p>
          )}
        </div>
      </div>
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
  emptyState: {
    textAlign: 'center',
    padding: '40px',
    color: '#666',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    borderBottom: '2px solid #dee2e6',
    paddingBottom: '15px',
  },
  title: {
    margin: 0,
    color: '#333',
  },
  actions: {
    display: 'flex',
    gap: '10px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '5px',
    color: '#555',
    fontSize: '14px',
  },
  value: {
    margin: 0,
    padding: '10px',
    backgroundColor: 'white',
    borderRadius: '4px',
    color: '#333',
  },
  input: {
    padding: '10px',
    border: '1px solid #ced4da',
    borderRadius: '4px',
    fontSize: '14px',
  },
  select: {
    padding: '10px',
    border: '1px solid #ced4da',
    borderRadius: '4px',
    fontSize: '14px',
  },
  textarea: {
    padding: '10px',
    border: '1px solid #ced4da',
    borderRadius: '4px',
    fontSize: '14px',
    fontFamily: 'inherit',
    resize: 'vertical',
  },
  editButton: {
    padding: '8px 16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  saveButton: {
    padding: '8px 16px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  cancelButton: {
    padding: '8px 16px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  closeButton: {
    padding: '8px 16px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default PaperDetails;
