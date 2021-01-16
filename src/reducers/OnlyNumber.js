export const ACTIONS = {
  ADD: 'ADD'
};

function OnlyNumbers(value, action) {
  switch (action.type) {
    case ACTIONS.ADD: {
      return action.payload.value.replace(/[^0-9]/g, '');
    } default: {
      return value;
    }
  }
}

export default OnlyNumbers;