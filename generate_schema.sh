#!/bin/bash

# Change to the JSON directory
cd ./src/ufdl/json/schema/ || exit

# Remove previous generated files
echo "Removing previously-generated files"
rm -rf ../generated && echo "Removed generated TypeScript files"

# Make the generated output directory
mkdir "../generated"

for schema in *.json; do
  # Get the name of the schema (without extension)
  schemaName=${schema/.json/}

  # Generate the type/validator code
  npm exec -c "quicktype -s schema $schema -o ../generated/$schemaName.ts"

  # Add the export to the index
  echo "import * as ${schemaName}_ from './${schemaName}';" >> ../generated/index.ts

done

echo "" >> ../generated/index.ts
echo "export namespace generated {" >> ../generated/index.ts

for schema in *.json; do
  # Get the name of the schema (without extension)
  schemaName=${schema/.json/}

  echo "    export const $schemaName: typeof ${schemaName}_ = ${schemaName}_;" >> ../generated/index.ts

done

echo "}" >> ../generated/index.ts
