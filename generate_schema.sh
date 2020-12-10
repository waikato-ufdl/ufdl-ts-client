#!/bin/bash

# Change to the JSON directory
cd ./src/json/schema/ || exit

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

done
