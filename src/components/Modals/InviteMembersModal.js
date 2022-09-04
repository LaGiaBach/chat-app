import React, { useContext, useMemo, useState } from "react";
import { Avatar, Form, Modal, Select, Spin } from "antd";
import { AppContext } from "../../Context/AppProvider";
// import {addDocument} from "../../firebase/services"
// import { AuthContext } from "../../Context/AuthProvider";
import { debounce } from "lodash";
import { db } from "../../firebase/config";
import { useEffect } from "react";

const DebounceSelect = ({
  fetchingOptions,
  debounceTimeout = 300,
  curMembers,
  ...props
}) => {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      setOptions([]);
      setFetching(true);

      fetchingOptions(value,curMembers).then((newOptions) => {
        setOptions(newOptions);
        setFetching(false);
      });
    };
    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchingOptions,curMembers]);
  useEffect(() => {
    return() => {
      setOptions([]);
    }
  },[])
  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
    >
      {options.map((option) => (
        <Select.Option key={option.value} value={option.value} title={option.label}>
          <Avatar size="small" src={option.photoURL}>
            {option.photoURL ? "" : option.label?.charAt(0)?.toUpperCase()}
          </Avatar>
          {`${option.label}`}
        </Select.Option>
      ))}
    </Select>
  );
};

const fetchUserList = async (search,curMembers) => {
  return db
    .collection("users")
    .where("keywords", "array-contains", search.toLowerCase())
    .orderBy("displayName")
    .limit(20)
    .get()
    .then(snapshot => {
      return snapshot.docs.map(doc => ({
        label:doc?.data()?.displayName,
        value: doc?.data()?.uid,
        photoURL: doc?.data()?.photoURL
      })).filter((opt) => !curMembers.includes(opt.value));
    });
};
const InviteMembersModal = () => {
  const { isInviteMemberVisible, setIsInviteMemberVisible, selectedRoomId,selectRoom } =
    useContext(AppContext);
  const [value, setValue] = useState([]);
  const [form] = Form.useForm();
  const handleOk = () => {

    form.resetFields()
    setValue([]);
    //update member in room chat
    const roomRef = db.collection('rooms').doc(selectedRoomId)
    
    roomRef.update({
      members:[...selectRoom.members , ...value.map(val => val.value)],
    })

    setIsInviteMemberVisible(false);
    
  };
  const handleCancel = () => {
    form.resetFields();
    setValue([]);
    setIsInviteMemberVisible(false);
  };
  return (
    <div>
      <Modal
        title="Add Member"
        visible={isInviteMemberVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <Form form={form} layout="vertical">
          <DebounceSelect
            mode="multiple"
            label="Members Name"
            value={value}
            placeholder="Enter members name"
            fetchingOptions={fetchUserList}
            onChange={(newValue) => setValue(newValue)}
            style={{ width: "100%" }}
            curMembers={selectRoom.members}
          />
        </Form>
      </Modal>
    </div>
  );
};

export default InviteMembersModal;
