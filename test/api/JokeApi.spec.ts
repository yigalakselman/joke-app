import { afterAll, afterEach, beforeAll, describe, it, expect } from 'vitest'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import {getRandomJoke} from "../../src/api/JokeApi"

const joke = {
    error: false,
    category: "Misc",
    type: "single",
    joke: "My wife and I have reached the difficult decision that we do not want children. If anybody does, please just send me your contact details and we can drop them off tomorrow.",
    flags: {
        nsfw: false,
        religious: false,
        political: false,
        racist: false,
        sexist: false,
        explicit: false
    },
    id: 257,
    safe: true,
    lang: "en"
}

export const restHandlers = [
    rest.get('https://v2.jokeapi.dev/joke/Any', (req, res, ctx) => {
        const safeMode = req.url.searchParams.has("safe-mode")
        const type = req.url.searchParams.get("type")
        if(safeMode && type === 'single'){
            return res(ctx.status(200), ctx.json(joke))
        }
        else {
            return res(ctx.status(500), ctx.json({message: "Not Implemented"}))
        }
    }),
]

const server = setupServer(...restHandlers)

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

//  Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers())

describe("JokeApi.ts", () => {
    it('should return a random joke', async () => {
        const getRandomJokeRes = await getRandomJoke()
        expect(getRandomJokeRes.id).toBe(joke.id)
        expect(getRandomJokeRes.joke).toBe(joke.joke)
    })
})