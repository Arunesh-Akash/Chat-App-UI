import { useEffect, useState} from 'react';
import '../ProfileImageComponent/ProfileImage.css';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { Button} from '@mui/material';
import { Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

function ProfileImage(){
    const [image,setImage]=useState(null);
    const [email,setEmail]=useState('');
    const [imagePreview,setImagePreview]=useState(null);
    const [successMessage,setSuccessMessage]=useState('');
    const navigate=useNavigate();
    
    useEffect(()=>{
      const storageData= localStorage.getItem("userEmail");
      if(!storageData){
        navigate('/');
      }
    setEmail(localStorage.getItem("userEmail"));
      
    },[navigate]);


    function onInputChange(e){
        setImage(e.target.files[0]);

        const render=new FileReader();
        render.onloadend=()=>{
          setImagePreview(render.result);
        }
        render.readAsDataURL(e.target.files[0]);
    }
    async function fetchImage() {
        try {
          const response = await axios.get(`https://chat-app-backend-k30p.onrender.com/user/signup/get-image?email=${email}`, {
            responseType: 'arraybuffer',
          });
      
          const imageData = btoa(
            new Uint8Array(response.data)
              .reduce((data, byte) => data + String.fromCharCode(byte), '')
          );
          setImage(`data:image/jpeg;base64,${imageData}`);
        } catch (err) {
          console.log(err);
        }
      }
      
      

    async function handleSubmit(e){
        e.preventDefault();
        if(!image){
          console.log('No image available')
          return;
        }
        try{
          const formData=new FormData();
          formData.append('image',image);
            const response=await axios.post(`https://chat-app-backend-k30p.onrender.com/user/signup/upload-image?email=${email}`,formData,{
                headers:{"Content-Type":"multipart/form-data"}
            });
            console.log(response.data);
            console.log(email);
            setSuccessMessage('Uploaded Successfully');
            fetchImage();
        }
        catch(err){
            console.log(err);
        }
    }
    return(
        <div className='profile-container'>
         <div className='profile-contain'>
         
            <div className='image-container'>
              {imagePreview &&<img src={imagePreview} alt="Preview" />}
              {successMessage &&<div>{successMessage}</div>}
            </div>
            <div className='form-contain'>
                <form onSubmit={handleSubmit}>
                <label htmlFor="file-upload">
              <Button component="span" variant="contained" startIcon={<CloudUploadIcon />}>
                Preview Image
              </Button>
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={onInputChange}
            />
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<InsertPhotoIcon />}
                  color="primary"
                >
                  Upload
                </Button>
                </form>
                
            </div>
            <Link to='/'><KeyboardBackspaceIcon/>Go to login</Link>

        
         </div>

        </div>
    )
}

export default ProfileImage;