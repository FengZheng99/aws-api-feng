// import libraries
import React, { useState } from 'react';
import AWS from 'aws-sdk';
import axios from 'axios';
import {nanoid} from "nanoid";

// preset variable
const bucketName = 'fovus-bucket-feng';
const region = 'us-east-2';
const identityPoolId = 'us-east-2:edae3207-36b7-432e-9c94-b1cff05e8540';

//
AWS.config.update({
    region: region,
    credentials: new AWS.CognitoIdentityCredentials({IdentityPoolId: identityPoolId})
});
const s3 = new AWS.S3();

// main app
const App = () => {

    // variable
    const [Text, setText] = useState("");
    const [File, setFile] = useState(null);

    // handle changes
    const handleTextChange = (e) => {setText(e.target.value);};
    const handleFileChange = (e) => {setFile(e.target.files[0]);};

    // uploads to S3 and DynamoDB
    const handleUpload = async ()=>{

        if (!File) {alert('Please select a file.');return;}

        // upload file to S3
        try {
            const params = {
                Bucket: bucketName,
                Key: File.name,
                Body: File,
            };
            await s3.upload(params).promise();
            console.log('File uploaded successfully!');

        } catch (error) {
            console.error('Error uploading file:', error);
            alert('An error occurred while uploading the file.');
        }

        // upload text and path to DynamoDB
        try {
            const path = bucketName+'/'+File.name;
            const nid = nanoid();
            await axios.post('https://ao5ik6iqb3.execute-api.us-east-2.amazonaws.com/items', {
                id: nid,
                text: Text,
                path: path
            });
            console.log(nid);
            console.log("Text and path upload successfully!");
        } catch (error) {
            console.error('Error saving text to DynamoDB:', error);
        throw error;
    }
    }

    // frontend
    return (
        <div>
            <h2>Upload a File</h2>
            Text Input: <input type={'text'} onChange={handleTextChange}/>
            <br/>
            File Input: <input type={'file'} onChange={handleFileChange}/>
            <br/>
            <button onClick={handleUpload}>Submit</button>
        </div>
    );
};

// call main function
export default (App);
