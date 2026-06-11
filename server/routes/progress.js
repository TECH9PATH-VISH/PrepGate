import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// Get all progress for logged-in user
router.get('/get', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const progressList = await prisma.progress.findMany({
      where: { userId }
    });

    res.status(200).json(progressList);
  } catch (error) {
    console.error('Fetch progress error:', error);
    res.status(500).json({ error: 'Failed to fetch syllabus progress' });
  }
});

// Update/Upsert progress for a topic
router.post('/update', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { topicId, status, pyqSolved, notes } = req.body;

    if (!topicId) {
      return res.status(400).json({ error: 'Topic ID is required' });
    }

    const updatedRecord = await prisma.progress.upsert({
      where: {
        userId_topicId: {
          userId,
          topicId
        }
      },
      update: {
        status: status !== undefined ? status : undefined,
        pyqSolved: pyqSolved !== undefined ? pyqSolved : undefined,
        notes: notes !== undefined ? notes : undefined
      },
      create: {
        userId,
        topicId,
        status: status || 'Not Started',
        pyqSolved: pyqSolved || false,
        notes: notes || ''
      }
    });

    res.status(200).json(updatedRecord);
  } catch (error) {
    console.error('Update progress error:', error);
    res.status(500).json({ error: 'Failed to update syllabus progress' });
  }
});

export default router;
