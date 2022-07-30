import {describe, it, expect } from "vitest"
import {shallowMount} from "@vue/test-utils"
import App from "../src/App.vue"
import RandomJoke from "../src/components/RandomJoke.vue"

describe("App.vue", () => {
    it("should render child components", async () => {
        const wrapper = await shallowMount(App)
        const randomJoke = wrapper.findComponent(RandomJoke)
        expect(randomJoke.exists()).toBe(true)
    })
})