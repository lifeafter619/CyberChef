/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

/**
 * Object to handle the creation of operation categories.
 */
class HTMLCategory {

    /**
     * HTMLCategory constructor.
     *
     * @param {string} name - The name of the category.
     * @param {boolean} selected - Whether this category is pre-selected or not.
     */
    constructor(name, selected) {
        this.name = name;
        this.displayName = CATEGORY_TRANSLATIONS[this.name] || this.name;
        this.selected = selected;
        this.opList = [];
    }


    /**
     * Adds an operation to this category.
     *
     * @param {HTMLOperation} operation - The operation to add.
     */
    addOperation(operation) {
        this.opList.push(operation);
    }


    /**
     * Renders the category and all operations within it in HTML.
     *
     * @returns {string}
     */
    toHtml() {
        const catName = "cat" + this.name.replace(/[\s/\-:_]/g, "");
        let html = `<div class="panel category">
        <a class="category-title" data-toggle="collapse" data-target="#${catName}">
            ${this.displayName}
            <span class="op-count hidden">
                ${this.opList.length}
            </span>
        </a>
        <div id="${catName}" class="panel-collapse collapse ${(this.selected ? " show" : "")}" data-parent="#categories">
            <ul class="op-list">`;

        for (let i = 0; i < this.opList.length; i++) {
            html += this.opList[i].toStubHtml();
        }

        html += "</ul></div></div>";
        return html;
    }

}

const CATEGORY_TRANSLATIONS = {
    "Favourites": "收藏夹",
    "Data format": "数据格式",
    "Encryption / Encoding": "加密 / 编码",
    "Public Key": "公钥",
    "Arithmetic / Logic": "算术 / 逻辑",
    "Networking": "网络",
    "Language": "语言",
    "Utils": "工具",
    "Date / Time": "日期 / 时间",
    "Extractors": "提取",
    "Compression": "压缩",
    "Hashing": "哈希",
    "Code tidy": "代码整理",
    "Forensics": "取证",
    "Multimedia": "多媒体",
    "Other": "其他",
    "Flow control": "流程控制"
};

export default HTMLCategory;
