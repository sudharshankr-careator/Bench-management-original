const HOST = window.location.host;
const DATABASE_URL = `http://localhost:5000`;

const STATUS: string[] = [
  'ALLOCATED',
  'AVAILABLE',
  'BLOCKED',
  'LEAVE',
  'NONBILLABLE',
  'RESIGN',
];

const STATUS_LIST: any = [
  {
    text: 'ALLOCATED',
    value: 'A',
  },
  {
    text: 'AVAILABLE',
    value: 'V',
  },
  {
    text: 'BLOCKED',
    value: 'B',
  },
  {
    text: 'LEAVE',
    value: 'L',
  },
  {
    text: 'NONBILLABLE',
    value: 'N',
  },
  {
    text: 'RESIGN',
    value: 'R',
  },
];

const STATUS_CODE: string[] = ['A', 'V', 'B', 'L', 'N', 'R'];

const ROLE: string[] = ['AD', 'AM', 'RM', 'HR', 'L'];
const ROLE_NAME: string[] = [
  'Admin',
  'Account Manager',
  'Resource Manager',
  'Human Resources',
  'LeaderShip',
];
const COLORS: string[] = [
  'magenta',
  'cyan',
  'lime',
  'green',
  'geekblue',
  'red',
];
const CONSTANTS = {
  HOST,
  DATABASE_URL,
  STATUS,
  STATUS_CODE,
  ROLE,
  COLORS,
  STATUS_LIST,
  ROLE_NAME,
};
export default CONSTANTS;
