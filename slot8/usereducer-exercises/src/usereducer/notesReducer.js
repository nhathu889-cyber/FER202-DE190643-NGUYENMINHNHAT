export const COLORS = [
  '#fff3a3',
  '#c8f7c5',
  '#cfe8ff',
  '#ffd6e0',
];

export const initialNotes = {
  nextId: 3,

  items: [
    {
      id: 1,
      text: 'Reducer phải là hàm thuần',
      color: COLORS[0],
      pinned: true,
    },
    {
      id: 2,
      text: 'Không sửa trực tiếp state',
      color: COLORS[2],
      pinned: false,
    },
  ],
};

export const notesReducer = (
  state,
  action
) => {
  switch (action.type) {
    case 'ADD_NOTE': {
      const text =
        action.payload.text.trim();

      if (!text) {
        return state;
      }

      const note = {
        id: state.nextId,
        text,
        color: action.payload.color,
        pinned: false,
      };

      return {
        nextId: state.nextId + 1,
        items: [
          note,
          ...state.items,
        ],
      };
    }

    case 'CHANGE_COLOR':
      return {
        ...state,

        items: state.items.map(
          (note) =>
            note.id ===
            action.payload.id
              ? {
                  ...note,
                  color:
                    action.payload
                      .color,
                }
              : note
        ),
      };

    case 'TOGGLE_PIN':
      return {
        ...state,

        items: state.items.map(
          (note) =>
            note.id === action.payload
              ? {
                  ...note,
                  pinned:
                    !note.pinned,
                }
              : note
        ),
      };

    case 'DELETE':
      return {
        ...state,

        items: state.items.filter(
          (note) =>
            note.id !== action.payload
        ),
      };

    case 'CLEAR_ALL':
      return state.items.length === 0
        ? state
        : {
            ...state,
            items: [],
          };

    default:
      throw new Error(
        `Action không hợp lệ: ${action.type}`
      );
  }
};