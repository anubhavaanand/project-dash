import React, { useState } from 'react';
import { Paper, PaperStatus } from '../../types';

interface AddPaperFormProps {
  onAdd: (paper: Omit<Paper, 'id'>) => void;
  onCancel: () => void;
}

const AddPaperForm: React.FC<AddPaperFormProps> = ({ onAdd, onCancel }) => {
  const [formData, setFormData] = useState<Omit<Paper, 'id'>>({
    title: '',
    authors: '',
    journal: '',
    year: new Date().getFullYear(),
    status: PaperStatus.TO_READ,
    deadline: '',
    notes: '',
    tags: '',
    url: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.authors) {
      onAdd(formData);
      // Reset form
      setFormData({
        title: '',
        authors: '',
        journal: '',
        year: new Date().getFullYear(),
        status: PaperStatus.TO_READ,
        deadline: '',
        notes: '',
        tags: '',
        url: '',
      });
    } else {
      alert('Please fill in required fields: Title and Authors');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Add New Research Paper</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.field}>
          <label style={styles.label}>
            Title: <span style={styles.required}>*</span>
          </label>
          <input
            style={styles.input}
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter paper title"
            required
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>
            Authors: <span style={styles.required}>*</span>
          </label>
          <input
            style={styles.input}
            type="text"
            value={formData.authors}
            onChange={(e) => setFormData({ ...formData, authors: e.target.value })}
            placeholder="Enter author names"
            required
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Journal:</label>
          <input
            style={styles.input}
            type="text"
            value={formData.journal}
            onChange={(e) => setFormData({ ...formData, journal: e.target.value })}
            placeholder="Enter journal name"
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Year:</label>
          <input
            style={styles.input}
            type="number"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
            min="1900"
            max={new Date().getFullYear() + 10}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Status:</label>
          <select
            style={styles.select}
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as PaperStatus })}
          >
            <option value={PaperStatus.TO_READ}>To Read</option>
            <option value={PaperStatus.READING}>Reading</option>
            <option value={PaperStatus.COMPLETED}>Completed</option>
            <option value={PaperStatus.ON_HOLD}>On Hold</option>
          </select>
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Deadline:</label>
          <input
            style={styles.input}
            type="date"
            value={formData.deadline}
            onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>URL:</label>
          <input
            style={styles.input}
            type="url"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            placeholder="https://..."
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Tags:</label>
          <input
            style={styles.input}
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="Comma-separated tags"
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Notes:</label>
          <textarea
            style={styles.textarea}
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Add any notes about the paper"
            rows={4}
          />
        </div>

        <div style={styles.actions}>
          <button type="submit" style={styles.submitButton}>
            Add Paper
          </button>
          <button type="button" style={styles.cancelButton} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
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
  form: {
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
  required: {
    color: '#dc3545',
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
  actions: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px',
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default AddPaperForm;
