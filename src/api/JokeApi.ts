import axios from "axios"

export interface GetRandomJokeRes {
    id: number
    joke: string
}

export const getRandomJoke = async (): Promise<GetRandomJokeRes> => {
    const response = await axios.get<GetRandomJokeRes>("https://v2.jokeapi.dev/joke/Any?safe-mode&type=single")
    return response.data
}