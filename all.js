const searchCrop = document.querySelector('#searchCrop');
const searchButton = document.querySelector('#searchButton');
const tab = document.querySelector('#tab');
const tableResult = document.querySelector('#tableResult');
const sortDirection = document.querySelector('#sortDirection');
const thead = document.querySelector('#thead');

// 點選種類，空字串代表不限種類
let tabType = '';

// 全部資料
let cropData = [];

// 搜尋資料
let searchData = [];

// 排序值
let selectedValue;

let cropValue

// tab 各種類代碼
const typeValue = {
  tabVegetables: 'N04',
  tabFruits: 'N05',
  tabFlowers: 'N06',
};

// option 對應的值
const optionValue = {
  priceUp: '上價',
  priceMiddle: '中價',
  priceDown: '下價',
  average: '平均價',
  volume: '交易量'
};

// 取得全部資料
function getData() {
  fetch('https://hexschool.github.io/js-filter-data/data.json')
    .then(res => res.json())
    .then(data => {
      cropData = data;
      searchData = [...cropData];
      renderData(cropData);
    })
    .catch(err => {
      alert('出現錯誤，請稍後嘗試');
    })
}
getData();

// 渲染搜尋結果
function renderData(data) {
  let str = '';

  if(data.length != 0) {
    data.forEach(item => {
      str += `
      <tr>
        <td>${item.作物名稱}</td>
        <td>${item.市場名稱}</td>
        <td>${item.上價}</td>
        <td>${item.中價}</td>
        <td>${item.下價}</td>
        <td>${item.平均價}</td>
        <td>${item.交易量}</td>
      </tr>`;
    })
  }else {
    str = `
      <tr>
        <td colspan="7">查詢不到當日的交易資訊QQ</td>
      </tr>`;
  }
  tableResult.innerHTML = str;
}

// 搜尋、分類、排序資料
function filterAndSort(tabType = '', cropValue = '', sortType = '') {
  let filtered = cropData.filter(item => {
    let isTypeMatch = (item.種類代碼 === tabType) || (tabType === '');
    let cropName = item.作物名稱 || '';
    let isNameMatch = cropName.includes(cropValue);
    return isTypeMatch && isNameMatch;
  });

  if(sortType) {
    sortData(filtered, sortType);
  }
  return filtered;
}

// sort
function sortData(filtered, sortType, direction = 'up') {
  let isUp = direction === 'up';
  if(isUp) {
    return filtered.sort((a, b) => a[sortType] - b[sortType]);
  } else {
    return filtered.sort((a, b) => b[sortType] - a[sortType]);
  }
}

// 搜尋按鈕
searchButton.addEventListener('click', () => {
  const searchMessage = document.querySelector('#searchMessage');
  cropValue = searchCrop.value.trim();

  if(!cropValue) {
    alert('請輸入作物名稱');
    return;
  }

  searchData = filterAndSort(tabType, cropValue, selectedValue);
  renderData(searchData);

  searchMessage.classList.remove('display-none');
  searchMessage.innerHTML = `查看「${cropValue}」的比價結果`;

  searchCrop.value = '';
})


// 點擊 tab 切換種類
tab.addEventListener('click', e => {
  if(e.target.tagName !== 'LI') return;

  const tabItems = document.querySelectorAll('li');
  tabItems.forEach(item => {
    item.classList.toggle('active', e.target.id === item.id);
  })

  // 各種類代碼
  tabType = typeValue[e.target.id];
  searchData = filterAndSort(tabType, cropValue, selectedValue);
  renderData(searchData);
})


// 選擇排序
sortDirection.addEventListener('change', function() {
  selectedValue = optionValue[this.value];
  searchData = filterAndSort(tabType, cropValue, selectedValue);
  renderData(searchData);
})

// 表單表頭的箭頭排序
thead.addEventListener('click', e => {
  if(e.target.tagName === 'I') {
    selectedValue = optionValue[e.target.dataset.price];
    let direction = e.target.dataset.sort;
    searchData = sortData(searchData, selectedValue, direction);
    renderData(searchData);
  }
})