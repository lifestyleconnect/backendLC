// password is snafu
exports.seed = knex =>
  // Deletes ALL existing entries
  knex('table_name')
    .del()
    .then(() =>
      // Inserts seed entries
      knex('table_name').insert([
        {
          id: 1,
          username: 'foobar',
          email: 'foobar@gmail.com',
          hashed_password: '$2y$10$H44kcPiZQ.Xq7kSaJ6M3T.zhk82rAK9HXVPPe1gJAE7mYBUeLeNhq',
          avatar_url:
            'https://news.nationalgeographic.com/content/dam/news/photos/000/755/75552.ngsversion.1422285553360.adapt.1900.1.jpg',
          genetic_data: {
            eye_color: 'Tend to not have brown eyes, slightly',
            beard_thickness: 'Intermediate',
            skin_pigmentation: 'Tend to get less pigmentation',
            freckles: 'Intermediate',
          },
        },
      ]));
