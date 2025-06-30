import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const corsOptions = {
  origin: ['http://localhost:5173'], // Adjust this to your frontend's URL
  // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE' //,
  // credentials: true,
};

app.use(cors(corsOptions));

app.get('/api', (_, res) => {
  res.json({ fruits: ["apple", "banana", "orange"] });
});

app.get('/api/fruits', (_, res) => {
  res.json({ fruits: ["apple", "strawberry", "orange"] });
});

app.get('/api/vegetables', (_, res) => {
  res.json({ vegetables: ["carrot", "broccoli", "spinach", "corn"] });
});

app.get('/api/player/:id', async (req, res) => {
  const playerId = req.params.id;
  try {
    const { data } = await axios.get(
      `https://statsapi.mlb.com/api/v1/people/${playerId}?hydrate=stats(group=[hitting],type=season)`
    );

    const player = data.people[0];
    const stats = player.stats[0]?.splits[0]?.stat;

    if (!stats) {
      return res.status(404).json({ error: 'Player stats not found' });
    }

    const result = {
      name: player.fullName,
      team: player.stats[0]?.splits[0]?.team?.name,
      season: player.stats[0]?.splits[0]?.season,
      gamesPlayed: stats.gamesPlayed,
      atBats: stats.atBats,
      hits: stats.hits,
      homeRuns: stats.homeRuns,
      avg: stats.avg,
      obp: stats.obp,
      slg: stats.slg,
      ops: stats.ops,
      rbi: stats.rbi,
    };

    res.json(result);
  } catch (error) {
    res.status(500).send('Error fetching player data');
  }
});

app.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});