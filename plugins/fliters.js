import Vue from 'vue';

Vue.filter('currency', (num) => {
  const n = Number(num);
  return `$${n.toFixed(0).replace(/./g, (c, i, a) => {
    const currency = (i && c !== '.' && ((a.length - i) % 3 === 0) ? `, ${c}`.replace(/\s/g, '') : c);
    return currency;
  })}`;
});

Vue.filter('date', (timestamp) => {
  const time = new Date(timestamp * 1000);
  const yyyy = time.getFullYear();
  const mm = (`0${time.getMonth() + 1}`).substr(-2);
  const dd = (`0${time.getDate()}`).substr(-2);

  return `${yyyy}-${mm}-${dd}`;
});
