const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
router.get('/', async (req, res) => {
  try {
    const categoriesData = await Category.findAll({
      include:[{model: Product}]
    });
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categoryId = await Category.findByPk(req.params.id, {
      // JOIN with travellers, using the Trip through table
      include: [{ model: Product }]
    });

    if (!categoryId) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryId);
  } catch (err) {
    res.status(500).json(err);
  }
});


  // create a new category
  router.post('/', async (req, res) => {
    try {
      const postCategory = await Category.create(req.body);
      res.status(200).json(postCategory);
    } catch (err) {
      res.status(400).json(err);
    }
  });

router.put('/:id', async (req, res) => {

  // update a category by its `id` value
  try {
    const categoryUpdate = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
      });
      if (!categoryUpdate) {
        res.status(404).json({ message: 'No category found with this id!' });
        return;
      }
  
      res.status(200).json(categoryUpdate);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  


  // delete a category by its `id` value
  router.delete('/:id', async (req, res) => {
    try {
      const categoryDestroy = await Category.destroy({
        where: {
          id: req.params.id
        }
      });
  
      if (!categoryDestroy) {
        res.status(404).json({ message: 'No category found with this id!' });
        return;
      }
  
      res.status(200).json(categoryDestroy);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  


module.exports = router;
