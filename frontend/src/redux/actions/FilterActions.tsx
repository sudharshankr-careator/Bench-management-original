const ACTION_TYPES = {
  DATA: "DATA",
};

const filter = (data: any) => {
  return { type: ACTION_TYPES.DATA, data };
};

const FILTER_ACTIONS = {
  ACTION_TYPES,
  filter,
};
export default FILTER_ACTIONS;
