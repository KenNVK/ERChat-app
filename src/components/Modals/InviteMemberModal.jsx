import React, { useState } from "react";
import { Modal, Form, Select, Spin, Avatar } from "antd";
import { AppContext } from "../../Context/AppProvider";
// import { AuthContext } from "../../Context/AuthProvider";
import { debounce } from "lodash";
import { db } from "../../firebase/config";
import { query, collection, where, orderBy, limit, getDocs, doc, updateDoc, arrayUnion } from "firebase/firestore";

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
  }, [curMembers]);

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
  const q = query(
    collection(db, "users"),
    where("keywords", "array-contains", search?.toLowerCase()),
    orderBy("displayName"),
    limit(20),
  );
  const querySnapshot = await getDocs(q);
  const snapShot = querySnapshot.docs.map(doc => {
    return {
      label: doc.data().displayName,
      value: doc.data().uid,
      photoURL: doc.data().photoURL,
    };
  });
  return snapShot.filter(opt => !curMembers?.includes(opt.value));
}

export default function InviteMemberModal() {
  const [value, setValue] = useState([]);
  const { isInviteMemberVisible, setIsInviteMemberVisible, selectedRoom, selectedRoomId } =
    React.useContext(AppContext);
  const [form] = Form.useForm();
  const handleOk = () => {
    const roomRef = doc(db, "rooms", selectedRoomId);
    updateDoc(roomRef, { members: arrayUnion(...selectedRoom?.members, ...value.map(val => val.key)) });
    fetchUserList("", "");
    form.resetFields();
    setValue([]);
    setIsInviteMemberVisible(false);
  };
  const handleCancel = () => {
    setValue([]);
    fetchUserList("", "");
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
