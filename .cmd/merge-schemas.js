const fs = require('fs');
const { print } = require('graphql');
const { join } = require('path');
const { mergeTypeDefs } = require('@graphql-tools/merge');
const { loadFilesSync } = require('@graphql-tools/load-files');

function merge() {
  // Merge all type definitions
  const schema = print(
    mergeTypeDefs(
      loadFilesSync(join(__dirname, '..', 'graphql'), {
        extensions: ['graphql'],
        recursive: true
      })
    )
  );

  // Write result
  fs.writeFileSync(join(__dirname, '..', 'src', 'schema.graphql'), schema, {
    encoding: 'utf-8'
  });
}

merge();
