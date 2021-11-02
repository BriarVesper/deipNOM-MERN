import React from 'react';
import Compressor from 'compressorjs';
import { FaPlusCircle} from 'react-icons/fa';

function ImageUpload({ handleAddThumbnail, image }) {
  let fileInput = React.createRef();
  let thumbnailPreview = React.createRef();

  const onChangeImage = (e) => {
    let img = e.target.files[0];
    if (!img) return;
    
    resizeAndAddImage(img);
    let imgURL = URL.createObjectURL(img);
    thumbnailPreview.style.backgroundImage = 'url(' + imgURL + ')';    
  }

  const resizeAndAddImage = (file) => {
    new Compressor(file, {
      quality: 0.5,
      maxWidth: 400,
      maxHeight: 400,
      success: (res) => {
        handleAddThumbnail(res);
      }
    })
  }

  const clickUploadFile = () => {
    fileInput.click();
  }

  return (
      <div className='form-group'>
        <input 
          type='file'
          className='thumbnail-input'
          onChange={onChangeImage}
          style={{display: "none"}}
          ref={input => fileInput = input}
        />
        <div 
          className="add-recipe-thumbnail" 
          onClick={clickUploadFile}
          ref={preview => thumbnailPreview = preview}
          >
            <FaPlusCircle/>
          </div>
      </div>
  );
}

export default ImageUpload;