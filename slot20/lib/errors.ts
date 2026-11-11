export function getErrorMessage(error: unknown): string {
  if (typeof error === 'object' && error !== null) {
    if ('data' in error && typeof error.data === 'object' && error.data !== null) {
      const data = error.data as { error?: unknown };
      if (typeof data.error === 'string') return data.error;
    }
    if ('message' in error && typeof error.message === 'string') return error.message;
  }
  return 'Đã xảy ra lỗi, vui lòng thử lại';
}
