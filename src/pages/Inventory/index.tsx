import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { SorterResult } from 'antd/es/table/interface';

import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import EditForm from './components/EditForm';
import { TableListItem } from './data.d';
import {addInventory, updateInventory, deleteInventory, queryInventory, updateInventoryStatus} from './service';

/**
 * Добавить данные
 * @param fields
 */
const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading('Добавление');
  try {
    await addInventory({ ...fields });
    hide();
    message.success('Добавлено успешно');
    return true;
  } catch (error) {
    hide();
    message.error('Добавить не удалось, попробуйте еще раз!');
    return false;
  }
};

/**
 * Обновить статус
 * @param fields
 */
const handleUpdateStatus = async (fields: FormValueType) => {
  const hide = message.loading('Обновление статуса');
  try {
    await updateInventoryStatus({
      Id: fields.Id,
      Name: fields.Name,
      Note: fields.Note,
      StatusId: fields.StatusId,
      UserName: fields.UserName,
    });
    hide();

    message.success('Статус обновлен');
    return true;
  } catch (error) {
    hide();
    message.error('Обновление не удалось. Пожалуйста, попробуйте еще раз!');
    return false;
  }
};

/**
 * Обновить данные
 * @param fields
 */
const handleEdit = async (fields: FormValueType) => {
  const hide = message.loading('Обновление');
  try {
    await updateInventory({
      Id: fields.Id,
      Name: fields.Name,
      Note: fields.Note,
      StatusId: fields.StatusId,
      UserName: fields.UserName,
    });
    hide();

    message.success('Обновлено успешно');
    return true;
  } catch (error) {
    hide();
    message.error('Обновление не удалось. Пожалуйста, попробуйте еще раз!');
    return false;
  }
};


/**
 *  Удалить
 * @param selectedRows
 */
const handleRemove = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('Удаление');
  if (!selectedRows) return true;
  try {
    await deleteInventory({
      id: selectedRows.map(row => row.Id),
    });
    hide();
    message.success('Удалено успешно');
    return true;
  } catch (error) {
    hide();
    message.error('Удалить не удалось, попробуйте еще раз');
    return false;
  }
};

const TableList: React.FC<{}> = () => {
  const [sorter, setSorter] = useState<string>('');
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [editModalVisible, handleEditModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'Идентификатор',
      dataIndex: 'Id',
      hideInForm: true,
      sorter: true,
      rules: [
        {
          required: false,
          message: 'Идентификатор обязателен',
        },
      ],
    },
    {
      title: 'Наименование',
      dataIndex: 'Name',
      sorter: true,
      rules: [
        {
          required: true,
          message: 'Наименование обязательно',
        },
      ],
    },
    {
      title: 'Статус',
      dataIndex: 'StatusId',
      hideInForm: false,
      rules: [
        {
          required: true,
          message: 'Статус обязателен',
        },
      ],
      valueEnum: {
        1: { text: 'Новая', status: 'Processing' },
        2: { text: 'Подготовка (закрытие доков)', status: 'Default' },
        3: { text: 'Сессия в WMS', status: 'Default' },
        4: { text: 'Формирование инвентаризации в WMS', status: 'Default' },
        5: { text: 'Наряд на инвентаризацию в WMS', status: 'Default' },
        6: { text: 'Подсчет товаров в ячейках', status: 'Default' },
        7: { text: 'Иной товар в виртуальную ячейку', status: 'Default' },
        8: { text: 'Занесение фактических данных в WMS', status: 'Default' },
        9: { text: 'Сравнение результатов', status: 'Default' },
        10: { text: 'Формировние инвентаризации проблемных ячеек (не совпадает)', status: 'Default' },
        11: { text: 'Закрытие сессии в WMS', status: 'Default' },
        12: { text: 'Подсчет товаров в виртуальной ячейке (совпадает)', status: 'Default' },
        13: { text: 'Проверка адекватности результатов (ок)', status: 'Default' },
        14: { text: 'Проверка адекватности результатов (ошибка)', status: 'Default' },
        15: { text: 'Закрытие сессии КИС', status: 'Default' },
        16: { text: 'Оприходование излишков и списание недостач', status: 'Default' },
        17: { text: 'Подсчет суммы переучетов', status: 'Default' },
        18: { text: 'Проверка правильности переходящей даты переучета', status: 'Default' },
        19: { text: 'Информирование ИД о результатах переучета', status: 'Default' },
        20: { text: 'Согласование списания недостач', status: 'Default' },
        21: { text: 'Удержание части недостач из ЗП сотрудников склада', status: 'Default' },
        22: { text: 'Занесение служебной записки в КИС', status: 'Default' },
        23: { text: 'Списание части недостачи за счет компании', status: 'Default' },
        24: { text: 'Завершена', status: 'Default' },
      },

    },
    {
      title: 'Пользователь',
      dataIndex: 'UserName',
      sorter: true,
      rules: [
        {
          required: true,
          message: 'Пользователь обязателен',
        },
      ],
      valueEnum: {
        'Исполнительный директор': { text: 'Исполнительный директор', status: 'Default' },
        'Контролер ОВК по затратам': { text: 'Контролер ОВК по затратам', status: 'Processing' },
        'Контролер ОВК по переучетам': { text: 'Контролер ОВК по переучетам', status: 'Processing' },
        'Начальник склада': { text: 'Начальник склада', status: 'Processing' },
        'Грузчик': { text: 'Грузчик', status: 'Processing' },
        'Кладовщик': { text: 'Кладовщик', status: 'Processing' },
        'Менеджер склада': { text: 'Менеджер склада', status: 'Processing' },
        'Логист склада': { text: 'Логист склада', status: 'Processing' },
      },
    },
    {
      title: 'Примечание',
      dataIndex: 'Note',
      valueType: 'textarea',
    },
    {
      title: 'Дата обновления',
      dataIndex: 'UpdatedAt',
      sorter: true,
      valueType: 'dateTime',
      hideInForm: true,
    },
    {
      title: 'Операции',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            Следующий шаг
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              setStepFormValues(record);
              // alert("id = " + record.Id )
              handleEditModalVisible(true);
            }}
          >
            Редактировать
          </a>

        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        headerTitle="Список инвентаризаций"
        actionRef={actionRef}
        rowKey="Id"
        onChange={(_, _filter, _sorter) => {
          const sorterResult = _sorter as SorterResult<TableListItem>;
          if (sorterResult.field) {
            setSorter(`${sorterResult.field}_${sorterResult.order}`);
          }
        }}
        params={{
          sorter,
        }}
        toolBarRender={(action, { selectedRows }) => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> Новая инвентаризация
          </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  onClick={async e => {
                    if (e.key === 'remove') {
                      await handleRemove(selectedRows);
                      action.reload();
                    }
                  }}
                  selectedKeys={[]}
                >
                  <Menu.Item key="remove">Удаление</Menu.Item>
                  <Menu.Item key="approval">Утверждение</Menu.Item>
                </Menu>
              }
            >
              <Button>
                Пакетные операции <DownOutlined />
              </Button>
            </Dropdown>
          ),
        ]}
        tableAlertRender={(selectedRowKeys) => (
          <div>
            Выбрано <a style={{ fontWeight: 600 }}>{selectedRowKeys.selectedRowKeys.length}</a>
          </div>
        )}
        request={params => queryInventory(params)}
        columns={columns}
        rowSelection={{}}
      />
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable<TableListItem, TableListItem>
          onSubmit={async value => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="Id"
          type="form"
          columns={columns}
          rowSelection={{}}
        />
      </CreateForm>
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async value => {
            const success = await handleUpdateStatus(value);
            if (success) {
              handleModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}
      {stepFormValues && Object.keys(stepFormValues).length ? (
      <EditForm
        onSubmit={async value => {
          const success = await handleEdit(value);

          if (success) {
            handleEditModalVisible(false);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          setStepFormValues({});
        }}
        editModalVisible={editModalVisible}
        values={stepFormValues}
      />
      ) : null}

    </PageHeaderWrapper>

  );
};

export default TableList;
