import React from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { AppContext } from "../../Context/AppProvider";
import { Modal, Form, Input } from "antd";
import { addDocument } from "../../firebase/service";

export default function AddRoom() {
  const { isAddRoomVisible, setIsAddRoomVisible } = React.useContext(AppContext);
  const {
    user: { uid },
  } = React.useContext(AuthContext);
  const [form] = Form.useForm();
  const hanldeOk = () => {
    addDocument("rooms", { ...form.getFieldsValue(), members: [uid] });
    form.resetFields();
    setIsAddRoomVisible(false);
  };
  const handleCancel = () => {
    setIsAddRoomVisible(false);
  };
  return (
    <>
      <Modal title="ルーム作成" onOk={hanldeOk} onCancel={handleCancel} visible={isAddRoomVisible}>
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="ルーム名：" required={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="説明：" required={[{ required: true }]}>
            <Input onPressEnter={hanldeOk} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
