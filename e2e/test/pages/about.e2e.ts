import { common, testId } from './imports'

const page = '/about'
const bookName = common.automatedTestMagicString + ' a new book name'
const bookName2 = common.automatedTestMagicString + ' an edited book name'

async function cleanup() {}

describe('about page', () => {
	before(async () => {
		await cleanup()
	})
	after(async () => {
		await cleanup()
	})

	it('should open', async () => {
		await common.goToPage(page)
	})
})
