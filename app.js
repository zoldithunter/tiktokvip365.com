// Nếu có API thật, chỉ cần thay URL này
const API_URL = null; // ví dụ: "https://hunter-api.com/coins"

async function loadData() {
  try {
    let data;

    if (API_URL) {
      const res = await fetch(API_URL);
      data = await res.json();
    } else {
      // Demo data khi chưa có API
      data = await mockData();
    }

    renderPackages(data.packages);
    setupCustom(data.custom);
  } catch (err) {
    console.error(err);
    document.getElementById("package-list").innerHTML =
      "<p class='error'>Không thể tải dữ liệu. Vui lòng thử lại sau.</p>";
  }
}

// Mock data tạm thời
async function mockData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        packages: [
          { id: 1, coins: 70, price: 19000 },
          { id: 2, coins: 350, price: 95000 },
          { id: 3, coins: 700, price: 189000 },
          { id: 4, coins: 1400, price: 379000 },
          { id: 5, coins: 3500, price: 949000 },
          { id: 6, coins: 3500, price: 949000 },
          { id: 7, coins: 3500, price: 949000 },
          { id: 8, coins: 3500, price: 949000 },
        ],
        custom: { min: 100, max: 10000, rate: 270 },
      });
    }, 500);
  });
}

function renderPackages(packages) {
  const list = document.getElementById("package-list");
  list.innerHTML = "";

  packages.forEach((pkg) => {
    const card = document.createElement("div");
    card.className = "package-card";
    card.innerHTML = `
      <svg class="block" color="inherit" font-size="30px" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"><g clip-path="url(#Icon_Color-Tiktok_Coin_svg__a)"><path d="M48 24a24 24 0 1 1-48 0 24 24 0 0 1 48 0Z" fill="#FFB84D"></path><path d="M47 24a23 23 0 1 1-46 0 23 23 0 0 1 46 0Z" fill="#FFDE55"></path><path d="M42 24a18 18 0 1 1-36 0 18 18 0 0 1 36 0Z" fill="#F7A300"></path><path d="M42 24a18 18 0 1 1-36 0 18 18 0 0 1 36 0Z" fill="#F7A80F"></path><path d="M41.94 25.5a18 18 0 1 0-35.88 0 18 18 0 0 1 35.88 0Z" fill="#E88B00"></path><path d="M41.94 25.5a18 18 0 1 0-35.88 0 18 18 0 0 1 35.88 0Z" fill="#F09207"></path><path d="M34.74 17.77v5.86c-2.06 0-4.05-.44-5.81-1.55v7.2a7.79 7.79 0 0 1-7.84 7.75 7.79 7.79 0 0 1-7.8-8.35 7.79 7.79 0 0 1 9.19-8.24v6c-.47-.13-.9-.26-1.39-.26a3.14 3.14 0 0 0-3.09 2.5 3.14 3.14 0 0 0 3.1 2.5c1.74 0 3.14-1.4 3.14-3.11V12.03h4.69a5.6 5.6 0 0 0 5.81 5.74Z" fill="#F09207"></path><path d="M34.34 18.18a5.78 5.78 0 0 1-5.82-5.74h-3.87v15.63c0 1.94-1.6 3.5-3.56 3.5a3.53 3.53 0 0 1-3.55-3.5 3.53 3.53 0 0 1 4.52-3.38v-3.9a7.38 7.38 0 0 0-8.4 7.28 7.38 7.38 0 0 0 7.43 7.34c4.1 0 7.43-3.29 7.43-7.34v-7.98a9.73 9.73 0 0 0 5.82 1.92v-3.83Z" fill="#fff"></path></g><defs><clipPath id="Icon_Color-Tiktok_Coin_svg__a"><path fill="#fff" d="M0 0h48v48H0z"></path></clipPath></defs></svg>
      <h3>${pkg.coins} Coin</h3>
      <p>${pkg.price.toLocaleString()} ₫</p>
    `;
    list.appendChild(card);
  });
}

function setupCustom(custom) {
  const btn = document.getElementById("calcBtn");
  const input = document.getElementById("customCoin");
  const result = document.getElementById("customResult");

  const handleCalc = () => {
    const coin = parseInt(input.value);
    if (isNaN(coin)) {
      result.textContent = "Vui lòng nhập số coin hợp lệ.";
      result.style.color = "red";
      return;
    }

    if (coin < custom.min || coin > custom.max) {
      result.textContent = `Chỉ hỗ trợ từ ${custom.min} đến ${custom.max} coin.`;
      result.style.color = "red";
      return;
    }

    const price = coin * custom.rate;
    result.style.color = "#007aff";
    result.textContent = `Giá dự kiến: ${price.toLocaleString()} ₫`;
  };

  // Khi click nút
  btn.addEventListener("click", handleCalc);

  // Khi nhấn Enter trong input
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // tránh reload form
      handleCalc();
    }
  });
}

loadData();