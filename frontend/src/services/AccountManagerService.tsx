import { gql } from '@apollo/client';
import axios from 'axios';
import CONSTANTS from '../constants';

const ACTIVE_OR_INACTIVE_RESOURCE = gql`
  query ($isactive: Boolean!) {
    findActiveAndInActiveResource(isactive: $isactive) {
      id
      fullname
      empid
      doj
      gender
      primaryphonenumber
      emailid
      personalemailid
      designation
      skills
      accname
      accountmanagerid
      accmanager {
        userid
        username
      }
      isam
      projectreleasedate
      projectreleasereason
      statuscode

      isactive
      createdby
      resumeid

      document {
        id
        filename
        documentname
        fileurl
      }
      notes {
        id
        notes
        createdat
        user {
          email
          username
        }
      }
    }
  }
`;

const GET_BY_ACCOUNT = gql`
  query ($accountmanagerid: String!) {
    findbyAccountManger(accountmanagerid: $accountmanagerid) {
      id
      fullname
      empid
      doj
      gender
      primaryphonenumber
      emailid
      personalemailid
      accname
      isam
      designation
      skills
      accountmanagerid
      accmanager {
        userid
        username
      }
      projectreleasedate
      projectreleasereason
      statuscode

      isactive
      createdby
      resumeid

      document {
        id
        filename
        documentname
        fileurl
      }
      notes {
        id
        notes
        createdat
        user {
          email
          username
        }
      }
    }
  }
`;

const ALL_RESOURCES = gql`
  query Allresources {
    allresources {
      id
      fullname
      empid
      doj
      gender
      primaryphonenumber
      emailid
      personalemailid
      designation
      skills
      isam
      accname
      accountmanagerid
      accmanager {
        userid
        username
      }
      projectreleasedate
      projectreleasereason
      statuscode

      isactive
      createdby
      resumeid

      document {
        id
        filename
        documentname
        fileurl
      }
      notes {
        id
        notes
        createdat
        user {
          email
          username
        }
      }
    }
  }
`;

const RESOURES = gql`
  query Resource($resourceId: Int!) {
    resource(id: $resourceId) {
      id
      fullname
      empid
      doj
      gender
      primaryphonenumber
      emailid
      personalemailid
      designation
      isam
      skills
      accname
      accountmanagerid
      accmanager {
        userid
        username
      }
      projectreleasedate
      projectreleasereason
      statuscode

      isactive
      createdby
      resumeid

      document {
        id
        filename
        documentname
        fileurl
      }
      notes {
        id
        notes
        createdat
        user {
          email
          username
        }
      }
    }
  }
`;

const UPDATE_RESOURCE = gql`
  mutation UpdateResource($updateResourceInput: UpdateResourceInput!) {
    updateResource(updateResourceInput: $updateResourceInput) {
      __typename
    }
  }
`;

const CREATE_RESOURCE = gql`
  mutation CreateResource($createResourceInput: CreateResourceInput!) {
    createResource(createResourceInput: $createResourceInput) {
      id
    }
  }
`;
const AM_A_COUNT = gql`
  query ($accountmanagerid: String!) {
    findAMACount(accountmanagerid: $accountmanagerid)
  }
`;
const AM_V_COUNT = gql`
  query ($accountmanagerid: String!) {
    findAMVCount(accountmanagerid: $accountmanagerid)
  }
`;
const AM_B_COUNT = gql`
  query ($accountmanagerid: String!) {
    findAMBCount(accountmanagerid: $accountmanagerid)
  }
`;
const AM_L_COUNT = gql`
  query ($accountmanagerid: String!) {
    findAMLCount(accountmanagerid: $accountmanagerid)
  }
`;
const A_COUNT = gql`
  query {
    findACount
  }
`;
const V_COUNT = gql`
  query {
    findVCount
  }
`;
const B_COUNT = gql`
  query {
    findBCount
  }
`;
const L_COUNT = gql`
  query {
    findLCount
  }
`;
const UPLOAD_DOCUMENT = async (docfile: any, id: any) => {
  const url = `${CONSTANTS.DATABASE_URL}/document/upload-resume-to-aws/${id}`;
  return await axios.post(url, docfile);
};
const GET_DOCUMENT = async (id: any, filename: any) => {
  const url = `${CONSTANTS.DATABASE_URL}/document/doc-file-from-aws/${id}/${filename}`;
  return await axios.get(url);
};

const UPDATE_DOCUMENT = async (docfile: any, resourceid: any, docid: any) => {
  const url = `${CONSTANTS.DATABASE_URL}/document/update-resume-in-aws/${resourceid}/${docid}`;
  return await axios.patch(url, docfile);
};

const RESOURCE_UPLOAD = async (userid: any, file: any) => {
  const url = `${CONSTANTS.DATABASE_URL}/resource/upload/${userid}`;
  return await axios.post(url, file);
};
const ACCOUNT_MANAGER_SERVICE = {
  ALL_RESOURCES,
  RESOURES,
  UPDATE_RESOURCE,
  CREATE_RESOURCE,
  A_COUNT,
  V_COUNT,
  B_COUNT,
  L_COUNT,
  AM_A_COUNT,
  AM_V_COUNT,
  AM_B_COUNT,
  AM_L_COUNT,

  GET_BY_ACCOUNT,
  ACTIVE_OR_INACTIVE_RESOURCE,
  UPLOAD_DOCUMENT,
  GET_DOCUMENT,
  UPDATE_DOCUMENT,
  RESOURCE_UPLOAD,
};

export default ACCOUNT_MANAGER_SERVICE;
