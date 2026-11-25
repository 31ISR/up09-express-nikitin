const express = require('express')

const router = express.Router()

let games = [
    {
        id: "1",
        title: "Cry of Fear",
        year: 2012,
        creators: "Team Psykskallar",
        isPlayed: false

    }, 
    {
        id: "2",
        title: "Fallout: New Vegas",
        year: 2010,
        creators: "Obsidian Entertainment",
        isPlayed: true

    }, 
    {
        id: "3",
        title: "Cyberpunk 2077",
        year: 2020,
        creators: "CD Projekt Red",
        isPlayed: true
    }
]

router.get('/', (req, res) => {
    res.json(games)
})

router.post("/", (req, res) => {
    const { title, creators, year } = req.body

    const game = {
        id: Date.now(),
        title: title.trim(),
        year: year,
        creators: creators.trim()
    }

    games.push(game)

    res.status(201).json(game)
})

router.get("/:id", (req, res) => {
    const game = games.find(el => el.id == req.params.id)
    if (!game) return res
    .status(404)
    .json({error: `Игра с id: ${req.params.id} не была найдена`
    })

    res.json(game)
})

router.patch("/:id", (req, res) => {
    const gameIndex = games.findIndex(
        el => el.id == req.params.id
    )

    if (gameIndex === -1) return res
    .status(404)
    .json({error: `Игра с id: ${req.params.id} не была найдена`
    })

    games[gameIndex] = { ...games[gameIndex], ...req.body }
    res.json(games[gameIndex])
})

router.delete("/:id", (req, res) => {
    const game = games.find(el => el.id == req.params.id)

    if (!game) return res
    .status(404)
    .json({error: `Игра с id: ${req.params.id} не была найдена`
    })

    games = games.filter(el => el.id != req.params.id)
    res.status(204).end()
})

module.exports = router