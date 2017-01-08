// SEEDING - Handle seeding the database for tests
const MongoClient = require('mongodb').MongoClient;


/**
 * DunkinClient
 */
class DunkinClient {
  /**
   * @param {String} url - MongoDB connection URL
   */
  constructor(url) {
    this.url = url || 'mongodb://localhost:27017/sandbox';
  }

  /**
   * @param {String} collectionName - name of MongoDB collection
   * @param {Object} documentModel - model of mock data to input
   * @param {Int} numberToGenerate - number of documents to create
   * @return {Array} array of document IDs created
   */
  seedCollection(collectionName, documentModel, numberToGenerate) {
    return new Promise((resolve, reject) => {
      MongoClient.connect(this.url, (err, db) => {
        if (err) {
          reject();
        } else {
          var mockDocuments = this._generateDocuments(documentModel, numberToGenerate);

          this._insertDocuments(db, collectionName, mockDocuments, (result) => {
            db.close();
            resolve(result.insertedIds);
          });
        }
      });
    });
  }

  /**
   * Remove all documents from collection
   * @param {String} collectionName - name of MongoDB collection
   * @return {undefined} return undefined
   */
  emptyCollection(collectionName) {
    return new Promise((resolve, reject) => {
      MongoClient.connect(this.url, (err, db) => {
        if (err) {
          reject();
        } else {
          this._deleteDocuments(db, collectionName, () => {
            db.close();
            resolve();
          });
        }
      });
    });
  }

  _insertDocuments(db, collectionName, mockDocuments, callback) {
    var collection = db.collection(collectionName);

    collection.insertMany(mockDocuments, (err, result) => {
      callback(result);
    });
  };

  _deleteDocuments(db, collectionName, callback) {
    var collection = db.collection(collectionName);

    collection.remove({}, (err, result) => {
      callback(result);
    });
  };

  /**
   * Generate array of objects that match documentModel
   * @param {Object} documentModel - object containing keys of data model
   * @param {Number} numberToGenerate - number of objects to generate
   * @return {Array} - Array of generated objects
   */
  _generateDocuments(documentModel, numberToGenerate) {
    let documents = [];

    for (let i = 0; i < numberToGenerate; i++) {
      let newDoc = {};
      for (let key in documentModel) {
        if (documentModel.hasOwnProperty(key)) {
          let value = documentModel[key];
          if (typeof value === 'function') {
            value = value();
          }
          newDoc[key] = value;
        }
      }
      documents.push(newDoc);
    }

    return documents;
  }
}

module.exports.DunkinClient = DunkinClient;
