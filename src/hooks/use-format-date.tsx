type TUseFormatDate = {
  formatDate: string;
};

export const useFormatDate = (InitialDate: string): TUseFormatDate => {
  const date = new Date(InitialDate);
  const now = new Date();

  const diff = Math.floor((+now - new Date(date).setHours(0, 0, 0, 0)) / 86400000);
  const time = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

  const daysText =
    diff % 10 === 1 && diff % 100 !== 11
      ? 'день'
      : [2, 3, 4].includes(diff % 10) && ![12, 13, 14].includes(diff % 100)
        ? 'дня'
        : 'дней';

  const formatDate =
    diff === 0
      ? `Сегодня, ${time}`
      : diff === 1
        ? `Вчера, ${time}`
        : `${diff} ${daysText} назад, ${time}`;

  return { formatDate };
};
