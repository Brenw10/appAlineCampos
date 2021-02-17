export const ACTIONS = {
  ADD: 'ADD',
  CLEAR: 'CLEAR',
};

function UpperCase(value, action) {
  switch (action.type) {
    case ACTIONS.ADD: {
      return action.payload.value.toUpperCase();
    }
    case ACTIONS.CLEAR: {
      return '';
    }
    default: {
      return value;
    }
  }
}

export default UpperCase;