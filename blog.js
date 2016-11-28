"use strict";

class Article{

    constructor(url, title, date, category){
        this.url = url;
        this.title = title;
        this.date = date;
        this.category = category;
    }

    toHTMLElement(){

        const doc = document;
        const article = doc.createElementById("div");
        article.setAttribute("class", "article font");

        article.appendChild(a);

        const a = doc.createElementById("a");
        a.setAttribute("href", `${this.url}.html`);
        a.innerHTML = this.title;

        return article;
    }
}

// constructor(url, title, date, category){
const articles = [
    new Article('&gt; foo', 'bar', 'bar', 'bar')
]

function init(){

}




