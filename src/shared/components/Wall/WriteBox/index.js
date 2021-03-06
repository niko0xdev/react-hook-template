import {
  Avatar,
  Button,
  Card,
  Divider,
  Icon,
  Input,
  Modal,
  Upload,
} from 'antd';
import React, { useState } from 'react';

const { TextArea } = Input;

const WriteBox = (props) => {
  const [commentText, setCommentText] = useState('');

  const [previewVisible, setPreviewVisible] = useState(false);

  const [previewImage, setPreviewImage] = useState('');

  const [fileList, setFileList] = useState([]);

  const [isOpen, setIsOpen] = useState(false);

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const handlePreview = (file) => {
    setPreviewImage(file.url || file.thumbUrl);
    previewVisible(true);
  };

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleClickImage = () => {
    setIsOpen(!isOpen);
  };

  const handleAddPost = () => {
    props.addPost(commentText, fileList);
    setCommentText('');
    setPreviewVisible(false);
    setPreviewImage('');
    setFileList([]);
    setIsOpen(false);
  };

  const onChange = (e) => {
    setCommentText(e.target.value);
  };

  const isEnabled = fileList.length === 0 && commentText === '';
  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  return (
    <Card className="kd-card">
      <div className="kd-media kd-mb-2">
        <Avatar className="kd-size-50 kd-mr-3" src={props.user.image} />
        <div className="kd-media-body">
          <TextArea
            className="kd-border-0"
            id="exampleTextarea"
            value={commentText}
            multiline="true"
            rows={4}
            onChange={(event) => onChange(event)}
            placeholder="Whats in your mind?"
            margin="none"
          />
        </div>
      </div>

      <div className="kd-clearfix">
        {isOpen === true ? (
          <Upload
            action="//jsonplaceholder.typicode.com/posts/"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
        ) : null}

        <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
      <Divider />

      <div className="ant-row-flex">
        <div className="kd-pointer" onClick={handleClickImage}>
          <i className="icon icon-camera kd-mr-2 kd-fs-xl kd-d-inline-flex kd-vertical-align-middle" />
          <span className="kd-fs-sm"> Add Photos/Album </span>
        </div>

        <Button
          type="primary"
          size="small"
          className="kd-ml-auto kd-mb-0"
          disabled={isEnabled ? 'disabled' : ''}
          onClick={handleAddPost}
        >
          SEND
        </Button>
      </div>
    </Card>
  );
};

export default WriteBox;
