const router = require('express').Router();
const { MenuItem, MenuSection, Tag, MenuItemTag } = require('../../models');

// GET /api/items
router.get('/', async (req, res) => {
  try {
    const itemData = await MenuItem.findAll({
      include: [{ model: MenuSection }, { model: Tag }],
    });
    res.status(200).json(itemData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET /api/items/:id
router.get('/:id', async (req, res) => {
  try {
    const itemData = await MenuItem.findByPk(req.params.id, {
      include: [{ model: MenuSection }, { model: Tag }],
    });

    if (!itemData) {
      res.status(404).json({ message: 'No item found with that id!' });
      return;
    }

    res.status(200).json(itemData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST /api/items
// Body can include optional: tagIds: [1,2,3]
router.post('/', async (req, res) => {
  try {
    const item = await MenuItem.create(req.body);

    // if there's tag ids, create associations
    if (req.body.tagIds && req.body.tagIds.length) {
      const itemTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          item_id: item.id,
          tag_id,
        };
      });
      await MenuItemTag.bulkCreate(itemTagIdArr);
    }

    res.status(200).json(item);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT /api/items/:id
router.put('/:id', async (req, res) => {
  try {
    await MenuItem.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    // if tagIds are provided, update the associations
    if (req.body.tagIds && req.body.tagIds.length) {
      const itemTags = await MenuItemTag.findAll({
        where: { item_id: req.params.id },
      });

      const itemTagIds = itemTags.map(({ tag_id }) => tag_id);
      const newItemTags = req.body.tagIds
        .filter((tag_id) => !itemTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            item_id: req.params.id,
            tag_id,
          };
        });

      const itemTagsToRemove = itemTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      await Promise.all([
        MenuItemTag.destroy({ where: { id: itemTagsToRemove } }),
        MenuItemTag.bulkCreate(newItemTags),
      ]);
    }

    const updatedItem = await MenuItem.findByPk(req.params.id, {
      include: [{ model: Tag }],
    });

    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE /api/items/:id
router.delete('/:id', async (req, res) => {
  try {
    const itemData = await MenuItem.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!itemData) {
      res.status(404).json({ message: 'No item found with that id!' });
      return;
    }

    res.status(200).json(itemData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
