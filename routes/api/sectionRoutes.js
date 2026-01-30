const router = require('express').Router();
const { MenuSection, MenuItem } = require('../../models');

// GET /api/sections
router.get('/', async (req, res) => {
  try {
    const sectionData = await MenuSection.findAll({
      include: [{ model: MenuItem }],
    });
    res.status(200).json(sectionData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET /api/sections/:id
router.get('/:id', async (req, res) => {
  try {
    const sectionData = await MenuSection.findByPk(req.params.id, {
      include: [{ model: MenuItem }],
    });

    if (!sectionData) {
      res.status(404).json({ message: 'No section found with that id!' });
      return;
    }

    res.status(200).json(sectionData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST /api/sections
router.post('/', async (req, res) => {
  try {
    const sectionData = await MenuSection.create(req.body);
    res.status(200).json(sectionData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT /api/sections/:id
router.put('/:id', async (req, res) => {
  try {
    const sectionData = await MenuSection.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!sectionData[0]) {
      res.status(404).json({ message: 'No section found with that id!' });
      return;
    }

    res.status(200).json(sectionData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE /api/sections/:id
router.delete('/:id', async (req, res) => {
  try {
    const sectionData = await MenuSection.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!sectionData) {
      res.status(404).json({ message: 'No section found with that id!' });
      return;
    }

    res.status(200).json(sectionData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
