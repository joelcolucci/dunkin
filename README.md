# dunkin
> Seed MongoDB collections for integration testing

## Installation
```
npm install --save-dev dunkin
```

## Getting Started
```javascript
const DunkinClient = require('../../lib').DunkinClient;
const dunkin = new DunkinClient();

// Define document model
let mockPostModel = {
    title: 'SQL Injection Attacks',
    content: 'SQL injection is a hoax!',
    author: 'Bobby Tables'
};

// Define number of desired documents
let numberToCreate = 10;

// Before tests: Seed MongoDB collection
dunkin.seedCollection('posts', mockModel, numberToCreate);

// Run your tests!

// After tests Empty MongoDB collection
dunkin.emptyCollection('posts);
```

## Random Content Generation
`dunkin.seedCollection` will execute any model value that is a function. This allows for easy integration with faker to generate random content! See example below:

```javascript
// In addition to requiring dunkin, require faker
const faker = require('faker');

...

// Define model with faker functions as values
// Functions will be invoked during generation process
let mockPostModel = {
  title: faker.lorem.words,
  author: faker.name.firstName,
  content: faker.lorem.sentences
};
```

## License
MIT (c) 2017 Joel Colucci