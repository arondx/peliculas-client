import React from 'react'
import { useNavigate } from "react-router-dom"

import { Button, Typography } from 'antd'
const { Title } = Typography

function UnauthorizedPage() {
    const navigate = useNavigate()
    const goBack = () => navigate(-1);

  return (
    <div style={{ marginInline: 'auto', width: 'fit-content' }}>
        <Title level={1}>Unauthorized</Title>
        <Typography>You do not have access to the requested page.</Typography>
        <Button style={{ marginTop: 24 }} type='primary' onClick={goBack}>Go back</Button>
    </div>
  )
}

export default UnauthorizedPage