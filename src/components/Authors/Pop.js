import React, { PropTypes } from 'react'
import { Form, Input, Modal, Select, InputNumber, Upload, Button, Icon ,message} from 'antd'
const FormItem = Form.Item
const Option = Select.Option

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
}

function Pop ({ form, item, type, visible, onOk, onCancel }) {
  const { getFieldDecorator, validateFields, getFieldsValue, setFieldsValue } = form
  // const { avator, name, nickname, sex, age, introduce } = item
  // console.log(avator, name, nickname, sex, age, introduce)

  function handleUpload(info) {
    if (info.file.status !== 'uploading') {

      console.log(info.file.response);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 图片上传成功`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 图片上传失败`);
    }
  }
  function handleOk () {
    
    validateFields((errors) => {
      if (!!errors) {
        return
      }
      console.log(getFieldsValue())
      const {avator} = getFieldsValue()
      onOk({...getFieldsValue(), avator:avator.file.response.data.url})
    })
  }

  function handleCancel () {
    onCancel(item)
  }

  const modalOpts = {
    title: type,
    visible,
    onOk: handleOk,
    onCancel: handleCancel
  }

  return (
    <Modal {...modalOpts}>
      <Form horizontal>

        <FormItem label="头像：" {...formItemLayout}>
          {getFieldDecorator('avator', {
          })(
            <Upload action="http://localhost:3000/api/upload" listType="picture" onChange={handleUpload}>
              <Button type="ghost">
                <Icon type="upload" /> 点击上传
              </Button>
            </Upload>
          )}
        </FormItem>

        <FormItem label='姓名：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
              // initialValue: 'item.name' || '',
              validate: [{
                rules: [
                  { required: true, message: '不能为空' }
                ],
                trigger: ['onBlur', 'onChange']
              }]
            })(
              <Input/>
            )}
        </FormItem>

        <FormItem label='昵称：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('nickname', {
              // initialValue: item.nickname || '',
              validate: [{
                rules: [
                  { required: true, message: '不能为空' }
                ],
                trigger: ['onBlur', 'onChange']
              }]
            })(
              <Input />
            )}
        </FormItem>

        <FormItem label='性别：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('sex', {
            // initialValue: item.sex || '男',
            rules: [
              { required: true, message: '请选择性别' },
            ],
          })(
          <Select style={{ width: 60 }}>
            <Option value="男">男</Option>
            <Option value="女">女</Option>
          </Select>
          )}
        </FormItem>

        <FormItem label='年龄：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('age', { 
            // initialValue: item.age || 20 
          })(
            <InputNumber min={1} max={150} style={{ width: 100 }} />
          )}
        </FormItem>
        <FormItem label='介绍：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('introduce', {
              // initialValue: item.introduce || '',
              validate: [{
                rules: [
                  { required: true, message: '不能为空' }
                ],
                trigger: ['onBlur', 'onChange']
              }]
            })(
              <Input type="textarea"/>
            )}
        </FormItem>
      </Form>
    </Modal>
  )
}

Pop.propTypes = {
  form: PropTypes.object,
  item: PropTypes.object,
  type: PropTypes.string,
  visible: PropTypes.any,
  onOk: PropTypes.func,
  onCancel: PropTypes.func
}

export default Form.create()(Pop)
