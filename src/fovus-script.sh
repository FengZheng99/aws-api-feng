#!/bin/bash

# Set variables
OUTPUT_FILE="output.txt"
BUCKET_NAME="fovus-bucket-feng"
TABLE_NAME="fovus-table"
OUTPUT_PATH="fovus-table/output.txt"

# Step 2: Read the input text from DynamoDB

ATTRIBUTE1="input_file_path"
ATTRIBUTE2="text"

# Retrieve the item from DynamoDB
response=$(aws dynamodb get-item \
    --table-name $TABLE_NAME \
    --key "{\"id\": {\"S\": \"$ID\"}}" \
    --output json)

attribute1_value=$(echo $response | jq -r ".Item.$ATTRIBUTE1.S")
INPUT_FILE=$(echo $attribute1_value | cut -d'/' -f2)
attribute2_value=$(echo $response | jq -r ".Item.$ATTRIBUTE2.S")

# Print the retrieved item and attribute values
echo "Value of $ATTRIBUTE1: $attribute1_value"
echo "Value of input file: $INPUT_FILE"
echo "Value of $ATTRIBUTE2: $attribute2_value"


aws s3 cp s3://$BUCKET_NAME/$INPUT_FILE .

# Step 3: Append input text to input file
echo " $attribute2_value" >> $INPUT_FILE

# Step 4: Process the input file (Example: Copy to output file)
echo "Processing input file..."
# Example: Copy input file to output file
cp $INPUT_FILE $OUTPUT_FILE

# Step 5: Upload output file to S3
aws s3 cp $OUTPUT_FILE s3://$BUCKET_NAME/$OUTPUT_FILE

# Step 6: Save outputs and S3 path in DynamoDB

aws dynamodb put-item \
    --table-name $TABLE_NAME \
    --item "{\"id\": {\"S\": \"$ID\"}, \"output_file_path\": {\"S\": \"$OUTPUT_PATH\"}, \"text\": {\"S\": \"$attribute2_value\"}, \"input_file_path\": {\"S\": \"$BUCKET_NAME/$INPUT_FILE\"}}"
