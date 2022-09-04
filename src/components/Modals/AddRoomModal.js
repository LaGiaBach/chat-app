import React, { useContext } from "react";
import { Form, Input, Modal } from "antd";
import { AppContext } from "../../Context/AppProvider";
import {addDocument} from "../../firebase/services"
import { AuthContext } from "../../Context/AuthProvider";

const AddRoomModal = () => { 
  const {isAddRoomVisible, setIsAddRoomVisible} = useContext(AppContext);
  const {users : {uid}} = useContext(AuthContext);
  const [form] = Form.useForm()
  const handleOk = () => {
    //add room to db
    addDocument('rooms', {...form.getFieldsValue() , members:[uid]})

    console.log({formData: form.getFieldsValue()})
    //close form after submit
    setIsAddRoomVisible(false);
    //reset Fields after submit
    form.resetFields()
  };
  const handleCancel = () => {
    form.resetFields()
    setIsAddRoomVisible(false);
  };
  return (
    <div>
      <Modal
        title="Add Room"
        visible={isAddRoomVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Add Room" name="name">
            <Input placeholder="Room Name" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea placeholder="Description" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddRoomModal;
