/*===================================================*/
/* Twitter share button
/*===================================================*/
let $button = $(".twitter-share-button");
let $resetbutton = $(".howtouse__reset");
let shareText = $button.attr("data-text");
let $input = $(".howtouse__input input");

//=============================
// テキストの文言を、指定語句に変換する
//=============================
let replace_all = (string, target, replacement) => {
  let result = "";
  let offset = 0;
  let target_length = target.length;
  if (target_length === 0) {
    for (var i = 0, c = string.length; i < c; i++) {
      result += string[i];
      result += replacement;
    }
    if (result.length)
    return result.substr(0, result.length - replacement.length);
    return result;
  }
  do {
    let i = string.indexOf(target, offset);
    if (i === -1) {
      result += string.substring(offset);
      return result;
    }
    result += string.substring(offset, i);
    result += replacement;
    offset = i + target_length;
  } while (true);
}

//=============================
// ランダムな整数値を得る
//=============================
let randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//=============================
// 配列からランダム値を取得
//=============================
let randomArr = (arr) => {
  return arr[randomInt(0, arr.length - 1)]
}

//=============================
// オープニングアニメーション
//=============================
$(window).on('load', function () {
  Splitting({
    /* target: String selector, Element, Array of Elements, or NodeList */
    target: "[data-splitting]",
    /* by: String of the plugin name */
    by: "chars",
    /* key: Optional String to prefix the CSS variables */
    key: null
  });
  const tl = new TimelineMax();
  tl
    .add(function () {
      $(".loader-wrap").fadeOut();
    })
    .staggerTo(".loading__layer1 .char", 0.5, { y: 0, ease: Power3.easeOut }, 0.1)
    .to('.loading__layer1', 1, {
      x: '100%',
      ease: Power3.easeOut
    })
    .staggerTo(".loading__layer2 .char", 0.5, { y: 0, ease: Power3.easeOut }, 0.1)
    .to('.loading__layer2', 1, {
      x: '100%',
      ease: Power3.easeOut
    })
    .to('.loading', 1.5, {
      autoAlpha: 0,
      ease: Power3.easeOut
    })
  });
  

//=============================
// jsonデータの管理クラス（model）
//=============================
class Tweet {
  constructor(data) {
    this.textArray = [];
    this.replaceShareText1;
    this.replaceShareText2;
    this.shareText;
    this.initEvents(data);
  }
  initEvents(data) {
    this.set(data);
  }
  set(data) {
    for (let i = 0; i <= data.length - 1; ++i) {
      this.textArray[i] = data[i].dream;
    }
  }
  replace(val) {
    this.shareText = randomArr(this.textArray);
    this.replaceShareText1 = replace_all(this.shareText, '$input', val);
    this.replaceShareText2 = replace_all(this.replaceShareText1, "<br>", "\n");

    return this.replaceShareText2;
  }
}

//=============================
//  Tweetボタンの生成（view）
//=============================
class Button {
  constructor($el,data) {
    this.DOM = { el: $el };
    this.DOM.twitter;
    this.val;
    this.tweetData = data;
    this.model;
    this.tweetText;

    this.changeFn = (data) => {
      this.remove();
      this.val = this.DOM.el.val();
      this.tweetText = this.model.replace(this.val);
      this.generate(this.tweetText);
    }

    this.initEvents();
  }
  initEvents() {
    this.model = new Tweet(this.tweetData);
    this.DOM.el.on("change", this.changeFn);
  }
  generate(text) {
    this.DOM.twitter = document.createElement("div");
    this.DOM.twitter.innerHTML = '<a href="//twitter.com/share?text=' + text + "&hashtags=夢語るから金をくれ" + "&url=" + "https://project-dream-64b9d.firebaseapp.com/" + '"' + ' target="_blank" class="js_share_twitter"><i class="fab fa-twitter"></i>前澤社長に夢を語る</a>';
    $(".howtouse").append(this.DOM.twitter);
  }
  remove() {
    this.DOM.btn = this.DOM.el
      .parents(".howtouse")
      .find(".js_share_twitter");
    this.DOM.btn.remove();
  }
}

//=============================
//  初期化
//=============================
$(function () {
  $.ajax({
    type: "GET",
    url: "../json/shareText.json",
    crossDomain: false,
    dataType: "json",
    scriptCharset: "utf-8"
  }).done(function (data) {
    // let parseAr = JSON.parse(data);
    let tweetButton = new Button($input, data);

  }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
    console.log(errorThrown);
    console.log("NG:" + textStatus.status);
    console.log("json取れてないよ");
  });
});
