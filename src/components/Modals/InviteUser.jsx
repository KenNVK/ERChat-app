import React from "react";
import { Modal, Form, Input } from "antd";

export default function InviteUser() {
  return (
    <Modal title="メンバー招待" visible={false}>
      <Form>
        <Form.Item>
          <Input></Input>
        </Form.Item>
      </Form>
    </Modal>
  );
}
