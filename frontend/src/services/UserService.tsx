import { gql } from '@apollo/client';
import axios from 'axios';
import CONSTANTS from '../constants';

const USER_LOGIN = gql`
  mutation Mutation($login: LoginInput!) {
    login(login: $login) {
      userid
      token
      username
      email
      role
      firsttimelogin
    }
  }
`;
const FORGOT_PASSWORD = gql`
  mutation ($forgot: ForgotDto!) {
    forgotpassword(forgot: $forgot) {
      userid
    }
  }
`;

const USER_TOKEN = gql`
  query Query($userId: String!) {
    user(id: $userId) {
      usertoken
      firsttimelogin
    }
  }
`;

const UPDATE_PASSWORD = gql`
  mutation ($updateUserInput: UpdateUserInput!) {
    updatePassword(updateUserInput: $updateUserInput) {
      __typename
    }
  }
`;

const USER = gql`
  query User($userId: String!) {
    user(id: $userId) {
      userid
      email
      username
      mobile
      isactive
      userrole {
        role {
          id
          role
          description
        }
      }
    }
  }
`;
const CREATE_USER = gql`
  mutation ($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      userid
    }
  }
`;
const ALL_USERS = gql`
  query Alluser {
    alluser {
      userid
      email
      username
      mobile
      isactive
      userrole {
        role {
          role
          description
        }
      }
    }
  }
`;

const GET_ACC = gql`
  query {
    findacc {
      user {
        userid
        username
      }
    }
  }
`;
const UPDATE_USER = gql`
  mutation ($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      __typename
    }
  }
`;

const FIND_BY_ROLE = gql`
  query ($role: String!) {
    findByRole(role: $role) {
      id
    }
  }
`;
const SEND_MAIL = async (mailerdata: any) => {
  const url = `${CONSTANTS.DATABASE_URL}/sendmail`;
  return await axios.post(url, mailerdata);
};
const SEND_MAIL_RM = async (mailerdata: any) => {
  const url = `${CONSTANTS.DATABASE_URL}/sendmailrm`;
  return await axios.post(url, mailerdata);
};
const USER_SERVICE = {
  USER_LOGIN,
  FORGOT_PASSWORD,
  USER_TOKEN,
  UPDATE_PASSWORD,
  USER,
  CREATE_USER,
  ALL_USERS,
  UPDATE_USER,
  GET_ACC,
  FIND_BY_ROLE,
  SEND_MAIL,
  SEND_MAIL_RM,
};
export default USER_SERVICE;
