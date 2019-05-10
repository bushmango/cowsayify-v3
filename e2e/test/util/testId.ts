import { common } from './common'

async function getBy(testId: string) {
	return await $(`[data-testid="${testId}"]`)
}
async function click(testId: string) {
	const button = await getBy(testId)
	await button.click()
	await common.slowdown()
}

async function typeIn(testId: string, text: string) {
	const input = await getBy(testId)
	await input.setValue(text)
	await common.slowdown()
}

async function waitForDoesNotExist(testId: string) {
	const el = await getBy(testId)
	await el.waitForExist(5000, true)
	await common.slowdown()
}

export const testId = { getBy, click, typeIn, waitForDoesNotExist }
