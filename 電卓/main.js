$(function() {
  let currentInput = "0"; // 現在画面に表示されている文字列・数字
  let isCalculated = false; // 直前に「＝」で計算し終わったかどうかのフラグ

  // 画面の表示を更新する関数
  function updateDisplay() {
    $("#display").text(currentInput);
  }

  //数字・小数点ボタン（.num-btn）を押したとき
  $(".num-btn").on("click", function() {
    let clickedVal = $(this).data("val"); // 押されたボタンの値（"7"や"00"など）
    //小数点の連続入力防止（..など）
    if (clickedVal === "." && currentInput.slice(-1) === ".") {
      return; 
    }

    //強制的に「0.」にする（デフォルト０の後に.を入力した後、計算後の数字の後に.を入力した後）
    if ((currentInput === "0" || isCalculated) && clickedVal === ".") {
      currentInput = "0.";
      isCalculated = false;
      updateDisplay();
      return;
    }

  //小数点の二重入力防止（1.0.1など）
    if (clickedVal === ".") {
      // 現在の式を演算子で区切って、一番最後の数値（今入力中の数値）を取り出す
      let parts = currentInput.split(/[\+\-\*\/]/);
      let currentNum = parts[parts.length - 1];
      // その数値にすでに「.」が含まれている場合は処理を中断する
      if (currentNum.includes(".")) {
        return;
      }
    }

    // 計算直後または「0」の表示のときは、新しく入力された数字で上書きする
    if (isCalculated || currentInput === "0") {
      // ただし、最初に「00」が押された場合は「0」のままにする
      if (clickedVal === "00") {
        currentInput = "0";
      } else {
        currentInput = String(clickedVal);
      }
      isCalculated = false; // 計算直後フラグを解除
    } else {
      // すでに数字が入っている場合は、後ろに文字を繋げる
      currentInput += String(clickedVal);
    }

    updateDisplay();
  });

  //演算子ボタン（+ - * /）（.op-btn）を押したとき
  $(".op-btn").on("click", function() {
    let clickedOp = $(this).data("val");
    isCalculated = false;

  //もし式の末尾が「.」だったら、演算子を押しても何もしない（「1.+」など）
    if (currentInput.slice(-1) === ".") {
      return; // 処理をここで中断する
    }

  // 計算式の末尾がすでに演算子だった場合、新しい演算子に置き換える（「++」などの重複を防ぐ）
    let lastChar = currentInput.slice(-1);
    if (["+", "-", "*", "/"].includes(lastChar)) {
      currentInput = currentInput.slice(0, -1) + clickedOp;
    } else {
      currentInput += clickedOp;
    }

    updateDisplay();
  });

  //「AC」クリアボタン（#clearBtn）を押したとき
  $("#clearBtn").on("click", function() {
    currentInput = "0"; // 画面を0に戻す
    isCalculated = false;
    updateDisplay();
  });

  //「＝」イコールボタン（#equalBtn）を押したとき
  $("#equalBtn").on("click", function() {
    // 末尾が演算子で終わっている場合は、最後の演算子を消してから計算する
    let lastChar = currentInput.slice(-1);
    if (["+", "-", "*", "/"].includes(lastChar)) {
      currentInput = currentInput.slice(0, -1);
    }

    try {
      let result = Math.round(new Function('return ' + currentInput)() * 100000000) / 100000000;
      
      currentInput = String(result);
      isCalculated = true; // 計算完了フラグを立てる
    } catch (error) {
      // エラーが発生した場合の表示
      currentInput = "Error";
      isCalculated = true;
    }

    updateDisplay();
  });
});
