
function createAd(item, callback) {
  const adRes = fetch('/api/ads', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: item.title,
      link: item.link,
      description: item.description,
      adCode: item.adCode,
    }),
  })

    .then(res => res.json())
    .then(results => results);
  return Promise.resolve(adRes);
}
function getAds(callback) {
  const apiAds = fetch('/api/ads')
    .then(res => res.json());
  return Promise.resolve(apiAds);
}
function getAdById(callback, id) {
  const apiAds = fetch(`/api/ads/${id}`)
    .then(res => res.json());
  return Promise.resolve(apiAds);
}
function checkadCode(id) {
  return fetch(`/api/ads/${id}`)
    .then(res => res.json());
}

function editAds(item, id) {
  fetch(`/api/ads/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: item.title,
      link: item.link,
      description: item.description,
    }),

  })
    .then((res) => {
      console.log(res);
    });
}


function deleteAds(index, id) {
  return fetch(`/api/ads/${id}`, {
    method: 'delete',
  })
    .then((res) => {
      console.log(res);
    });
}
function getAndDisplayAds(callback) {
  getAds(displayAds);
  return Promise.resolve('promise');
}
