const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags
// be sure to include its associated Product data
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({ include: [{Product}]});
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find a single tag by its `id`
// be sure to include its associated Product data
router.get('/:id', async (req, res) => {
  try {
    const tagId = await Tag.findByPk(req.params.id, {
      // JOIN with travellers, using the Trip through table
      include: [{ model: Product }]
    });

    if (!tagId) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(productId);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new tag
router.post('/', async (req, res) => {
  try {
    const tagCategory = await Tag.create(req.body);
    res.status(200).json(tagCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const tagUpdate = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
      });
      if (!tagUpdate) {
        res.status(404).json({ message: 'No tag found with this id!' });
        return;
      }
  
      res.status(200).json(tagUpdate);
    } catch (err) {
      res.status(500).json(err);
    }
  });


  // delete on tag by its `id` value
  router.delete('/:id', async (req, res) => {
    try {
      const tagDestroy = await Tag.destroy({
        where: {
          id: req.params.id
        }
      });
  
      if (!tagDestroy) {
        res.status(404).json({ message: 'No tag found with this id!' });
        return;
      }
  
      res.status(200).json(tagDestroy);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
