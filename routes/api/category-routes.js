const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
router.get('/', async (req, res) => {
  // find all categories
  // with its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // with its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const updateId = req.params.id;
  try {
    await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: { id: updateId },
      }
    );
    res
      .status(200)
      .send(`Updated category id: ${updateId} to ${req.body.category_name}`);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const destroyId = req.params.id;
  try {
    await Category.destroy({
      where: { id: destroyId },
    });
    res.status(200).send(`Category id: ${destroyId} has been destroyed`);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
