import { removeDuplicateAlbums } from '../src/utils/album-filter';
import { mockSearchData } from './mocks/album-mock';

const emptySearchData = {
    resultCount: 0,
    results: []
};


test("Album filter should return same result set if given result set is not containing any duplicate", async () => {
    const filteredResult = removeDuplicateAlbums(mockSearchData.results, 'collectionId');
    expect(filteredResult.length).toEqual(mockSearchData.results.length);
});
test("Album filter should remove duplicate albums and return unique list", async () => {
    const mockWithDuplicates = [mockSearchData.results[0], ...mockSearchData.results];
    const filteredResult = removeDuplicateAlbums(mockSearchData.results, 'collectionId');
    expect(filteredResult.length).toBeLessThan(mockWithDuplicates.length);
});
test("Album filter should return empty array if provided data set is empty", async () => {
    const filteredResult = removeDuplicateAlbums(emptySearchData.results, 'collectionId');
    expect(filteredResult.length).toEqual(0);
});