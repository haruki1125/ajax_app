function memo() {
  const submit = document.getElementById("submit");
  //コメントの送信ボタンがsubmit
  submit.addEventListener("click", (e) => {
    const formData = new FormData(document.getElementById("form"));
    //new FormDataでフォームに入力された値を取得したオブジェクト作る
    XHR.open("POST", "/posts", true);
    //openはメソッドの定義、パスの指定、非同期通信のON/OFF
    XHR.responseType = "json";
    //レスポンスタイプ
    XHR.send(formData);
    XHR.onload = () => {
      //ここからコントローラーとのやりとり
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
        //成功してなかったらreturn nullですっ飛ばす
      }
      const item = XHR.response.post;
      //レスポンスとして返却されたメモのレコードデータを取得しています。
      const list = document.getElementById("list");
      //HTMLを描画する場所を指定する際に使用する「描画する親要素」のlistの要素を取得しています。
      const formText = document.getElementById("content");
      //id所得
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
      list.insertAdjacentHTML("afterend", HTML);
      //insertAdjacentHTMLは特定の要素に描画できるメソッド"afterend"は要素の直後
      formText.value = "";
      //メモの入力フォームに入力されたままの文字」はリセットされます。正確には、空の文字列に上書きされるような仕組みです。
    };
    e.preventDefault();
    //プログラム本来の処理を、止めるためにe.preventDefault();で処理を停止させます
  });
}
window.addEventListener("load", memo);