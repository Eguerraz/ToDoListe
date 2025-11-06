const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { Task } = require('../Model'); // ✅ correct


// ---------------------------
// GET /tasks
// ---------------------------
router.get('/', async (req, res) => {
  try {
    const { title, page } = req.query;
    const where = {};

    if (title) {
      where.title = { [Op.like]: `%${title}%` };
    }

    const limit = 10;
    const offset = page ? (parseInt(page) - 1) * limit : 0;

    const tasks = await Task.findAll({
      attributes: ['title', 'description'], // uniquement les champs souhaités
      where,
      limit,
      offset,
      order: [['title', 'ASC']] // tri par titre
    });

    res.json(tasks);
  } catch (error) {
    console.error("🔥 ERREUR DANS /tasks :", error);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

// ---------------------------
// GET /tasks/:id
// ---------------------------
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByPk(id, {
      attributes: ['title', 'description']
    });

    if (!task) return res.status(404).json({ error: 'Tâche non trouvée.' });

    res.json(task);
  } catch (error) {
    console.error("🔥 ERREUR DANS /tasks/:id :", error);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

// ---------------------------
// POST /tasks
// ---------------------------
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Le champ titre est requis.' });
    }

    const newTask = await Task.create({
      title,
      description: description || ''
    });

    res.status(201).json({ message: 'Tâche créée avec succès.', task: newTask });
  } catch (error) {
    console.error("🔥 ERREUR DANS POST /tasks :", error);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

// ---------------------------
// PATCH /tasks/:id
// ---------------------------
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const task = await Task.findByPk(id);

    if (!task) return res.status(404).json({ error: 'Tâche non trouvée.' });

    await task.update({
      title: title ?? task.title,
      description: description ?? task.description
    });

    res.json({ message: 'Tâche mise à jour avec succès.', task });
  } catch (error) {
    console.error("🔥 ERREUR DANS PATCH /tasks/:id :", error);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

// ---------------------------
// DELETE /tasks/:id
// ---------------------------
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Task.destroy({ where: { id } });

    if (!deleted) return res.status(404).json({ error: 'Tâche non trouvée.' });

    res.json({ message: 'Tâche supprimée avec succès.' });
  } catch (error) {
    console.error("🔥 ERREUR DANS DELETE /tasks/:id :", error);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

module.exports = router;
