const Folder = require('./folder');
const mongoose = require('mongoose');

const folderOwnerId = '5af8617227a764741fd5bb67';

const firstlevel = [
  { name: '1' },
  { name: '2' },
  { name: '3' },
];

const secondLevel = [
  { name: '1.1' },
  { name: '1.2' },
  { name: '1.3' },
];

mongoose.connect('mongodb://localhost:27017/testdb', {
  /* other options */
});

describe('Testing get and create root folder with base methods', () => {
  afterAll(async () => {
    await Folder.deleteMany({});
  });
  let rootId;

  it('should create root', async () => {
    const rootFolder = await Folder.createRoot(folderOwnerId);
    expect(rootFolder.parent).toBeUndefined();
    rootId = rootFolder._id;
  });

  it('should get created root', async () => {
    const rootFolder = await Folder.getRoot(folderOwnerId);
    expect(rootFolder._id).toEqual(rootId);
  });
});

describe('Testing get and create root folder with combined method', () => {
  afterAll(async () => {
    await Folder.deleteMany({});
  });
  let rootId;

  it('should create root', async () => {
    const rootFolder = await Folder.getOrCreateRoot(folderOwnerId);
    expect(rootFolder).not.toBeNull();
    rootId = rootFolder._id;
  });

  it('should get created root', async () => {
    const rootFolder = await Folder.getOrCreateRoot(folderOwnerId);
    expect(rootFolder._id).toEqual(rootId);
  });
});
