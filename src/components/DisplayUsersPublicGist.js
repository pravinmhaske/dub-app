
import Loader from './Loader'
import { Table, Tag, Space, Result } from 'antd';
import { useEffect, useState } from 'react'

import { Modal, Button } from 'antd';
import DisplayFilesFork from './DisplayFilesFork'
import { useDispatch } from "react-redux";

import getGistDetails from './../redux/actions/gist-details.action'

let columns = [];

function DisplayUsersPublicGist({ UserPublicGistRes, UserPublicGistError, isLoading }) {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [clickedRowFiles, setClickedRowFiles] = useState(null)

    const dispatch = useDispatch();

    useEffect(() => {
        columns = configurePublicGistUserTable();
    }, [])

    const configurePublicGistUserTable = () => {
        return [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Files',
                dataIndex: 'noOfFiles',
                key: 'noOfFiles',
            },
            {
                title: 'Badge',
                key: 'badges',
                dataIndex: 'badges',
                render: badges => (
                    <>
                        {badges.map(badge => {
                            let color = 'geekblue';
                            return (
                                <Tag color={color} key={badge}>
                                    {badge.toUpperCase()}
                                </Tag>
                            );
                        })}
                    </>
                ),
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <Space size="middle">
                        <Button type="primary" onClick={() => showModal(record)}>
                            View forks and File
                        </Button>
                    </Space>
                ),
            },
        ];


    }

    const mappedDataForTable = (data) => {

        const publicGistUserArr = data.map((item, index) => {
            return {
                key: index,
                name: item.description,
                noOfFiles: Object.keys(item.files).length,
                id: item.id,
                badges: getLanguage(item.files),
                files: item.files
            }
        });
        return publicGistUserArr;
    }

    const getLanguage = (files) => {

        let fileArr = [];
        for (let file in files) {
            let language = files[file].language;
            if (fileArr.indexOf(language) === -1) {
                fileArr.push(language);
            }
        }
        return fileArr;
    }

    const getGistDetailsById = async (id) => {
        dispatch(getGistDetails(id));
    }

    const showModal = (record) => {
        setClickedRowFiles(record.files)
        getGistDetailsById(record.id);
        setIsModalVisible(true);
    };


    const closeModal = () => {
        setIsModalVisible(false);
    };

    if (isLoading) {
        return (
            <Loader></Loader>
        );
    }
    if (UserPublicGistError) {
        return (
            <div>{UserPublicGistError}</div>
        );
    }

    return (<div>
        {UserPublicGistRes && UserPublicGistRes.length ? <Table columns={columns} dataSource={mappedDataForTable(UserPublicGistRes)} />
            : <Result title="Please provide git username to load results" />}

        <Modal title="display Files and Forks" visible={isModalVisible} onOk={closeModal} onCancel={closeModal}>
            <DisplayFilesFork files={clickedRowFiles} />
        </Modal>
    </div>)
}

export default DisplayUsersPublicGist