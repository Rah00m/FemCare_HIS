import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PatientNotes = ({ patientId, user }) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editedNoteText, setEditedNoteText] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user && user.id === parseInt(patientId)) {
      fetchNotes();
    }
  }, [patientId, user]);

  // جلب الملاحظات الخاصة بالمريض
  const fetchNotes = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/${patientId}/notes`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setNotes(response.data);
      setError('');
    } catch (error) {
      setError('Failed to fetch notes');
    }
  };

  // إضافة ملاحظة جديدة
  const handleAddNote = async () => {
    if (!newNote.trim()) return;

    try {
      const response = await axios.post(
        `http://localhost:5000/api/${patientId}/notes`,
        { content: newNote },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      fetchNotes();
      setNotes([response.data, ...notes]);
      setNewNote('');
      setError('');
    } catch (error) {
      setError('Failed to add note');
    }
  };

  // تعديل الملاحظة
  const handleUpdateNote = async (noteId) => {
    if (!editedNoteText.trim()) return;

    try {
      const response = await axios.put(
        `http://localhost:5000/api/${patientId}/notes/${noteId}`,
                { content: editedNoteText },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setNotes(
        notes.map((note) =>
          note.id === noteId ? { ...note, content: response.data.content } : note
        )
      );
      setEditingNoteId(null);
      setEditedNoteText('');
      setError('');
    } catch (error) {
      setError('Failed to update note');
    }
  };

  // حذف الملاحظة
  const handleDeleteNote = async (noteId) => {
    try {
      await axios.delete(`http://localhost:5000/api/${patientId}/notes/${noteId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setNotes(notes.filter((note) => note.id !== noteId));
      setError('');
    } catch (error) {
      setError('Failed to delete note');
    }
  };

  // إلغاء تعديل الملاحظة
  const handleCancelEditNote = () => {
    setEditingNoteId(null);
    setEditedNoteText('');
  };

  // التحقق من الأذونات قبل عرض الملاحظات
  if (!user || user.id !== parseInt(patientId)) {
    return (
      <div className="content-section">
        <h2>Patient Notes</h2>
        <p className="text-red-500">You are not authorized to view or manage these notes.</p>
      </div>
    );
  }

  return (
    <div className="content-section">
      <h2>Patient Notes</h2>
      <div className="notes-container">
  {notes?.length > 0 ? (
    notes.map((note, index) => (
      <div key={note.id} className="note-item">
        {editingNoteId === note.id ? (
          <div className="note-edit-form">
            <textarea
              value={editedNoteText}
              onChange={(e) => setEditedNoteText(e.target.value)}
              rows="3"
            />
            <div className="note-edit-actions">
              <button
                className="save-button small"
                onClick={() => handleUpdateNote(note.id)}
              >
                Save
              </button>
              <button
                className="cancel-button small"
                onClick={handleCancelEditNote}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="note-text">{note.content}</div>
            <div className="note-meta">
              {note.doctor || 'Dr. Smith'} • {new Date(note.date).toLocaleDateString()}
            </div>
            <div className="note-actions">
              <button
                className="edit-button small"
                onClick={() => {
                  setEditingNoteId(note.id);
                  setEditedNoteText(note.content);
                }}
              >
                Edit
              </button>
              <button
                className="delete-button small"
                onClick={() => handleDeleteNote(note.id)}
              >
                Delete
              </button>
            </div>
          </>
        )}
        {index < notes.length - 1 && <hr className="note-divider" />}
      </div>
    ))
  ) : (
    <p>No notes available</p>
  )}
</div>


      <div className="add-note-section">
        <h3>Add New Note</h3>
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Write your note here..."
          rows="4"
        />
        <button className="add-note-button" onClick={handleAddNote}>
          Add Note
        </button>
      </div>
    </div>
  );
};

export default PatientNotes;
