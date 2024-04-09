# Fovus Coding Challenge - Feng Zheng 

# Environment 

Please install latest [Node.js](https://nodejs.org/en)

# Run the code
Use this command in terminal to run the code
## `npm start`
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

# Libraies Used
### `react, aws-sdk, axios, nanoid`
Install the libraies before run the code


You can install using following command in terminal
### `npm install react`
### `npm install aws-sdk`
### `npm install axios`
### `npm install nanoid`

# Architecture
<img width="544" alt="Screenshot 2024-04-09 at 6 51 26 AM" src="https://github.com/FengZheng99/fovus-challenge-feng/assets/46905932/48cb6cff-87b7-430b-b4c5-8e0f76d35d7e">

# ScreenShots

### Client will input a text and file, then click submit
<img width="283" alt="Screenshot 2024-04-09 at 8 07 19 AM" src="https://github.com/FengZheng99/fovus-challenge-feng/assets/46905932/6104841d-2777-4fea-abdf-ee5fc82c1cfb">


### Input file will upload into S3 bucket using identity pool id

<img width="425" alt="Screenshot 2024-04-09 at 7 09 45 AM" src="https://github.com/FengZheng99/fovus-challenge-feng/assets/46905932/43dfb870-cdd0-413e-986d-87a80ae2121f">


### Input text will be post into DynamoDB via API gateway and lambda function within a nanoid and input file path

<img width="424" alt="Screenshot 2024-04-09 at 7 06 12 AM" src="https://github.com/FengZheng99/fovus-challenge-feng/assets/46905932/ee35d000-07a9-43f2-91d5-79718ef48139">

## A VM instance(EC2) will be automatically launched and run a script in it that produce and output.txt file

<img width="772" alt="Screenshot 2024-04-09 at 6 51 02 AM" src="https://github.com/FengZheng99/fovus-challenge-feng/assets/46905932/64bd0f7b-8a01-49b6-8462-ed9a1a1f667b">

## Result

<img width="772" alt="Screenshot 2024-04-09 at 6 50 50 AM" src="https://github.com/FengZheng99/fovus-challenge-feng/assets/46905932/fd091394-79f5-493a-91e9-2f4386470551">

# References
[AWS developer guide v3](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/welcome.html)
[AWS JavaScriptSDK v3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/)
