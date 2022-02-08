import { useQuery } from "@apollo/client";
import { Card, Image, Spin } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import USER_SERVICE from "../services/UserService";
import { Store } from "../types/Redux";

export default function Profile() {
  const userId = useSelector((store: Store) => store.userSession.user?.userid);
  const { Meta } = Card;
  const { data, loading, error } = useQuery(USER_SERVICE.USER, {
    variables: {
      userId: userId,
    },
  });
  if (loading) {
    return <Spin />;
  }

  return (
    <Card
      bordered={true}
      hoverable
      style={{ width: 540, position: "relative", left: 250, top: 50 }}
    >
      <div style={{ position: "relative", left: 150 }}>
        <Image
          width={200}
          src="https://www.freeiconspng.com/uploads/profile-icon-1.png"
        />
      </div>
      {data && data.user && (
        <>
          <Meta
            title="Name :"
            style={{ fontSize: "100", color: "red" }}
            description={data.user.username}
          />
          <Meta title="Email :" description={data.user.email} />

          <Meta title="Mobile :" description={data.user.mobile} />
        </>
      )}
    </Card>
  );
}
