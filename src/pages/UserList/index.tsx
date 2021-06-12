import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Drawer } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import { getUsers, addUser, updateUser, removeUser } from '@/services/users/serviceUsers';

/**
 * Список пользователей - добавить
 *
 * @param fields
 */
const handleAdd = async (fields: users.UserListItem) => {
  const hide = message.loading('Добавление');
  try {
    await addUser({ ...fields });
    hide();
    message.success('Добавлено успешно');
    return true;
  } catch (error) {
    hide();
    message.error('Не удалось добавить, попробуйте еще раз!');
    return false;
  }
};

/**
 * Обновление
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('Обновление');
  try {
    await updateUser({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();

    message.success('Обновление прошло успешно');
    return true;
  } catch (error) {
    hide();
    message.error('Ошибка обновления, попробуйте еще раз!');
    return false;
  }
};

/**
 * Удаление
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: users.UserListItem[]) => {
  const hide = message.loading('Удаление');
  if (!selectedRows) return true;
  try {
    await removeUser({
      key: selectedRows.map((row) => row.id),
    });
    hide();
    message.success('Удалено успешно');
    return true;
  } catch (error) {
    hide();
    message.error('Не удалось удалить, попробуйте еще раз');
    return false;
  }
};

const TableUserList: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<users.UserListItem>();
  const [selectedRowsState, setSelectedRows] = useState<users.UserListItem[]>([]);

  const intl = useIntl();

  const columns: ProColumns<users.UserListItem>[] = [
    {
      title: (
        <FormattedMessage
          id="pages.userTable.updateForm.id.nameLabel"
          defaultMessage="Идентификатор"
        />
      ),
      dataIndex: 'id',
      tip: 'Идентификатор - это уникальный ключ',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: (
        <FormattedMessage id="pages.userTable.updateForm.login.nameLabel" defaultMessage="Логин" />
      ),
      dataIndex: 'username',
      sorter: true,
      valueType: 'textarea',
    },
    {
      title: (
        <FormattedMessage
          id="pages.userTable.updateForm.surname.nameLabel"
          defaultMessage="Фамилия"
        />
      ),
      dataIndex: 'surname',
      sorter: true,
      valueType: 'textarea',
    },
    {
      title: (
        <FormattedMessage
          id="pages.userTable.updateForm.firstname.nameLabel"
          defaultMessage="Имя"
        />
      ),
      dataIndex: 'firstname',
      sorter: true,
      valueType: 'textarea',
    },
    {
      title: (
        <FormattedMessage
          id="pages.userTable.updateForm.patronymic.nameLabel"
          defaultMessage="Отчество"
        />
      ),
      dataIndex: 'patronymic',
      sorter: true,
      valueType: 'textarea',
    },
    {
      title: (
        <FormattedMessage
          id="pages.userTable.updateForm.create_dt.nameLabel"
          defaultMessage="Дата создания"
        />
      ),
      dataIndex: 'create_dt',
      sorter: true,
      valueType: 'dateTime',
    },
    {
      title: (
        <FormattedMessage
          id="pages.userTable.updateForm.end_dt.nameLabel"
          defaultMessage="Дата окончания"
        />
      ),
      dataIndex: 'end_dt',
      sorter: true,
      valueType: 'dateTime',
    },
    {
      title: (
        <FormattedMessage
          id="pages.userTable.updateForm.locked.nameLabel"
          defaultMessage="Заблокировано"
        />
      ),
      dataIndex: 'locked',
      sorter: true,
      valueType: 'textarea',
    },
    {
      title: (
        <FormattedMessage id="pages.userTable.updateForm.sec_type.nameLabel" defaultMessage="Тип" />
      ),
      dataIndex: 'sec_type',
      sorter: true,
      valueType: 'textarea',
    },
  ];

  return (
    <PageContainer>
      <ProTable<users.UserListItem, API.PageParams>
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.title',
          defaultMessage: 'Список пользователей',
        })}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="Новый" />
          </Button>,
        ]}
        request={getUsers}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="выбран" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="элемент" />
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage
              id="pages.searchTable.batchDeletion"
              defaultMessage="групповое удаление"
            />
          </Button>
          <Button type="primary">
            <FormattedMessage
              id="pages.searchTable.batchApproval"
              defaultMessage="групповое подтверждение"
            />
          </Button>
        </FooterToolbar>
      )}
      <ModalForm
        title={intl.formatMessage({
          id: 'pages.searchTable.createForm.newUser',
          defaultMessage: 'Новый пользователь',
        })}
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as users.UserListItem);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage id="pages.userTable.login" defaultMessage="Login обязателен" />
              ),
            },
          ]}
          width="md"
          name="login"
        />
        <ProFormTextArea width="md" name="desc" />
      </ModalForm>
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          setCurrentRow(undefined);
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.username && (
          <ProDescriptions<users.UserListItem>
            column={2}
            title={currentRow?.username}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.username,
            }}
            columns={columns as ProDescriptionsItemProps<users.UserListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableUserList;
