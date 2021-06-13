import {Form, Input, Modal} from 'antd';
import React, {useState} from 'react';
import {TableListItem} from "@/pages/Users/data";

const FormItem = Form.Item;

export interface FormValueType extends Partial<TableListItem> {
  newStatusId?: number;
}

export interface EditFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  editModalVisible: boolean;
  values: Partial<TableListItem>;
}

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 20},
};

const EditForm: React.FC<EditFormProps> = props => {

  const [formVals, setFormVals] = useState<FormValueType>(
    {
      id: props.values.id,
      username: props.values.username,
      password: props.values.password,
      surname: props.values.surname,
      firstname: props.values.firstname,
      patronymic: props.values.patronymic,
      createDt: props.values.createDt,
      endDt: props.values.endDt,
      locked: props.values.locked,
      secType: props.values.secType,
    }
  );

  const [form] = Form.useForm();

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    editModalVisible,
    values,
  } = props;

  const okHandle = async () => {
    const fieldsValue = await form.validateFields();

    setFormVals({...formVals, ...fieldsValue});

    formVals.id = form.getFieldValue("id");
    formVals.username = form.getFieldValue("username");
    formVals.password = form.getFieldValue("password");
    formVals.surname = form.getFieldValue("surname");
    formVals.firstname = form.getFieldValue("firstname");
    formVals.patronymic = form.getFieldValue("patronymic");
    formVals.createDt = form.getFieldValue("createDt");
    formVals.endDt = form.getFieldValue("endDt");
    formVals.locked = form.getFieldValue("locked");
    formVals.secType = form.getFieldValue("secType");

    handleUpdate(formVals);

  };

  return (
    <Modal
      destroyOnClose
      title="Редактируем пользователя"
      visible={editModalVisible}
      onOk={okHandle}
      onCancel={() => handleUpdateModalVisible(false, values)}
      afterClose={() => handleUpdateModalVisible()}

    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          id: formVals.id,
          username: formVals.username,
          password: formVals.password,
          surname: formVals.surname,
          firstname: formVals.firstname,
          patronymic: formVals.patronymic,
          createDt: formVals.createDt,
          endDt: formVals.endDt,
          locked: formVals.locked,
          secType: formVals.secType,

        }}
      >
        <FormItem
          name="id"
          label="Идентификатор"
          rules={[{required: true, message: 'Пожалуйста, введите идентификатор!'}]}
        >
          <Input placeholder="Пожалуйста, введите "/>
        </FormItem>

        <FormItem
          name="username"
          label="Логин"
          rules={[{required: true, message: 'Пожалуйста, введите логин!'}]}
        >
          <Input placeholder="Пожалуйста, введите "/>
        </FormItem>

        <FormItem
          name="password"
          label="Пароль"
          rules={[{required: false}]}
        >
          <Input placeholder="Пожалуйста, введите "/>
        </FormItem>

        <FormItem
          name="surname"
          label="Фамилия"
          rules={[{required: false}]}
        >
          <Input placeholder="Пожалуйста, введите "/>
        </FormItem>

        <FormItem
          name="firstname"
          label="Имя"
          rules={[{required: false}]}
        >
          <Input placeholder="Пожалуйста, введите "/>
        </FormItem>

        <FormItem
          name="patronymic"
          label="Отчество"
          rules={[{required: false}]}
        >
          <Input placeholder="Пожалуйста, введите "/>
        </FormItem>

        <FormItem
          name="createDt"
          label="Дата создания"
          rules={[{required: false}]}
        >
          <Input placeholder="Пожалуйста, введите "/>
        </FormItem>

        <FormItem
          name="endDt"
          label="Дата окончания"
          rules={[{required: false}]}
        >
          <Input placeholder="Пожалуйста, введите "/>
        </FormItem>

        <FormItem
          name="locked"
          label="Заблокировано"
          rules={[{required: false}]}
        >
          <Input placeholder="Пожалуйста, введите "/>
        </FormItem>

        <FormItem
          name="secType"
          label="Тип"
          rules={[{required: false}]}
        >
          <Input placeholder="Пожалуйста, введите "/>
        </FormItem>

      </Form>

    </Modal>
  );
};

export default EditForm;
