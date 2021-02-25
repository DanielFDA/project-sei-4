import React from 'react'
import axios from 'axios'
import { Button } from '@material-ui/core'

const uploadUrl = process.env.REACT_APP_CLOUDINARY_URL
const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET

// //console.log('upload',uploadUrl)
// //console.log(uploadPreset)

// 
function ImageUpload({ value, name, onChange, buttonText }) {
  // const [ hover, setHover] = React.useState(false)
  const handleUpload = async e => {
    const data = new FormData()
    data.append('file', e.target.files[0])
    data.append('upload_preset', uploadPreset)
    const res = await axios.post(uploadUrl, data)
    onChange({ target: { name, value: res.data.url } }) //* handleChange triggered
  }

  // const handleHover = () => {
  //   setHover(!hover)
  // }



  return (
    <>
      <div className="profile_preview">
        <div>
          <img src={value} style={{ width: '30%', height: 'auto' }} />
        </div>
      </div>
      <div>
        <div
        // onMouseEnter={handleHover} 
        // onMouseLeave={handleHover}
        >
          <input
            id="contained-button-file"
            type="file"
            accept="jpg"
            onChange={handleUpload}
            name={name}
            style={{ display: 'none' }}
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="secondary" component="span">
              {buttonText}
            </Button>
          </label>
        </div>
      </div>
    </>
  )
}

export default ImageUpload