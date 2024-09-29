import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './PaperUpload.css';

const PaperUpload = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
    subjectName: "",
    paperType: "",
    paperDate: "",
    paperSlot: "",
    paperUrl: ""
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const baseUrl = "http://localhost:5000"; // Adjust if needed

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first.');
      return;
    }

    setUploading(true);

    try {
      // Validate username
      const userValidationResponse = await axios.get(`${baseUrl}/api/paper/uploaderList`, {
        params: {
          username: data.username
        }
      });

      // Check if user exists
      const uploaderExists = userValidationResponse.data.data.some(uploader => uploader.username === data.username);

      if (uploaderExists) {
        // Proceed with file upload
        const formData = new FormData();
        formData.append('file', file);

        const uploadResponse = await axios.post(`${baseUrl}/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        const uploadLink = uploadResponse.data.link;
        setFileUrl(uploadLink);
        setData(prevData => ({
          ...prevData,
          paperUrl: uploadLink
        }));
        toast.success('File uploaded successfully!');

        // Set paper URL
        setUploading(false);

      } else {
        toast.error('Username does not exist.');
        setUploading(false);
      }
    } catch (error) {
      toast.error('Error uploading file');
      console.error('Error uploading file:', error);
      setUploading(false);
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      // Validate user credentials
      const uploaderListResponse = await axios.get(`${baseUrl}/api/paper/uploaderList`);
      const uploaderList = uploaderListResponse.data.data;

      if (!Array.isArray(uploaderList)) {
        throw new Error('Invalid response format: Expected an array of uploaders');
      }

      const uploader = uploaderList.find(uploader =>
        uploader.username === data.username && uploader.password === data.password
      );

      if (uploader) {
        // Upload the paper approval
        const response = await axios.post(`${baseUrl}/api/paper/addPaperApproval`, data);

        setSuccessMessage('Paper uploaded successfully!');
        setData({
          username: "",
          password: "",
          subjectName: "",
          paperType: "",
          paperDate: "",
          paperSlot: "",
          paperUrl: ""
        });
        toast.success(response.data.message);
      } else {
        // Delete the uploaded file if username and password do not match
        if (fileUrl) {
          await axios.post(`${baseUrl}/api/paper/deleteFile`, { fileUrl });
          toast.error('Username and password do not match. File deleted.');
        }
        toast.error('You are not allowed to upload papers.');
      }
    } catch (error) {
      toast.error('Failed to upload paper');
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className='paper-upload'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        
        <div>
          <h3>Upload File to file first and Proceed to the usernam and password</h3>
          <input type="file" onChange={handleFileChange} />
          <button type="button" onClick={handleUpload} disabled={uploading}>
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
          {fileUrl && (
            <div>
              <p className='fileuploader'>File uploaded successfully</p>
              {/* <a href={fileUrl} target="_blank" rel="noopener noreferrer">{fileUrl}</a> */}
            </div>
          )}
        </div>

        <div className="upload-section flex-col">
          <p>Username</p>
          <input
            type="text"
            name="username"
            value={data.username}
            onChange={handleChange}
            placeholder="Enter username"
            required
          />
        </div>

        <div className="upload-section flex-col">
          <p>Password</p>
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
          />
        </div>

        <div className='upload-section flex-col'>
          <p>Subject Name</p>
          <input
            type="text"
            name='subjectName'
            value={data.subjectName}
            onChange={handleChange}
            placeholder='Type subject name'
            required
          />
        </div>

        <div className='upload-section flex-col'>
          <p>Paper Type</p>
          <select
            name='paperType'
            value={data.paperType}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select paper type</option>
            <option value="CAT-1">CAT-1</option>
            <option value="CAT-2">CAT-2</option>
            <option value="FAT">FAT</option>
          </select>
        </div>

        <div className="upload-section flex-col">
          <p>Paper Date</p>
          <input
            type="date"
            name='paperDate'
            value={data.paperDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="upload-section flex-col">
          <p>Paper Slot</p>
          <input
            type="text"
            name='paperSlot'
            value={data.paperSlot}
            onChange={handleChange}
            placeholder='Enter paper slot'
            required
          />
        </div>

        <div className="upload-section flex-col">
          <p>Paper URL</p>
          <input
            type="url"
            name='paperUrl'
            value={data.paperUrl}
            onChange={handleChange}
            placeholder='Enter URL'
            required
            disabled
          />
        </div>

        <button type='submit' className='upload-button'>Upload Paper</button>
      </form>

      {successMessage && (
        <p className='success-message'>{successMessage}</p>
      )}
    </div>
  );
};

export default PaperUpload;
