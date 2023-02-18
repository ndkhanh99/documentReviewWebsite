import React, { useEffect } from 'react'
import docServices from '../services/docServices';
import { useSelector, useDispatch } from 'react-redux';
import { getListClass } from '../store/class/classAction';
import { getAllDoc } from '../store/document/docAction';
import { Button, Space, Table, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

export default function ListDoc(props) {
    const token = useSelector(state => state.auth.token)
    const dispatch = useDispatch()
    const listDocument = useSelector(state => state.document.listDocument)
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(getAllDoc({token : token}))
        // docServices.getAllDoc().then(res => console.log(res))
    }, [token,dispatch])

    const columns = [
        {
            title: 'Mã tài liệu',
            dataIndex: 'code',
            key: 'code'
        },
        {
            title: 'Tên tài liệu',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Lượt xem',
            dataIndex: 'dowloadCount',
            key: 'dowloadCount',
            render : (item) => <Typography>{item.name} - {item.email}</Typography>
        },
        {
            title : "Ghi chú",
            dataIndex : "note",
            key : "note"
        },
        {
            title: 'CreatedAt',
            dataIndex: 'createdAt',
            key: 'createdAt'
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" ghost onClick={() => {}}>
                        Sửa
                    </Button>
                    <Button type="danger" ghost
                            onClick={()=> {}}>
                        Xoá
                    </Button>
                </Space>
            ),
        }
    ]

    return (
        <Table dataSource={listDocument} columns={columns} rowKey={(record) => record._id}/>
    )
}
