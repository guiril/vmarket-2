# V-MARKET 2.0

以 **Nuxt.js** 為框架的前端練習，改版 Vue + Vue CLI 的練習作品。

> [V-MARKET 第一版](https://github.com/ouiis/vmarket "V-MARKET")

## Demo

**V-MARKET 2.0**：
[https://ouiis.github.io/vmarket_2.0/](https://ouiis.github.io/vmarket_2.0/ "V-MARKET 2.0")

### 首頁

![首頁](https://i.imgur.com/xUbNvRH.jpg)

### 購物區

將商品新增至購物車：

![](https://i.imgur.com/pxRgpxn.jpg)

購物車頁面：

![](https://i.imgur.com/IorPkY3.jpg)

結帳頁面（*尚未付款*）：

![](https://i.imgur.com/nmPS3bP.jpg)

結帳頁面（*完成付款*）：

![](https://i.imgur.com/B9Ie7nI.jpg)

### 後台區

商品管理：

![商品管理](https://i.imgur.com/MUA5joV.jpg)

新增商品：

![新增商品](https://i.imgur.com/vecnwII.jpg)

編輯商品：

![編輯商品](https://i.imgur.com/2PjwQY0.jpg)

刪除商品：

![刪除商品](https://i.imgur.com/lSh8mgk.jpg)

訂單管理：

![訂單管理](https://i.imgur.com/Y9ejzwT.jpg)

新增優惠券：

![新增優惠券](https://i.imgur.com/Btk4Fg5.jpg)

## 主要使用技術

* 以 **Nuxt.js** 為前端框架，使用支援 **SSR** 的 **universal** 模式。
* 使用 **Vuetify** 作為 UI 元件庫。
* 使用 **ESLint \- Airbnb** 管理程式碼風格。

## 其他套件

* [**Axios Module**](https://github.com/nuxt-community/axios-module "Axios Module")
* [**VeeValidate**](https://github.com/logaretm/vee-validate "VeeValidate")

## 使用到的 API

> API 文件：https://github.com/hexschool/vue-course-api-wiki/wiki

### 登入及驗證

* 登入 `POST` `/admin/signin`
* 登出 `POST` `/logout`
* 檢查用戶是否仍持續登入 `POST` `/api/user/check`

### 管理控制台 [需驗證]

#### 1. 產品

* 商品建立 `POST` `/admin/product`
* 取得商品列表 `GET` `/admin/products?page=:page`
* 取得商品列表_all `GET` `/admin/products/all`
* 修改產品 `PUT` `/admin/product/:id`
* 刪除產品 `DELETE` `/admin/product/:product_id`
* 上傳圖片 `POST` `/admin/upload`

#### 2. 訂單

* 取得訂單列表 `GET` `/admin/orders?page=:page`

#### 3. 優惠券

* 新增優惠券 `POST` `/admin/coupon`
* 取得優惠券列表 `GET` `/admin/coupons?page=:page`
* 修改優惠券 `PUT` `/admin/coupon/:id`
* 刪除優惠券 `DELETE` `/admin/coupon/:coupon_id`

### 客戶購物 [免驗證]

* 取得商品列表 `GET` `/products?page=:page`
* 取得商品列表_all `GET` `products/all`
* 單一商品細節 `GET` `/product/:id`
* 加入購物車 `POST` `/cart`
* 刪除某一筆購物車資料 `DELETE` `/cart/:id`
* 取得購物車列表 `GET` `/cart`
* 套用優惠券 `POST` `/coupon`
* 結帳頁面 `POST` `/order`
* 取得某一筆訂單 `GET` `/order/:order_id`
* 結帳付款 `POST` `/pay/:order_id`
