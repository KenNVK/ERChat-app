import React from "react";
import { Input, Modal, Form } from "antd";
import { AppContext } from "../../Context/AppProvider";
export default function ModifyUserModal() {
  const [form] = Form.useForm();
  const inpRef = React.useRef(null);
  const { isModifyUserVisible, setIsModifyUserVisible, currentUser, changeNameCurrentUser } =
    React.useContext(AppContext);
  const onOk = () => {
    changeNameCurrentUser(form?.getFieldValue("displayName"));
  };
  React.useEffect(() => {
    if (isModifyUserVisible) {
      console.log(inpRef.current);
      inpRef?.current?.input?.focus();
    }
  }, [isModifyUserVisible]);
  return (
    <Modal visible={isModifyUserVisible} onCancel={() => setIsModifyUserVisible(false)} onOk={onOk}>
      <Form form={form} layout="vertical">
        <Form.Item name="displayName" label="ニックネーム" initialValue={currentUser?.displayName}>
          <Input ref={inpRef} onPressEnter={onOk} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
