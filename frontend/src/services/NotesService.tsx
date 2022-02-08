import { gql } from '@apollo/client';

const NOTES_BY_RESOURCEID = gql`
  query ($resourceid: Int!) {
    findNoteByResourceid(resourceid: $resourceid) {
      id
      notes
      createdat
      user {
        email
        username
      }
    }
  }
`;
const CREATE_NOTE = gql`
  mutation ($createNoteInput: CreateNoteInput!) {
    createNote(createNoteInput: $createNoteInput) {
      id
    }
  }
`;
const UPDATE_NOTE = gql`
  mutation ($updateNoteInput: UpdateNoteInput!) {
    updateNote(updateNoteInput: $updateNoteInput) {
      __typename
    }
  }
`;
const NOTE_SERVICE = { NOTES_BY_RESOURCEID, CREATE_NOTE, UPDATE_NOTE };

export default NOTE_SERVICE;
