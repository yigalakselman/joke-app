import {mount, shallowMount} from "@vue/test-utils"
import {afterEach, describe, it, expect, vi } from "vitest"
import RandomJoke from "../../src/components/RandomJoke.vue"

describe("RandomJoke.vue", () => {

    it("should render a random joke", async () => {
        vi.mock("../../src/api/JokeApi.ts",() => {
            return {
                getRandomJoke: () => {
                    return {
                        id: 1,
                        joke: "Some funny joke :)"
                    }
                }
            }
        })
        const wrapper = await mount(RandomJoke) // await to be mounted
        await wrapper.vm.$nextTick() // await for mounted to complete
        const jokeHeading = wrapper.find("#joke-heading")
        expect(jokeHeading.text()).toBe("Joke")
        const jokeContentHeading = wrapper.find("#joke-content-heading")
        expect(jokeContentHeading.text()).toBe("Some funny joke :)")
    })
})
