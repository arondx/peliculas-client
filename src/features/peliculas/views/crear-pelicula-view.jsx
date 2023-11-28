import React, { useState, useEffect } from 'react'
import PeliculaForm from '../../../components/form/pelicula-form'
import { Card, Alert, message, Typography } from 'antd'
const { Title } = Typography
import { useCreatePeliculaMutation } from '../peliculas-api-slice'
import PageLoader from '../../../components/page-loader'
import useCustomForm from '../../../lib/customForm'
import axios from 'axios';
  
function CrearPeliculaView() {

  const [create, { isLoading, error }] = useCreatePeliculaMutation()
  const form = useCustomForm()
  
  const cleanUnusedFile  = async () => {
    const publicId = form.file.publicId
    try {
      const res = await axios.post('http://localhost:3500/image/delete',
        {
          publicId
        },
      )
      console.log('cleaning...')
      console.log('Success: ', res)
    } catch (err) {
      console.error('Error: ', err)
    }
  }

  useEffect(() => {
    return () => {
      if(form.isDirty && form.file) {
        cleanUnusedFile()
      } 
    }
  }, [])

  const [file, setFile] = useState(null)
  const handleFile = (upload) => {
    setFile(upload)
  }

  form.file = file
  form.setFile = handleFile

  const onFinish = async (values) => {
    console.log('Success:', values);
    try {
      await create(values).unwrap()
      message.success("La película ha sido creado con éxito.")
      form.resetFields()
      form.setFile(null)
    } catch (err) {
      console.log(err)
    }
  };

  const content = isLoading
    ? <PageLoader />
    : <>
      <PeliculaForm
        form={form}
        onFinish={onFinish}
      />
      {error && <Alert message={error?.error} type="error" showIcon />}
    </>

  return (
    <div>
      <Title level={2}>Crear nueva película</Title>
        {content}
    </div>
   
  )
}

export default CrearPeliculaView