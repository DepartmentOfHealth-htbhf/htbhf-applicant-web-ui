const test = require('tape')

const { getPageForPath, getNextPage, getPreviousPage, getPageMetadata } = require('./get-page-meta-data')

const page1 = {
  title: 'How it works',
  path: '/how-it-works'
}
const page2 = {
  title: 'Eligibility',
  path: '/eligibility'
}
const page3 = {
  title: 'What you can buy',
  path: '/what-you-can-buy'
}
const pages = [page1, page2, page3]

test('getPageForPath() should return the correct page object', (t) => {
  t.deepEqual(getPageForPath(pages, '/how-it-works'), page1, 'should return correct page object')
  t.deepEqual(getPageForPath(pages, '/eligibility'), page2, 'should return correct page object')
  t.deepEqual(getPageForPath(pages, '/what-you-can-buy'), page3, 'should return correct page object')
  t.equal(getPageForPath(pages, '/unknown'), undefined, 'should return undefined for unknown page')
  t.end()
})

test('getNextPage() should return the next page for the given index', (t) => {
  t.deepEqual(getNextPage(pages, 0), page2, 'should return correct next page object')
  t.deepEqual(getNextPage(pages, 1), page3, 'should return correct next page object')
  t.deepEqual(getNextPage(pages, 2), undefined, 'should return undefined for last page index')
  t.equal(getNextPage(pages, 7), undefined, 'should return undefined for index too high')
  t.equal(getNextPage(pages, -5), undefined, 'should return undefined for index too low')
  t.end()
})

test('getPreviousPage() should return the previous page for the given index', (t) => {
  t.deepEqual(getPreviousPage(pages, 0), undefined, 'should return undefined for first path in list')
  t.deepEqual(getPreviousPage(pages, 1), page1, 'should return correct previous page object')
  t.deepEqual(getPreviousPage(pages, 2), page2, 'should return correct previous page object')
  t.equal(getPreviousPage(pages, 7), undefined, 'should return undefined for index too high')
  t.equal(getPreviousPage(pages, -5), undefined, 'should return undefined for index too low')
  t.end()
})

test('getPageMetadata() should return the correct metadata when has both next and previous', (t) => {
  const expected = {
    activePath: '/eligibility',
    previous: page1,
    next: page3,
    title: 'Eligibility'
  }
  t.deepEqual(getPageMetadata(pages, '/eligibility'), expected, 'should return correct metadata')
  t.end()
})

test('getPageMetadata() should return the correct metadata when has only next is available', (t) => {
  const expected = {
    activePath: '/how-it-works',
    previous: undefined,
    next: page2,
    title: 'How it works'
  }
  t.deepEqual(getPageMetadata(pages, '/how-it-works'), expected, 'should return correct metadata')
  t.end()
})

test('getPageMetadata() should return the correct metadata when has only previous', (t) => {
  const expected = {
    activePath: '/what-you-can-buy',
    previous: page2,
    next: undefined,
    title: 'What you can buy'
  }
  t.deepEqual(getPageMetadata(pages, '/what-you-can-buy'), expected, 'should return correct metadata')
  t.end()
})
