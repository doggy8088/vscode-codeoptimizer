# 程式碼優化大師

這個擴充套件主要結合 OpenAI 公司最近推出的 GPTs 功能，搭配我設計的[程式碼優化大師 GPT](https://chat.openai.com/g/g-UEZYckKpa-cheng-shi-ma-you-hua-da-shi) 與 Chrome/Edge 擴充套件 [ChatGPT 萬能工具箱](https://chromewebstore.google.com/detail/fmijcafgekkphdijpclfgnjhchmiokgp?hl=zh-TW)，幫助你提升程式碼的在各個面向上的品質，包含程式碼結構、執行效能、安全性、程式碼風格、可讀性、... 與更多你可能沒想到的技術細節。

使用這個套件有以下兩個要件：

1. 你必須事先在 Chrome 或 Edge 安裝 [ChatGPT 萬能工具箱](https://chromewebstore.google.com/detail/fmijcafgekkphdijpclfgnjhchmiokgp?hl=zh-TW) 擴充套件。

2. 你必須擁有付費的 [ChatGPT Plus](https://openai.com/blog/chatgpt-plus) 訂閱帳號，才能使用我為這個套件設計的[程式碼優化大師 GPT](https://chat.openai.com/g/g-UEZYckKpa-cheng-shi-ma-you-hua-da-shi)。

使用時會自動開啟預設的瀏覽器視窗，開啟[程式碼優化大師 GPT](https://chat.openai.com/g/g-UEZYckKpa-cheng-shi-ma-you-hua-da-shi)，並自動將編輯器中的**選取範圍**或**整份文件**傳入 ChatGPT 進行提問。

如果有任何建議與討論，歡迎來到[這裡](https://github.com/doggy8088/vscode-codeoptimizer/issues)留言交流。

## 主要特色

* 支援將編輯器中的**整份文件**加入程式碼優化大師 GPT (`codeoptimizer.add_wholefile`)

* 支援將編輯器中的**選取範圍**加入程式碼優化大師 GPT (`codeoptimizer.add_selection`)

* 自動識別目前編輯器中的程式語言
