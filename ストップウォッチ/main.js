$(function() {
  let timerId = null;     // タイマーの管理用ID
  let startTime = 0;      // スタートした時刻
  let elapsedTime = 0;    // 経過時間
  // 画面の数字を更新する関数
  function updateDisplay() {
    // 経過時間（ミリ秒）から、時・分・秒・ミリ秒を計算
    let totalMs = elapsedTime % 1000;
    let ms = Math.floor(totalMs / 100); 
    let totalSeconds = Math.floor(elapsedTime / 1000);
    let s = totalSeconds % 60;
    let totalMinutes = Math.floor(totalSeconds / 60);
    let m = totalMinutes % 60;
    let h = Math.floor(totalMinutes / 60);
    // 計算結果を表示する
    $("#hours").text(h);
    $("#minutes").text(m);
    $("#seconds").text(s);
    $("#milliseconds").text(ms); 
  }

//スタートボタンを押したとき
$("#startBtn").on("click", function() {
  if (timerId !== null) return;

  startTime = Date.now() - elapsedTime;

  timerId = setInterval(function() {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
  }, 10);

//スタートを押した後のボタン状態
  $("#startBtn").prop("disabled", true);   // スタートを非活性に
  $("#stopBtn").prop("disabled", false);   // ストップを活性に
  $("#resetBtn").prop("disabled", true);   // リセットを非活性に
});

//ストップボタンを押したとき
$("#stopBtn").on("click", function() {
  if (timerId === null) return;

  clearInterval(timerId);
  timerId = null;

//ストップを押した後のボタン状態
  $("#startBtn").prop("disabled", false);  // スタートを活性に
  $("#stopBtn").prop("disabled", true);    // ストップを非活性に
  $("#resetBtn").prop("disabled", false);  // リセットを活性に
});

//リセットボタンを押したとき
$("#resetBtn").on("click", function() {
  clearInterval(timerId);
  timerId = null;

//データを初期化して画面を「0:0:0:0」に戻す
  elapsedTime = 0;
  updateDisplay();

// リセットを押した後のボタン状態
  $("#startBtn").prop("disabled", false);  // スタートを活性に
  $("#stopBtn").prop("disabled", true);    // ストップを非活性に
  $("#resetBtn").prop("disabled", true);   // リセットを非活性に
});
});