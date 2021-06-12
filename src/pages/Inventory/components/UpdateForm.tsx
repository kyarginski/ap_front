import React, { useState } from 'react';
import { Form, Button, Input, Modal, Select, Steps } from 'antd';

import { TableListItem } from '../data.d';

export interface FormValueType extends Partial<TableListItem> {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
  newStatusId?: number;
}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}
const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;

export interface UpdateFormState {
  formVals: FormValueType;
  currentStep: number;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateForm: React.FC<UpdateFormProps> = props => {
  const [formVals, setFormVals] = useState<FormValueType>({
    Name: props.values.Name,
    Note: props.values.Note,
    Id: props.values.Id,
    UserName: props.values.UserName,
    StatusId: props.values.StatusId,
    newStatusId: props.values.StatusId,
    target: '0',
    template: '0',
    type: '1',
    time: '',
    frequency: 'month',
  });

  const [currentStep, setCurrentStep] = useState<number>(0);

  const [form] = Form.useForm();

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  const forward = () => setCurrentStep(currentStep + 1);

  const backward = () => setCurrentStep(currentStep - 1);

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();

    setFormVals({ ...formVals, ...fieldsValue });

    if (currentStep < 1) {
      forward();
    } else {
      formVals.UserName = form.getFieldValue("userName");
      formVals.StatusId = fieldsValue.newStatusId;
      formVals.Name = form.getFieldValue("name");
      formVals.Note = form.getFieldValue("note");
//       alert("formVals.newStatusId = " + formVals.newStatusId  + "; formVals.StatusId = " + formVals.StatusId)
//       alert("form.getFieldValue(`userName`) = " + form.getFieldValue("userName") + "; formVals.UserName = " + formVals.UserName)
      handleUpdate(formVals);
    }
  };

  const renderContent = () => {
    if (currentStep === 1) {
      return (
        <>
          <FormItem
            name="statusId"
            label="Текущий шаг"
            rules={[{ required: false }]}
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
          <FormItem name="newStatusId" label="Следующий шаг"  >
            <Select style={{ width: '100%' }} defaultValue={values.StatusId}  >
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
        </>
      );
    }
    return (
      <>
        <FormItem
          name="name"
          label="Наименование"
          rules={[{ required: true, message: 'Пожалуйста, введите имя!' }]}
        >
          <Input placeholder="Пожалуйста, введите " />
        </FormItem>

        <FormItem name="userName" label="Пользователь"  >
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
      </>
    );
  };

  const renderFooter = () => {
    if (currentStep === 1) {
      return (
        <>
          <Button style={{ float: 'left' }} onClick={backward}>
            Обратно
          </Button>
          <Button onClick={() => handleUpdateModalVisible(false, values)}>Отмена</Button>
          <Button type="primary" onClick={() => handleNext()}>
            Сохранить
          </Button>
        </>
      );
    }
    return (
      <>
        <Button onClick={() => handleUpdateModalVisible(false, values)}>Отмена</Button>
        <Button type="primary" onClick={() => handleNext()}>
          Далее
        </Button>
      </>
    );
  };

  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="Следующий шаг"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible(false, values)}
      afterClose={() => handleUpdateModalVisible()}
    >
      <Steps style={{ marginBottom: 28 }} size="default" current={currentStep}>
        <Step title="Описание" />
        <Step title="Установка следующего шага" />
      </Steps>
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          target: formVals.target,
          template: formVals.template,
          type: formVals.type,
          frequency: formVals.frequency,
          name: formVals.Name,
          userName: formVals.UserName,
          note: formVals.Note,
          id: formVals.Id,
          statusId: formVals.StatusId,
          newStatusId: formVals.StatusId! + 1,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
