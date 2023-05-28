export function getStatusText(status: 'created' | 'pending' | 'done'): string {
  switch (status) {
    case 'done':
      return 'Выполнен';

    case 'pending':
      return 'В процессе';

    case 'created':
      return 'Создан';
  }
}