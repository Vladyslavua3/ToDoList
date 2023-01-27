describe('addItemForm', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        await page.goto('http://localhost:6007/iframe.html?id=todolist-task--work-task-story&viewMode=story')
        const image = await page.screenshot()

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot()
    })
})
