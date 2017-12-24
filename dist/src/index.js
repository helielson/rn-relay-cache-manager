import CacheWriter from './CacheWriter';


export default class RelayCacheManager {
  constructor(options) {
    this.cacheWriter = new CacheWriter(options);
  }

  clear() {
    this.cacheWriter.clearStorage();
  }

  getMutationWriter() {
    return this.cacheWriter;
  }

  getQueryWriter() {
    return this.cacheWriter;
  }

  getAllRecords() {
    return this.cacheWriter.cache.records;
  }

  readNode(id, callback) {
    const node = this.cacheWriter.readNode(id);
    setImmediate(callback.bind(null, null, node));
  }

  readRootCall(callName, callValue, callback) {
    this.cacheWriter.readRootCall(callName, callValue, callback);
  }
}
//# sourceMappingURL=index.js.map