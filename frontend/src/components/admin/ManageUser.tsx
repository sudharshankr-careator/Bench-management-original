import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/client";
import { Button, Space, Switch, Table } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import USER_SERVICE from "../../services/UserService";

export default function ManageUser() {
  const navigate = useNavigate();
  const { data, loading, refetch } = useQuery(USER_SERVICE.ALL_USERS);
  const [updateSwitch] = useMutation(USER_SERVICE.UPDATE_USER);

  useEffect(() => {
    refetch();
  }, []);
  const onchange = (id: any, val: any) => {
    updateSwitch({
      variables: {
        updateUserInput: {
          userid: id,
          isactive: val,
        },
      },
    })
      .then(() => refetch())
      .catch((e) => {
        console.log(
          "🚀 ~ file: ManageResource.tsx ~ line 24 ~ onchange ~ e",
          e
        );
      });
  };
  const columns = [
    {
      title: "Sr. No.",
      dataIndex: "tableId",
    },
    {
      title: "Name",
      dataIndex: "username",
      sorter: (a: any, b: any) => a.username.localeCompare(b.username),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
    },
    {
      title: "Role",
      dataIndex: ["userrole", "role", "description"],
    },

    {
      title: "Actions",
      dataIndex: "action",
      // key: "email",
      render: (id: any, record: any) => (
        <>
          <Space align="center" size="large">
            <EditOutlined
              style={{ fontSize: "1.5rem", cursor: "pointer" }}
              onClick={() => {
                navigate(`/updateuser/${record.userid}`);
              }}
            />

            <Switch
              checked={record.isactive}
              onChange={(checked: any) => onchange(record.userid, checked)}
              style={{ fontSize: "1.5rem", cursor: "pointer" }}
            />
          </Space>
        </>
      ),
    },
  ];
  return (
    <div>
      <Button
        type="primary"
        onClick={() => navigate("/createuser")}
        style={{
          float: "right",
          marginTop: "1rem",
        }}
      >
        <PlusOutlined />
        Add Users
      </Button>
      <br />
      <br />
      <br />
      <div>
        <Table
          columns={columns}
          dataSource={
            data?.alluser
              ? data?.alluser
                  .filter((val: any) => {
                    if (val.userrole.role.description !== "admin") {
                      return val;
                    }
                  })
                  .map((val: any, index: any) => ({
                    ...val,
                    tableId: index + 1,
                  }))
              : null
          }
          rowKey={(record: any) => record?.userid}
          scroll={{ x: 1000 }}
          loading={loading}
          className="admintable"
        />{" "}
      </div>
    </div>
  );
}
