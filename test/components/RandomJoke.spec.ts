import {mount, shallowMount} from "@vue/test-utils"
import {afterEach, describe, it, expect, vi } from "vitest"
import RandomJoke from "../../src/components/RandomJoke.vue"

describe("RandomJoke.vue", () => {
    vi.mock("../../src/api/JokeApi.ts",() => {
        const jokes = [
            {
                id: 1,
                joke: "Yet Another funny joke :)"
            },
            {
                id: 2,
                joke: "Another funny joke :)"
            },
            {
                id: 3,
                joke: "Some funny joke :)"
            }
        ]
        return {
            getRandomJoke: () => {
                return jokes.pop()
            }
        }
    })

    it("should render a random joke", async () => {
        const wrapper = await mount(RandomJoke) // await to be mounted
        await wrapper.vm.$nextTick() // await for mounted to complete
        const jokeHeading = wrapper.find("#joke-heading")
        expect(jokeHeading.text()).toBe("Joke")
        const jokeContentHeading = wrapper.find("#joke-content-heading")
        expect(jokeContentHeading.text()).toBe("Some funny joke :)")
    })
    it("should refresh the displayed joke on refresh link click", async () => {
        const wrapper = await mount(RandomJoke) // await to be mounted
        await wrapper.vm.$nextTick() // await for mounted to complete
        const jokeContentHeading = wrapper.find("#joke-content-heading")
        expect(jokeContentHeading.text()).toBe("Another funny joke :)")

        const refreshLink = wrapper.find("#joke-refresh-link")
        await refreshLink.trigger("click")
        //await wrapper.vm.$nextTick() // await for fetchRandomJoke to complete
        const jokeContentHeadingRefreshed = wrapper.find("#joke-content-heading")
        expect(jokeContentHeadingRefreshed.text()).toBe("Yet Another funny joke :)")
    })
})
