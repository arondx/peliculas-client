import React from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import axios from 'axios';

function ImageUploader({ handleFileChange, form }) {
  
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const sendToServer = async (file) => {
    const fd = new FormData()
    fd.append("upload", file)

    try { 
      const res = await axios.post('http://localhost:3500/image/upload',
        fd,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        })

      file.status = 'done'
      file.url = res.data.cloudinaryUrl;
      file.publicId = res.data.publicId;
      form.setFile(file)
      
      handleFileChange({
        cloudinaryUrl: res.data.cloudinaryUrl,
        publicId: res.data.publicId
      })
      console.log('Success: ', res)
      message.success('La imagen ha sido subida con éxito.');

    } catch (err) {
      form.setFile(null)
      message.error('La operación de subida ha fracasado.');
      console.error('Error: ', err)
    }
  }

  const deleteFromServer = async (file) => {
    const publicId = form.file.publicId
    try {
      const res = await axios.post('http://localhost:3500/image/delete',
        {
          publicId
        },
      )

      form.setFile(null)
      handleFileChange('')
      console.log('Success: ', res)
      message.success('El borrado se ha completado con éxito.');

    } catch (err) {
      file.status = 'error'
      form.setFile(file)
      console.error('Error: ', err)
      message.error('La operación de borrado ha fracasado.');
    }
  }

  const props = {
    onRemove: (file) => {
      deleteFromServer(file)
    },
    beforeUpload: (file) => {
      file.status = 'uploading'
      form.setFile(file)
      sendToServer(file)
      return false
    }
  };

  return (
    <div>
      <Upload
        fileList={form.file ? [form.file] : []}
        listType="picture-card"
        {...props}>
        {!form.file && uploadButton}
      </Upload>
      <p>Allowed *.jpeg, *.jpg, *.png, *.gif</p>
      <p>max size of 3.1 MB</p>
    </div>
  )
}

export default ImageUploader