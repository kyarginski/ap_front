import {Form, Input, Modal, Select,} from 'antd';
import React, {useState} from 'react';
import {TableListItem} from "@/pages/workflow/Inventory/data";

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;

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
  labelCol: { span: 7 },
  wrapperCol: { span: 20 },
};

const EditForm: React.FC<EditFormProps> = props => {

  const [formVals, setFormVals] = useState<FormValueType>(
    {
      CreatedAt: props.values.CreatedAt,
      UpdatedAt: props.values.UpdatedAt,
      Name: props.values.Name,
      Note: props.values.Note,
      Id: props.values.Id,
      UserName: props.values.UserName,
      StatusId: props.values.StatusId,
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

    setFormVals({ ...formVals, ...fieldsValue });

      formVals.UserName = form.getFieldValue("userName");
      formVals.StatusId = form.getFieldValue("statusId");
      formVals.Name = form.getFieldValue("name");
      formVals.Note = form.getFieldValue("note");
//       alert("formVals.newStatusId = " + formVals.newStatusId  + "; formVals.StatusId = " + formVals.StatusId)
       alert("form.getFieldValue(`userName`) = " + form.getFieldValue("userName") + "; formVals.UserName = " + formVals.UserName + "; values=" + values.UserName)
      handleUpdate(formVals);

  };

  return (
    <Modal
      destroyOnClose
      title="Редактируем инвентаризацию"
      visible={editModalVisible}
      onOk={okHandle}
      onCancel={() => handleUpdateModalVisible(false, values)}
      afterClose={() => handleUpdateModalVisible()}

    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          id: formVals.Id,
          name: formVals.Name,
          userName: formVals.UserName,
          note: formVals.Note,
          statusId: formVals.StatusId,
        }}
      >
        <FormItem
          name="id"
          label="Идентификатор"
          rules={[{ required: true, message: 'Пожалуйста, введите идентификатор!' }]}
        >
          <Input placeholder="Пожалуйста, введите " />
        </FormItem>

        <FormItem
          name="name"
          label="Наименование"
          rules={[{ required: true, message: 'Пожалуйста, введите имя!' }]}
        >
          <Input placeholder="Пожалуйста, введите " />
        </FormItem>

        <FormItem
          name="statusId"
          label="Статус"
          rules={[{ required: true }]}
        >
          <Select style={{ width: '100%' }} defaultValue={values.StatusId} >
            <Option value={1}>Новая</Option>
            <Option value={2}>Подготовка (закрытие доков)</Option>
            <Option value={3}>Сессия в WMS </Option>
            <Option value={4}>Формирование инвентаризации в WMS </Option>
            <Option value={5}>Наряд на инвентаризацию в WMS </Option>
            <Option value={6}>Подсчет товаров в ячейках </Option>
            <Option value={7}>Иной товар в виртуальную ячейку </Option>
            <Option value={8}>Занесение фактических данных в WMS </Option>
            <Option value={9} >Сравнение результатов</Option>
            <Option value={10}>Формировние инвентаризации проблемных ячеек (не совпадает)</Option>
            <Option value={11}>Закрытие сессии в WMS </Option>
            <Option value={12}>Подсчет товаров в виртуальной ячейке </Option>
            <Option value={13}>Проверка адекватности результатов (ок) </Option>
            <Option value={14}>Проверка адекватности результатов (ошибка) </Option>
            <Option value={15}>Закрытие сессии КИС </Option>
            <Option value={16}>Оприходование излишков и списание недостач </Option>
            <Option value={17}>Подсчет суммы переучетов </Option>
            <Option value={18}>Проверка правильности переходящей даты переучета </Option>
            <Option value={19}>Информирование ИД о результатах переучета </Option>
            <Option value={20}>Согласование списания недостач </Option>
            <Option value={21}>Удержание части недостач из ЗП сотрудников склада</Option>
            <Option value={22}>Занесение служебной записки в КИС </Option>
            <Option value={23}>Списание части недостачи за счет компании </Option>
            <Option value={24}>Завершена</Option>
          </Select>
        </FormItem>

        <FormItem name="userName"
                  label="Пользователь"
                  rules={[{ required: true }]}
        >
          <Select style={{ width: '100%' }} defaultValue={values.UserName}  >
            <Option value="Исполнительный директор">Исполнительный директор</Option>
            <Option value="Контролер ОВК по затратам ">Контролер ОВК по затратам</Option>
            <Option value="Контролер ОВК по переучетам">Контролер ОВК по переучетам</Option>
            <Option value="Начальник склада">Начальник склада </Option>
            <Option value="Грузчик">Грузчик</Option>
            <Option value="Кладовщик">Кладовщик</Option>
            <Option value="Менеджер склада">Менеджер склада</Option>
            <Option value="Логист склада">Логист склада</Option>
          </Select>
        </FormItem>

        <FormItem
          name="note"
          label="Примечание"
          rules={[{ required: false, message: 'Пожалуйста, введите примечание как минимум из трёх символов!', min: 3 }]}
        >
          <TextArea rows={4} placeholder="Пожалуйста, введите не менее трёх символов" />
        </FormItem>

      </Form>

    </Modal>
  );
};

export default EditForm;
