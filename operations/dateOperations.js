export const year = new Date().getFullYear();
export const days = new Date().getDate(); // Gün numarası
export const monthNumber = new Date().getMonth();
export const hours = new Date().getHours();
export const minute = new Date().getMinutes();

export const aylar = [
    'OCAK','ŞUBAT','MART','NİSAN','MAYIS','HAZİRAN','TEMMUZ','AĞUSTOS','EYLÜL','EKİM','KASIM','ARALIK'
];

export const month = aylar[monthNumber];

export const getDaysInMonth = (monthName) => {
    const monthIndex = aylar.indexOf(monthName);
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    return [...Array(daysInMonth).keys()].map(i => i + 1);
};