import React from 'react'
import { Flex, Spin } from 'antd'

function PageLoader() {
  return (
    <Flex 
      style={{
        height: '100%'
      }} 
      justify='center' 
      align='center'>
        <Spin />
    </Flex>
  )
}

export default PageLoader