const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // with its associated Product data
  try {
    const tagsData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // with its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tag = await Tag.create(req.body);
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const updateId = req.params.id;
  const newTagName = req.body.tag_name;
  try {
    await Tag.update(
      {
        tag_name: newTagName,
      },
      {
        where: {
          id: updateId,
        },
      }
    );
    res
      .status(200)
      .send(`The tag id: ${updateId} has been updated to: ${newTagName}`);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  const deleteId = req.params.id;
  try {
    const tagDelete = await Tag.destroy({
      where: { id: deleteId },
    });
    res.status(200).send(`The tag with id: ${deleteId} has been destroyed`);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
