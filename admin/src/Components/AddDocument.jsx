import React, { useEffect, useState } from 'react'
import { Alert, Button, Form, Input, Select } from 'antd';
import userServices from '../services/userServices';
import openNotification from '../hooks/openNotification';
import TextArea from 'antd/lib/input/TextArea';
import { useSelector } from 'react-redux';
import classServices from '../services/classServices';
import { CloseCircleTwoTone, CheckCircleTwoTone } from '@ant-design/icons';
import FileUpload from './UploadFile/FileUpload';
import FileList from './UploadFile/FileList';

const { Option } = Select

const layout = {
    labelCol: {
        span: 2,
    },
    wrapperCol: {
        span: 10,
    },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
};

export default function AddDocument(props) {
    const token = useSelector(state => state.auth.token)
    const [listGV, setlistGV] = useState([])
    const [files, setFiles] = useState([]);

    const removeFile = (filename) => {
        setFiles(files.filter(file => file.name !== filename))
    };
    const onFinish = (values) => {
        classServices.addClass(token, values.class)
            .then(
                (res) => {
                    // console.log(res)
                    if (res.success) {
                        openNotification(<CheckCircleTwoTone twoToneColor={'green'} />, 'Notifications!', res.message)
                    } else {
                        // console.log(res)
                        openNotification(<CloseCircleTwoTone twoToneColor={'red'} />, 'Notifications!', res.message)
                    }
                }
            )
            .catch(err => {
                openNotification(<CloseCircleTwoTone twoToneColor={'red'} />, 'Notifications!', err.response.data.message)
            }
            )
    }

    useEffect(() => {
        userServices.getListUsers(token, 'GV')
            .then(
                res => setlistGV(res)
            )
    }, [token]);

    return (
        <div>
            <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} >
                <Form.Item
                    name={['document', 'code']}
                    label="Mã tài liệu"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={['document', 'name']}
                    label="Tên tài liệu"
                    rules={[
                        {
                            required: true
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={['document', 'type']}
                    label='Loại tài liệu'
                    rules={[
                        {
                            require: true
                        }
                    ]}>
                    <Select>
                        {
                            listGV.map(
                                item => <Option key={item._id}
                                    value={item._id}
                                >{item.name} - {item.email}</Option>
                            )
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    name={['document', 'note']}
                    label='Ghi chú'
                >
                    <TextArea />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 2 }}>
                    <Button type="primary" htmlType="submit">
                        Add
                    </Button>
                </Form.Item>
            </Form>
            <div className="files-upload">
                <div className="title">Upload file</div>
                <FileUpload files={files} setFiles={setFiles}
                    removeFile={removeFile}
                />
                <FileList files={files} removeFile={removeFile} />
            </div>
        </div>
    )
}
