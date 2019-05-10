const host = 'http://localhost:3000'

const automatedTestMagicString = '-automated-test-'

async function delay(milliseconds, value?) {
	return new Promise(resolve => setTimeout(() => resolve(value), milliseconds))
}

let slowdownMs = 0
function setSlowdownMs(milliseconds: number) {
	slowdownMs = milliseconds
}

async function slowdown() {
	if (slowdownMs) {
		await delay(slowdownMs)
	}
}

async function goToPage(page: string) {
	await browser.url(host + page)
	await browser.clearLocalStorage()
	await browser.refresh()
	await slowdown()
}

export const common = {
	automatedTestMagicString,
	delay,
	setSlowdownMs,
	slowdown,
	goToPage,
}
