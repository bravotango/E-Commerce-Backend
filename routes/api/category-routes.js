const router = require('express').Router();
const { response } = require('express');
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
  const newCategoryName = req.body.category_name;
  const updateId = req.params.id;
  try {
    await Category.update(
      {
        category_name: newCategoryName,
      },
      {
        where: { id: updateId },
      }
    );
    res
      .status(200)
      .json(
        `Updated name to '${newCategoryName}' for category_id: ${updateId}`
      );
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const deleteCategoryId = req.params.id;
  try {
    const deleteCategory = await Category.destroy({
      where: { id: deleteCategoryId },
    });

    if (!deleteCategory) {
      res
        .status(404)
        .json(
          `Category id: ${deleteCategoryId} not found, nothing was deleted.`
        );
    }

    res.status(200).json(`Category id: ${deleteCategoryId} has been destroyed`);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
