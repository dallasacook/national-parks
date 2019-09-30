import { Router } from 'express';
import Park from '../models/park';

const router = Router();

router.get('/', async (req, res) => {
  const parks = await Park.findAll({
    order: [
      ['name', 'ASC']
    ]
  });
  return res.send(parks);
});

router.get('/:parkId', async (req, res) => {
  const park = await Park.findByPk(req.params.parkId);
  return res.send(park);
});

router.post('/', async (req, res) => {
  const park = await Park.create({
    name: req.body.name,
    type: req.body.type,
    location: req.body.location
  });
  return res.send(park);
});

router.put('/:parkId', async (req, res) => {
  console.log(req.body)
  const park = await Park.update({
    name: req.body.name,
    type: req.body.type,
    location: req.body.location
  }, {
    where: { id: req.params.parkId }
  });
  return res.send(park);
});

router.delete('/:parkId', async (req, res) => {
  const result = await Park.destroy({
    where: { id: req.params.parkId }
  });
  return res.send(true);
});

export default router;
