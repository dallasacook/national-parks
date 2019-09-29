import { Router } from 'express';
import ParkType from '../models/park-type';

const router = Router();

router.get('/', async (req, res) => {
  const parkTypes = await ParkType.findAll();
  return res.send(parkTypes);
});

router.get('/:parkTypeId', async (req, res) => {
  const parkType = await ParkType.findByPk(req.params.parkTypeId);
  return res.send(parkType);
});

router.post('/', async (req, res) => {
  const parkType = await ParkType.create({
    term: req.body.term,
    description: req.body.description
  });
  return res.send(parkType);
});

router.delete('/:parkTypeId', async (req, res) => {
  const result = await ParkType.destroy({
    where: { id: req.params.parkTypeId }
  });
  return res.send(true);
});

export default router;
