const fetchData = () => {
  return new Promise((resolve, reject) => {
    fetch('https://api.github.com/users/chriscoyier/repos').then(res => {
      if (res.ok) {
        resolve(res.json())
      }
    }).catch(error => {
      reject(error);
    })
  })
};

(async function () {
  let [error, data] = await fetchData().then(res => [null, res]).catch(error => [error, null]);

  console.log(error);
  console.log(data);
})();