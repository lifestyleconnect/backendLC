const express = require('express');

const bcrypt = require('bcryptjs');

const knex = require('../knex');

const genomeLink = require('genomelink-node');

const router = express.Router();

router.post('/users', async (req, res) => {
  try {
    const credentials = req.body;
    if (!credentials.email || !credentials.password || !credentials.username) {
      res.sendStatus(400);
    } else {
      credentials.hashed_password = await bcrypt.hash(credentials.password, 12);
      delete credentials.password;
      const genomeData = {};
      const eyeColor = await genomeLink.Report.fetch({
        name: 'eye-color',
        population: 'european',
        token: 'GENOMELINKTEST001',
      });
      const beardThickness = await genomeLink.Report.fetch({
        name: 'beard-thickness',
        population: 'european',
        token: 'GENOMELINKTEST001',
      });
      const weight = await genomeLink.Report.fetch({
        name: 'weight',
        population: 'european',
        token: 'GENOMELINKTEST001',
      });
      const bmi = await genomeLink.Report.fetch({
        name: 'bmi',
        population: 'european',
        token: 'GENOMELINKTEST001',
      });
      const redHair = await genomeLink.Report.fetch({
        name: 'red-hair',
        population: 'european',
        token: 'GENOMELINKTEST001',
      });
      const blackHair = await genomeLink.Report.fetch({
        name: 'black-hair',
        population: 'european',
        token: 'GENOMELINKTEST001',
      });
      const lobeSize = await genomeLink.Report.fetch({
        name: 'lobe-size',
        population: 'european',
        token: 'GENOMELINKTEST001',
      });
      const pigmentation = await genomeLink.Report.fetch({
        name: 'skin-pigmentation',
        population: 'european',
        token: 'GENOMELINKTEST001',
      });
      const malePatternBaldness = await genomeLink.Report.fetch({
        name: 'male-pattern-baldness-aga',
        population: 'european',
        token: 'GENOMELINKTEST001',
      });
      const freckles = await genomeLink.Report.fetch({
        name: 'freckles',
        population: 'european',
        token: 'GENOMELINKTEST001',
      });
      const noveltySeeking = await genomeLink.Report.fetch({
        name: 'novelty-seeking',
        population: 'european',
        token: 'GENOMELINKTEST001',
      });
      genomeData.eye_color = eyeColor.summary.score;
      genomeData.beard_thickness = beardThickness.summary.score;
      genomeData.weight = weight.summary.score;
      genomeData.bmi = bmi.summary.score;
      genomeData.red_hair = redHair.summary.score;
      genomeData.black_hair = blackHair.summary.score;
      genomeData.lobe_size = lobeSize.summary.score;
      genomeData.skin_pigmentation = pigmentation.summary.score;
      genomeData.male_pattern_baldness = malePatternBaldness.summary.score;
      genomeData.freckles = freckles.summary.score;
      genomeData.novelty_seeking = noveltySeeking.summary.score;
      credentials.genetic_data = genomeData;
      const record = await knex('users')
        .insert(credentials)
        .returning('*');
      return res.json(record[0]);
    }
  } catch (error) {
    res.sendStatus(500);
  }
});
module.exports = router;
