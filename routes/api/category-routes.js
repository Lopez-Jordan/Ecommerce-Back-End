const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try{
    const categoryData = await Category.findAll({
      include: [{ model: Product }] 
    });
    res.status(200).json(categoryData);
  }
  catch (error){
    res.status(404).send(error);
  }
});

router.get('/:id', async (req, res) => {
  try{
    const categoryDataById = await Category.findByPk(req.params.id,{
      include: [{model: Product}]
    });
    res.status(200).json(categoryDataById);
  }
  catch (error) {
    res.status(400).send(error);
  }
});

router.post('/', async (req, res) => {
  try{
    const newCategory = req.body;
    await Category.create(newCategory);
    res.status(200).send('Here is your new category: ' + newCategory);
  }
  catch (error){
    res.status(400).send(error);
  }
});

router.put('/:id', async (req, res) => {
  try{
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(updatedCategory);
  }
  catch (error){
    res.status(400).send(erorr);
  }
});

router.delete('/:id', async (req, res) => {
  try{
    await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).send('Category successfully deleted!');
  }
  catch (error){
    res.status(404).send(error)
  }
});

module.exports = router;
