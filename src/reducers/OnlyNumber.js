export const ACTIONS = {
  ADD: 'ADD',
  CLEAR: 'CLEAR',
};

function OnlyNumber(state, action) {
  switch (action.type) {
    case ACTIONS.ADD: {
      return action.payload.value.replace(/[^0-9]/g, '');
    }
    case ACTIONS.CLEAR: {
      return '';
    }
    default: {
      return state;
    }
  }
}

export default OnlyNumber;