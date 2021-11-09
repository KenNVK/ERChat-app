import React, { useState } from "react";
import { Modal, Form, Select, Spin, Avatar } from "antd";
import { AppContext } from "../../Context/AppProvider";
// import { AuthContext } from "../../Context/AuthProvider";
import { debounce } from "lodash";
import { db } from "../../firebase/config";
function DebounceSelect({ fetchOptions, debounceTimeout = 300, curMembers, ...props }) {
  // Search: abcddassdfasdf

  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);

  const debounceFetcher = React.useMemo(() => {
    const loadOptions = value => {
      setOptions([]);
      setFetching(true);

      fetchOptions(value, curMembers).then(newOptions => {
        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchOptions, curMembers]);

  React.useEffect(() => {
    return () => {
      // clear when unmount
      setOptions([]);
    };
  }, []);

  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
    >
      {options.map(opt => (
        <Select.Option key={opt.value} value={opt.value} title={opt.label}>
          <Avatar size="small" src={opt.photoURL}>
            {opt.photoURL ? "" : opt.label?.charAt(0)?.toUpperCase()}
          </Avatar>
          {` ${opt.label}`}
        </Select.Option>
      ))}
    </Select>
  );
}
async function fetchUserList(search, curMembers) {
  return db
    .collection("users")
    .where("keywords", "array-contains", search?.toLowerCase())
    .orderBy("displayName")
    .limit(20)
    .get()
    .then(snapshot => {
      return snapshot.docs
        .map(doc => ({
          label: doc.data().displayName,
          value: doc.data().uid,
          photoURL: doc.data().photoURL,
        }))
        .filter(opt => !curMembers.includes(opt.value));
    });
}
export default function InviteMemberModal() {
  const [value, setValue] = useState([]);
  const { isInviteMemberVisible, setIsInviteMemberVisible, selectedRoom, selectedRoomId } =
    React.useContext(AppContext);
  const [form] = Form.useForm();
  const handleOk = () => {
    const roomRef = db.collection("rooms").doc(selectedRoomId);
    roomRef.update({ members: [...selectedRoom?.members, ...value.map(val => val.key)] });

    form.resetFields();
    setValue([]);
    setIsInviteMemberVisible(false);
  };
  const handleCancel = () => {
    form.resetFields();
    setIsInviteMemberVisible(false);
  };
  return (
    <Modal title="メンバー招待" visible={isInviteMemberVisible} onOk={handleOk} onCancel={handleCancel}>
      <Form form={form} onFinish={handleOk} layout="vertical">
        <DebounceSelect
          mode="multiple"
          label="メンバー招待"
          value={value}
          placeholder="ユーザー名を入力してください"
          fetchOptions={fetchUserList}
          onChange={newValue => setValue(newValue)}
          style={{ width: "100%" }}
          curMembers={selectedRoom?.members}
        ></DebounceSelect>
      </Form>
    </Modal>
  );
}
