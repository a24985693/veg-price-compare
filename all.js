const searchCrop = document.querySelector('#searchCrop');
const searchButton = document.querySelector('#searchButton');
const tab = document.querySelector('#tab');
const tableResult = document.querySelector('#tableResult');
const sortDirection = document.querySelector('#sortDirection');

// 點選種類，空字串代表不限種類
let tabType = '';

// 全部資料
let cropData = [];

// 搜尋資料
let searchData = [];

// 排序值
let selectedValue;

// tab 各種類代碼
const typeValue = {
  tabVegetables: 'N04',
  tabFruits: 'N05',
  tabFlowers: 'N03',
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
    })
    .catch(err => {
      alert('出現錯誤，請稍後嘗試');
    })
}
getData();

// 搜尋按鈕
searchButton.addEventListener('click', () => {
  const searchResult = document.querySelector('#searchResult');
  const cropValue = searchCrop.value.trim();

  searchCrop.value = '';

  if(cropValue) {
    searchResult.classList.remove('display-none');
    searchResult.innerHTML = `查看「${cropValue}」的比價結果`;
  } else {
    searchResult.classList.add('display-none');
  }

  // 搜尋並篩選資料
  searchData = cropData.filter(item => {
    let isTypeMatch = (item.種類代碼 === tabType) || (tabType === '');
    let cropName = item.作物名稱 || '';
    let isNameMatch = cropName.includes(cropValue);

    return isTypeMatch && isNameMatch;
  })

  if(selectedValue) {
    sortData();
  }else {
    renderResult();
  }
})

// 點擊 tab 切換種類
tab.addEventListener('click', e => {
  const tabItems = document.querySelectorAll('li');

  tabItems.forEach(item => {
    item.classList.toggle('active', e.target.id === item.id);
  })

  // 各種類代碼
  tabType = typeValue[e.target.id];
})

// 渲染搜尋結果
function renderResult() {
  let str = '';

  if(searchData.length != 0) {
    searchData.forEach(item => {
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

// 選擇排序
sortDirection.addEventListener('change', function() {
  selectedValue = optionValue[this.value];
  
  if(searchData.length != 0) {
    sortData();
  }
})

// 排序資料
function sortData() {
  searchData.sort((a, b) => {
    return  a[selectedValue] - b[selectedValue];
  });

  if(searchData.length != 0) {
    renderResult();
  }
}