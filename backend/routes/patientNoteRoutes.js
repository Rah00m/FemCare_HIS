const express = require('express');
const router = express.Router();
const patientNoteController = require('../controllers/patientNoteController');
const { verifyTokenMiddleware } = require('../utils/authMiddleware');

// Get all notes for a patient
router.get('/:patientId/notes', verifyTokenMiddleware, patientNoteController.getPatientNotes);

// Create a new note
router.post('/:patientId/notes', verifyTokenMiddleware, patientNoteController.createPatientNote);

// Update a note
router.put('/:patientId/notes/:noteId', verifyTokenMiddleware, patientNoteController.updatePatientNote);

// Delete a note
router.delete('/:patientId/notes/:noteId', verifyTokenMiddleware, patientNoteController.deletePatientNote);

module.exports = router; 