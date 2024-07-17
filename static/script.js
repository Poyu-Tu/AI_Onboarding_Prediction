document.addEventListener('DOMContentLoaded', () => {
/**
 * document.addEventListener('DOMContentLoaded', ...)：頁面加載完畢後執行的程式碼
 * 當整個HTML文檔被完全加載和解析時，觸發此事件。確保所有DOM元素都已經加載完畢後再執行程式碼。
 */

    const mainText = document.getElementById('main-text');
    const overlay = document.getElementById('overlay');
    const content = document.getElementById('content');
    /**
     * const mainText = document.getElementById('...');：獲取DOM元素
     * 獲取ID為...的元素。
     * 
     * # const：用於聲明一個常量（constant）變量。這意味著變量的值不能被重新賦值
     */

    let flip = false;
    setInterval(() => {
        mainText.style.transform = 'rotateX(180deg)';
        setTimeout(() => {
            mainText.textContent = flip ? 'Welcome!' : '"Onboarding Prediction Assistant"';
            flip = !flip;
            mainText.style.transform = 'rotateX(0)';
        }, 300);
    }, 5000);
    /**
     * 設置文字翻轉效果，來實現每隔5秒讓mainText元素翻轉並改變內容。
     * 
     * let flip = false;：定義一個變量flip，用於切換文字。
     * # let：用於聲明一個變量。與var不同，let聲明的變量具有塊級作用域（block scope），這意味著變量僅在其所在的代碼塊內部可見。
     * 
     * 
     * setInterval(() => { ... }, 5000);
     * # setInterval：這是一個JavaScript的計時器函數，它會每隔指定的時間（這裡是5000毫秒，即5秒）重複執行內部的箭頭函數（=> { ... }）。
     * # 5000：表示間隔時間為5000毫秒（5秒）。
     * 
     * 
     * mainText.style.transform = 'rotateX(180deg)';
     * # mainText.style.transform：設置mainText元素的CSS變換屬性。
     * # 'rotateX(180deg)'：將元素繞X軸旋轉180度。這將觸發一個旋轉動畫，讓元素看起來在垂直方向上翻轉了一圈。
     * 
     * 
     * setTimeout(() => { ... }, 300);
     * # setTimeout：這是一個JavaScript的計時器函數，它會在指定的時間（這裡是300毫秒）後執行內部的箭頭函數（=> { ... }）。
     * # 300：表示延遲時間為300毫秒。
     * 
     * 
     * mainText.textContent = flip ? 'Welcome!' : '"Onboarding Prediction Assistant"';
     * # mainText.textContent：設置mainText元素的文字內容。
     * # flip ? 'Welcome!' : '"Onboarding Prediction Assistant"'：這是一個三元運算符。根據flip的值，決定要顯示的文字內容：
     *      如果flip為true，顯示'Welcome!'。
     *      如果flip為false，顯示'"Onboarding Prediction Assistant"'。
     * 
     * 
     * flip = !flip;
     * # flip = !flip;：這是一個邏輯非運算。每次執行時，它會將flip的布爾值取反：
     *      如果flip原本是true，會變成false。
     *      如果flip原本是false，會變成true。
     * 
     * 
     * mainText.style.transform = 'rotateX(0)';
     * # mainText.style.transform：再次設置mainText元素的CSS變換屬性。
     * # 'rotateX(0)'：將元素繞X軸旋轉回到0度。這將元素恢復到未旋轉狀態，看起來像是完成了翻轉動畫。
     */

    document.body.addEventListener('click', () => {
        overlay.style.display = 'flex';
        setTimeout(() => {
            content.style.animation = 'blackHole 2s ease-in-out both';
            setTimeout(() => {
                window.location.href = "/AI_page";
            }, 2000);
        }, 2000); // 延遲2秒開始黑洞效果
    });
    /**
     * 點擊頁面顯示遮罩層，並在延遲後觸發黑洞動畫效果，最後跳轉到指定的URL。
     * 
     * document.body.addEventListener('click', ...)：為body元素添加點擊事件監聽器，當頁面任意位置被點擊時，觸發內部的匿名函數。
     * 
     * 
     * overlay.style.display = 'flex';：將overlay元素的display屬性設置為flex，使其顯示在頁面上。
     * overlay元素是一個全屏遮罩層，覆蓋整個頁面，裡面包含了#loader的特效。
     * 
     * 
     * setTimeout(() => { ... }, 2000);：設置一個延遲函數，延遲2秒後執行內部的匿名函數。
     * 
     * 
     * content.style.animation = 'blackHole 2s ease-in-out both';：為content元素添加動畫效果。
     * # blackHole：動畫名稱。
     * # 動畫時長，持續2秒。
     * # ease-in-out：時間函數，動畫以緩慢開始和結束，中間速度較快的方式播放。
     * # both：填充模式，動畫在開始前和結束後都應用動畫的第一幀和最後一幀狀態。
     * 
     * 
     * setTimeout(() => { ... }, 2000);：在第一次延遲2秒後，設置另一個延遲函數，延遲2秒後執行內部的匿名函數。
     * 
     * 
     * window.location.href = '...';：在內部的匿名函數中實現跳轉。
     */

    // 初始化光暈效果
    const canvas = document.getElementById('particle-canvas');
    const context = canvas.getContext('2d');
    let halos = [];
    /**
     * 準備一個畫布來顯示光暈效果。
     * 
     * const context = canvas.getContext('2d');：獲取畫布的2D繪圖上下文，這是用來在畫布上繪製2D圖形的API。
     * 
     * 
     * let halos = [];：空數組，初始為空，用來存儲所有的光暈對象。
     */

    class Halo {
        constructor(x, y, size, color) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.color = color;
            this.opacity = Math.random() * 0.5 + 0.5;
            this.speedX = (Math.random() - 0.5) * 2;
            this.speedY = (Math.random() - 0.5) * 2;
            this.opacitySpeed = (Math.random() * 0.005) - 0.0025;
        }
        /**
         * 定義光暈
         * constructor(x, y, size, color) { ... }
         * # constructor：這是類的構造函數，用來初始化光暈對象。
         * # x：光暈的x坐標。
         * # y：光暈的y坐標。
         * # size：光暈的大小。
         * # color：光暈的顏色。
         * 
         * 
         * this.x = x;：將參數x的值賦給光暈對象的x屬性。
         * 
         * 
         * this.opacity = Math.random() * 0.5 + 0.5;：將隨機數擴展到介於0.5和1之間，用於設置光暈的初始透明度。
         * 
         * 
         * this.speedX = (Math.random() - 0.5) * 2;：生成一個介於-1和1之間的隨機數，用於設置光暈在x方向上的速度。
         * 
         * 
         * this.opacitySpeed = (Math.random() * 0.005) + 0.0025;：生成一個介於0.0025和0.0075之間的隨機數，用於設置光暈的透明度變化速度。
         */

        update() {
            this.x += this.speedX;  //水平
            this.y += this.speedY;  //垂直
            this.opacity += this.opacitySpeed;
            if (this.opacity <= 0.1 || this.opacity >= 1) {
                this.opacitySpeed *= -1;
            }
            if (this.x > canvas.width || this.x < 0) {
                this.speedX *= -1;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.speedY *= -1;
            }
        }
        /**
         * 更新光暈狀態
         * 
         * this.x += this.speedX;：將光暈的x坐標增加speedX的值，更新光暈的水平位置。
         * 
         * 
         * this.opacity += this.opacitySpeed;：將光暈的透明度增加opacitySpeed的值，更新光暈的透明度。
         * 
         * 
         * if (this.opacity <= 0.1 || this.opacity >= 1) { this.opacitySpeed *= -1; }：如果光暈的透明度小於等於0.1或大於等於1，反轉透明度變化速度，使其在這個範圍內來回變化。
         * 
         * 
         * if (this.x > canvas.width || this.x < 0) { this.speedX *= -1; }：如果光暈的x坐標超出畫布的寬度或小於0，反轉x方向的速度，使光暈在畫布內來回移動。
         */

        draw() {
            context.save();
            context.globalAlpha = this.opacity;
            context.fillStyle = this.color;
            context.beginPath();
            context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            context.fill();
            context.restore();
        }
        /**
         * 繪製光暈
         * 
         * context.save();：保存當前的繪圖狀態。
         * 
         * 
         * context.globalAlpha = this.opacity;：設置全局透明度為光暈的透明度。
         * 
         * 
         * context.fillStyle = this.color;：設置填充樣式為光暈的顏色。
         * 
         * 
         * context.beginPath();：開始一條新的路徑。
         * 
         * 
         * context.arc(this.x, this.y, this.size, 0, Math.PI * 2);：在光暈的x和y位置處繪製一個圓形，半徑為size。
         * 
         * 
         * context.fill();：填充圓形。
         * 
         * 
         * context.restore();：恢復之前保存的繪圖狀態。
         */
    }

    function initHalos() {
        halos = [];
        for (let i = 0; i < 50; i++) {
            const size = Math.random() * 20 + 20;
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const color = 'rgba(255, 255, 255, 0.5)';
            halos.push(new Halo(x, y, size, color));
        }
    }
    /**
     * 初始化光暈對象
     * 
     * halos = [];：清空光暈數組。
     * 
     * 
     * for (let i = 0; i < 50; i++) { ... }：使用一個迴圈創建50個光暈對象。
     * 
     * 
     * const size = Math.random() * 20 + 20;：隨機生成一個介於20和40之間的大小，用於光暈的大小。
     * 
     * 
     * const x = Math.random() * canvas.width;：隨機生成一個x坐標，使光暈在畫布的寬度範圍內隨機出現。
     * 
     * 
     * const color = 'rgba(255, 255, 255, 0.5)';：設置光暈的顏色為半透明的白色。
     * 
     * 
     * halos.push(new Halo(x, y, size, color));：創建一個新的光暈對象並添加到光暈數組中。
     */

    function animateHalos() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        halos.forEach(halo => {
            halo.update();
            halo.draw();
        });
        requestAnimationFrame(animateHalos);
    }
    /**
     * 動畫光暈效果
     * 
     * context.clearRect(0, 0, canvas.width, canvas.height);：清空畫布。
     * 
     * 
     * halos.forEach(halo => { halo.update(); halo.draw(); });：遍歷所有的光暈對象，更新並繪製它們。
     * 
     * 
     * requestAnimationFrame(animateHalos);：請求瀏覽器在下一次重繪時再次調用animateHalos函數，以創建一個持續的動畫循環。
     */

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initHalos();
    }
    /**
     * 調整畫布大小並重新初始化光暈
     * 
     * canvas.width = window.innerWidth;：將畫布的寬度設置為視窗的內部寬度。
     * 
     * 
     * initHalos();：重新初始化光暈對象。
     */

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animateHalos();
    /**
     * 添加事件監聽器並啟動動畫
     * 
     * window.addEventListener('resize', resizeCanvas);：為窗口添加調整大小事件監聽器，當窗口大小改變時調用resizeCanvas函數。
     * 
     * 
     * resizeCanvas();：初始化畫布大小並創建光暈對象。
     * 
     * 
     * animateHalos();：啟動光暈動畫。
     */
});