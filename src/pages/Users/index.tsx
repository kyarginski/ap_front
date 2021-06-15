import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { SorterResult } from 'antd/es/table/interface';

import CreateForm from './components/CreateForm';
import EditForm, {FormValueType} from './components/EditForm';
import { TableListItem } from './data.d';
import {addUser, updateUser, deleteUser, queryUsers} from './service';

/**
 * Добавить данные
 * @param fields
 */
const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading('Добавление');
  try {
    await addUser({ ...fields });
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
 * Обновить данные
 * @param fields
 */
const handleEdit = async (fields: FormValueType) => {
  const hide = message.loading('Обновление');
  try {
    await updateUser({
      id: fields.id,
      username: fields.username,
      password: fields.password,
      surname: fields.surname,
      firstname: fields.firstname,
      patronymic: fields.patronymic,
      createDt: fields.createDt,
      endDt: fields.endDt,
      locked: fields.locked,
      secType: fields.secType,
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
    await deleteUser({
      id: selectedRows.map(row => row.id),
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
      dataIndex: 'id',
      hideInForm: true,
      sorter: true,
    },
    {
      title: 'Логин',
      dataIndex: 'username',
      sorter: true,
    },
    {
      title: 'Пароль',
      dataIndex: 'password',
      sorter: false,
      hideInForm: false,
      hideInTable: true,
    },
    {
      title: 'Фамилия',
      dataIndex: 'surname',
      sorter: true,
    },
    {
      title: 'Имя',
      dataIndex: 'firstname',
      sorter: true,
    },
    {
      title: 'Отчество',
      dataIndex: 'patronymic',
      sorter: true,
    },
    {
      title: 'Дата создания',
      dataIndex: 'createDt',
      valueType: 'dateTime',
      sorter: true,
    },
    {
      title: 'Дата завершения',
      dataIndex: 'endDt',
      valueType: 'dateTime',
      sorter: true,
    },
    {
      title: 'Заблокирован',
      dataIndex: 'locked',
      sorter: true,
      valueEnum: {
        0: { text: 'Нет', status: 'Default' },
        1: { text: 'Да', status: 'Processing' },
      },
    },
    {
      title: 'Тип',
      dataIndex: 'secType',
      sorter: true,
      valueEnum: {
        0: { text: 'Тип Обычный', status: 'Default' },
        1: { text: 'Тип Другой', status: 'Processing' },
      },
    },
    {
      title: 'Операции',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
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
        headerTitle="Список пользователей"
        actionRef={actionRef}
        rowKey="id"
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
            <PlusOutlined /> Новый пользователь
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
        request={params => queryUsers(params)}
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
          rowKey="id"
          type="form"
          columns={columns}
          rowSelection={{}}
        />
      </CreateForm>
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
