import {
  createAsyncThunk,
  createSelector,
  createSlice,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';
import { studentApi } from '../../api/studentApi.js';

const getErrorMessage = (error) =>
  error.response?.data?.message || error.message || 'Có lỗi xảy ra.';

export const fetchStudents = createAsyncThunk(
  'students/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await studentApi.getAll();
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const addStudent = createAsyncThunk(
  'students/add',
  async (student, { getState, rejectWithValue }) => {
    const duplicate = getState().students.items.some(
      (item) => item.code.toLowerCase() === student.code.toLowerCase(),
    );
    if (duplicate) {
      return rejectWithValue(`Mã sinh viên ${student.code} đã tồn tại.`);
    }

    try {
      return await studentApi.create(student);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const updateStudent = createAsyncThunk(
  'students/update',
  async ({ id, ...data }, { getState, rejectWithValue }) => {
    const duplicate = getState().students.items.some(
      (item) =>
        item.id !== id && item.code.toLowerCase() === data.code.toLowerCase(),
    );
    if (duplicate) {
      return rejectWithValue(`Mã sinh viên ${data.code} đã tồn tại.`);
    }

    try {
      return await studentApi.update(id, { id, ...data });
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const deleteStudent = createAsyncThunk(
  'students/delete',
  async (id, { rejectWithValue }) => {
    try {
      return await studentApi.remove(id);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

const studentsSlice = createSlice({
  name: 'students',
  initialState: {
    items: [],
    status: 'idle',
    saving: false,
    error: null,
    keyword: '',
    sortBy: 'code',
  },
  reducers: {
    setKeyword(state, action) {
      state.keyword = action.payload;
    },
    setSortBy(state, action) {
      if (['code', 'name', 'gpa'].includes(action.payload)) {
        state.sortBy = action.payload;
      }
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? action.error.message ?? 'Không tải được dữ liệu.';
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.saving = false;
        state.items.push(action.payload);
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.saving = false;
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.saving = false;
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addMatcher(
        isPending(addStudent, updateStudent, deleteStudent),
        (state) => {
          state.saving = true;
          state.error = null;
        },
      )
      .addMatcher(
        isRejected(addStudent, updateStudent, deleteStudent),
        (state, action) => {
          state.saving = false;
          state.error =
            action.payload ?? action.error.message ?? 'Không thể lưu thay đổi.';
        },
      );
  },
});

export const { setKeyword, setSortBy, clearError } = studentsSlice.actions;
export default studentsSlice.reducer;

export const selectStudentsState = (state) => state.students;
const selectItems = (state) => state.students.items;
const selectKeyword = (state) => state.students.keyword;
const selectSortBy = (state) => state.students.sortBy;

export const selectVisibleStudents = createSelector(
  [selectItems, selectKeyword, selectSortBy],
  (items, keyword, sortBy) => {
    const normalizedKeyword = keyword.trim().toLocaleLowerCase('vi');
    const filtered = normalizedKeyword
      ? items.filter(
          (student) =>
            student.name.toLocaleLowerCase('vi').includes(normalizedKeyword) ||
            student.code.toLocaleLowerCase('vi').includes(normalizedKeyword),
        )
      : items;

    return [...filtered].sort((first, second) =>
      sortBy === 'gpa'
        ? Number(second.gpa) - Number(first.gpa)
        : String(first[sortBy]).localeCompare(String(second[sortBy]), 'vi'),
    );
  },
);

export const selectAverageGpa = createSelector([selectItems], (items) =>
  items.length
    ? (
        items.reduce((sum, student) => sum + Number(student.gpa), 0) /
        items.length
      ).toFixed(2)
    : '0.00',
);
