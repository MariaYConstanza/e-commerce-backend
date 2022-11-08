const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll();
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Tag, through: Product, as: 'tag_products' }]
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tags were found with this id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST, POST, DELETE declarations
router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// RESEARCH: look up update router
router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const tagData = await Tag.update(req.params.tagId)

  if (!tagData) return res.status(404).json({})
 
  // LOOK: search up this function array
  tag.name = req.body.name
  res.json(tagData)
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
